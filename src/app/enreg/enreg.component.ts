import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { HelperService } from '../services/helper.service';
import { MessageService } from '../services/messages.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { take } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';


@Component({
  selector: 'app-enreg',
  standalone: true,
  imports: [ButtonModule, MessagesModule, FormsModule],
  templateUrl: './enreg.component.html',
  styleUrl: './enreg.component.css'
})
export class EnregComponent implements OnInit {

  loading!: boolean;
  isUserAlreadySaved!: boolean;
  form: FormGroup;
  messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messagesService: MessageService,
    private helperService: HelperService,
    private usersService: UserService  ) {
   
      this.form = this.fb.group({
        civilite: ["", Validators.required],
        lastname: ["", Validators.required],
        firstname: ["", Validators.required]
      });

  }
  ngOnInit(): void {
    this.messages = this.messagesService.addMessage("error", "Les enregistrements en ligne sont terminés.");
  }

  load() {

    if (this.helperService.toString(this.form.value.firstname) == "" || this.helperService.toString(this.form.value.lastname) == "" || this.helperService.toString(this.form.value.civilite) == "") {
      this.messages = this.messagesService.addMessage("warn", "Veuillez selectionner votre civilité, puis entrer votre nom et votre prénom !");
    } else {
      this.loading = true;
      setTimeout(() => {
          this.search();
          this.loading = false
      }, 1000);
    }

  }


  search(): void {

    const fullname = this.helperService.construireFullname(this.form.value.firstname, this.form.value.lastname);

    const userToSave: User = {
      nom: fullname,
      email: "",
      souhaits: "",
      secrets: ""
    };

    this.usersService.findUserByName(fullname).pipe(take(1)).subscribe(user => {

      if (user) {
        this.messages = this.messagesService.addMessage("success", "Vous avez déjà été enregistré ; Vous pouvez dès à présent retourner à la page d'accueil."); 
        this.isUserAlreadySaved = true;
        //this.dataStoreService.storeUser(user);
      } else {
        this.messages = this.messagesService.addMessage("error", "L'utilisateur n'a pas été trouvé. Veuillez procedez à l'enregistrement !"); // message jamais affiché car on atterit sur la page suivante
        this.isUserAlreadySaved = false;
        //this.dataStoreService.storeUser(userToSave);
        this.router.navigate(['/', 'rsvp']);
      }
    });
  
  }

}

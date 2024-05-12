import { Component } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HelperService } from '../services/helper.service';
import { MessageService } from '../services/messages.service';
import { Message } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ButtonModule, FormsModule, ReactiveFormsModule, MessagesModule, KeyFilterModule],
  providers: [UserService, HttpClient],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  loading!: boolean;
  isForcerEnreg!: boolean;
  isUserAlreadySaved!: boolean;
  form: FormGroup;
  messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private messagesService: MessageService,
    private helperService: HelperService,
    private usersService: UserService
    ) {
   
      this.form = this.reinitForm();

  }

  get getEmail(){
    return this.form.get('email');
  }

  testPattern(str: string): boolean {
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/.test(str);
  }

  reinitForm(): FormGroup {
    this.isUserAlreadySaved = false;
    return this.fb.group({
      souhaits: ["", Validators.required],
      email: new FormControl("",[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      lastname: ["", Validators.required],
      firstname: ["", Validators.required]
    });
  }

  load() {

    if (this.helperService.toString(this.form.value.firstname) == "" || 
    this.helperService.toString(this.form.value.email) == "" ||
    this.helperService.toString(this.form.value.souhaits) == "") {
      this.messages = this.messagesService.addMessage("warn", "Veuillez saisir vos informations !");
      this.helperService.scrollToTop150();
    } else {
      if(this.getEmail?.errors && this.getEmail?.invalid) {
        this.messages = this.messagesService.addMessage("error", "1 erreur détectée !");
      } else {
        this.loading = true;
        setTimeout(() => {
            this.search();
            this.loading = false
        }, 1000);
      }
     
    }

  }


  search(): void {

    const fullname = this.helperService.construireFullname(this.form.value.firstname, this.form.value.lastname);

    this.usersService.findUserByName(fullname).pipe(take(1)).subscribe(user => {
      if (user) {
        this.messages = this.messagesService.addMessage("info", fullname+", vous avez déjà été enregistré ; Si toutefois vous souhaitez modifier vos informations, cliquez sur le bouton forcer l'enregistrement."); 
        this.isUserAlreadySaved = true;
        this.isForcerEnreg = false;
        this.form.disable();          
      } else {
        this.save();
        this.isUserAlreadySaved = false;
      }
      this.helperService.scrollToTop150();
    });
  
  }

  save(): void {

      const user: User = {
        nom: this.helperService.construireFullname(this.form.value.firstname, this.form.value.lastname),
        email: this.helperService.gestionEmail(this.form.value.email),
        souhaits: this.form.value.souhaits
      };
  
      this.usersService.createOrUpdateUser(user).pipe(take(1)).subscribe(u => {
        if (u) {
          this.messages = this.messagesService.addMessage("success", user.nom+", vous avez bien été enregistré !");
          this.usersService.sendMailConfirmEnreg(user).pipe(take(1)).subscribe();
          this.isForcerEnreg = true;
          this.form = this.reinitForm();
        } else {
          this.messages = this.messagesService.addMessage("error", "Une erreur s'est produite !");
        }
        this.helperService.scrollToTop150();
      });
    
  }


}

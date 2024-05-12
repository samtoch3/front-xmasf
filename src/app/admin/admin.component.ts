import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { User } from '../model/user';
import { MessageService } from '../services/messages.service';
import { HelperService } from '../services/helper.service';
import { UserService } from '../services/user.service';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, PanelModule, DividerModule, StepperModule, ButtonModule, TableModule, HttpClientModule, MessagesModule],
  providers: [UserService, HttpClient],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  users!: User[];

  loadingDelete!: boolean;

  loadingSendResults!: boolean;

  isSendResultActive!: boolean;

  messages: Message[] = [];

  constructor(
    private messagesService: MessageService,
    private helperService: HelperService,
    private usersService: UserService
    ) {

    }

  ngOnInit() {
    // this.refreshListeUsers();
  }

  refreshListeUsers(): void {
    this.users = [];
    this.usersService.findAllUsers().pipe(take(1)).subscribe(users => {
      users.forEach(user => {
        user.id = users.indexOf(user);
      });
      this.users = this.helperService.trieParOrdreAlphabetique(users);
    });
    
  }

  deleteUser(user: User): void {

    this.loadingDelete = true;
      setTimeout(() => {
        this.usersService.deleteUser(user.nom).subscribe(userr => {
          if (userr) {
            this.messages = this.messagesService.addMessage("success", "L'utilisateur "+user.nom+" a bien été supprimé ! ");
            this.refreshListeUsers();
          } else {
            this.messages = this.messagesService.addMessage('error', 'Erreur', "Une erreur s'est produite lors de la suppression. Veuillez réessayez plutard !");
          }
        });
        this.loadingDelete = false;
      }, 1000);
      this.helperService.scrollToTop60();
  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getUserById(id: number): User | undefined {
    return this.users.filter(user => user.id = id).shift();
  }

  in_array(array: number[], el: number) {
    for(let i = 0 ; i < array.length; i++) 
        if(array[i] == el) return true;
    return false;
 }


  lancerTirage(): void {
    const nbrParticipants = this.users.length;
    const userListId: any = [];
    const listEnfants = ["Gabriel Noah (Garçon, 2.5ans)", "Milan Aiden (Garçon, 2.5ans)", "Matt Etane  (Garçon, 4ans)"]
    let incr = 0;

    while (incr < nbrParticipants) {
      let n: number;
      do {
        n = Math.floor(Math.random() * nbrParticipants);
      } while (n == incr);
      if(!this.in_array(userListId, n)) {
        userListId.push(n);
        incr++;
      } else {
        console.log("coucou")
      }
     
    }

    for(let i=0; i < nbrParticipants; i++) {
      this.users[i].secrets = this.users[userListId[i]].nom;
      this.users[i].souhaits_of_my_secrets = this.users[userListId[i]].souhaits;
    }

    let i = 0;
    this.users.forEach(u => {
      if (i === listEnfants.length) {
        i = 0
      }
      if(i < listEnfants.length) {        
        u.secrets = u.secrets + "/" + listEnfants[i];
      }
      i++;
    });

    this.users.forEach(x => {
      this.usersService.saveSecretsSanta(x).pipe(take(1)).subscribe();
    });

    /*this.users.forEach(x => {
      let n: number;
      do {
        n = Math.floor(Math.random() * nbrParticipants);
      } while (n === x.id || userListId.find(a => a === n));
      
      userListId.push(n);
      //console.log("pour le user "+x.nom+", le tirage donne -> ", this.getUserById(n)?.nom);
    });*/
    this.isSendResultActive = true;
  }


  /**
   * Envoi des resultats par mail
   */
  SendResult(): void {

    this.loadingSendResults = true;
    setTimeout(() => {
      this.usersService.sendResults(this.users).pipe(take(1)).subscribe();
      this.loadingSendResults = false;
      this.messages = this.messagesService.addMessage(
        'info', 
        "Les resultats du tirage ont tous été envoyé avec succèss !"
      );
      this.helperService.scrollToTop60();
    }, 10000 * this.users.length);

    

  }

}

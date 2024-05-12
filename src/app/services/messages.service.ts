import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];

  supprimerMessageListe(): void {
    this.messages = [];
  }

  addMessage(severity: string, summary?: string, detail?: string): Message[] {
    return [
      { severity: severity, summary: summary, detail: detail }
    ];
  }

  getMessageListe(): Message[] {
    return this.messages;
  }
}

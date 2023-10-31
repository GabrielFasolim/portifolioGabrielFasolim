import { Component } from '@angular/core';
import * as contact from '../../../assets/contact.json';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  
    constructor() { }
      contato: any = (contact as any).default.contatos;

  
}


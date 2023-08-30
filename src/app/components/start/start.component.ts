import { Component } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  texto: string = 'welcome to gabriel fasolim platform';

  transformarParaMaiusculas() {
    this.texto = this.texto.toUpperCase();
  }

  imagemUrl: string = '../../../imgs/htmlSimbol.png';

}

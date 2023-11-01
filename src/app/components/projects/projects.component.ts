import { Component } from '@angular/core';
import * as projetos from '../../../assets/cards.json';
import * as details from '../../../assets/details.json';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],

    providers: [DialogService]
})
export class ProjectsComponent {
  constructor(private dialog: DialogService) { }

  projects: any = (projetos as any).default.projetos;
  details: any = (details as any).default.detalhes;

  open(data: any) {
    let ref = this.dialog.open(DynamicDialogComponent, {
      closable: false,
      data: data
    })
  }
}

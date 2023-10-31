import { Component } from '@angular/core';
import * as projetos from '../../../assets/ss.json';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  constructor() { }
    projects: any = (projetos as any).default.projetos;
}

import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']

})
export class DynamicDialogComponent implements OnInit {

    data: any;

    details: any;

    fecharDialog() {
      if (this.ref) {
        this.ref.close(); // Fecha o diálogo se a referência existir
      }
    }
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { 
      console.log("Data: " + JSON.stringify(config.data.employee));
      this.details = config.data;
      console.log(config.data);
  }
    

  ngOnInit(): void {
  
    }
  }


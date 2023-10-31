import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.css']
})
export class DynamicDialogComponent implements OnInit {

    ref: DynamicDialogRef | undefined;
    data: any;

    constructor(public dialogService: DialogService) {

    }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import * as details from '../../../assets/details.json';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent implements OnInit {

    ref: DynamicDialogRef | undefined;
    data: any;

    details: any = (details as any).default.details;

    constructor(public dialogService: DialogService) {

    }

  ngOnInit(): void {

  }

}

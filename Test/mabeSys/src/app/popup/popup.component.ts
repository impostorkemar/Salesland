import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  title = 'angular-mateiral';
  
  constructor(private dialogRef : MatDialog){}

  openDialog(){
    this.dialogRef.open(PopupComponent,{
      data : {
        name : 'Samuel'
      }
    });
  }
}

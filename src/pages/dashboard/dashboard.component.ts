import { Component } from '@angular/core';
import { PartyListComponent } from "../party-list/party-list.component";
import { MatDialog } from '@angular/material/dialog';
import { PartyFormDialogComponent } from '../../modal/party-form-dialog/party-form-dialog.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [PartyListComponent,PartyFormDialogComponent]
})
export default class DashboardComponent {
  dialogOpen = false;

    constructor(public dialog: MatDialog){

    }

    partForm(){
      if (!this.dialogOpen) {
        this.dialogOpen = true;
        const dialogRef = this.dialog.open(PartyFormDialogComponent, {
          width: '70%',
          height: '70%',
          backdropClass: 'custom-backdrop',
          disableClose: true
        });
  
        dialogRef.afterClosed().subscribe(result => {
          this.dialogOpen = false;
        });
      }
    }
}

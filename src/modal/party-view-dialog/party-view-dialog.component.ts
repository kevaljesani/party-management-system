import { CommonModule } from '@angular/common';
import { Component, Inject, Pipe } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-party-view-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './party-view-dialog.component.html',
  styleUrl: './party-view-dialog.component.scss'
})


// @Pipe({ name: 'objectToArray' })
export class PartyViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PartyViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
 
  ) {
    console.log(data)
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

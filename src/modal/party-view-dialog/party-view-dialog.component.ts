import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-party-view-dialog',
  standalone: true,
  imports: [],
  templateUrl: './party-view-dialog.component.html',
  styleUrl: './party-view-dialog.component.scss'
})
export class PartyViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PartyViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

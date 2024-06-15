import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PartyListService } from '../../services/party-list.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, } from '@angular/material/button';
import { PartyViewDialogComponent } from '../../modal/party-view-dialog/party-view-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../modal/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { error } from 'console';
import { PartyFormDialogComponent } from '../../modal/party-form-dialog/party-form-dialog.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import { LoadingService } from '../../services/loader.service';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
@Component({
    selector: 'app-party-list',
    standalone: true,
    imports: [MatTableModule,
        MatButtonModule,
        PartyViewDialogComponent,AgGridAngular,MatIconModule],
    templateUrl: './party-list.component.html',
    styleUrl: './party-list.component.scss',
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartyListComponent implements OnInit {

    router = inject(Router);

    tableCol : string[] = ['ID','Name','Company Name','Email','Mobile No','Action']
    onGridReady(params: GridReadyEvent) {
    // Your implementation here
    // For example, you might set row data when the grid is ready
    params.api.setRowData(this.rowData);
  }
  
    parties: any[] = [];
    rowData :any[]= [] ;

    constructor(private partyService: PartyListService,private loadingService:LoadingService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.getAllPartyList();
    }

    datatranform(data: Array<any>) {
        const transformedArray = data.map(item => ({
            company_name: item.company_name ? item.company_name.replace(/["\\]/g, '') : '', 
            email: item.email,
            id: item.id,
            mobile_no: item.mobile_no ? item.mobile_no.replace(/["\\]/g, '') : '', 
            name: item.name ? item.name.replace(/["\\]/g, '') : '' 
        }));
        
        this.rowData = transformedArray;
        console.log(this.parties, "data");
    }

    getAllPartyList() {
        this.loadingService.show();
        this.partyService.getParties().subscribe(
            (response: any) => {
                    this.datatranform(response);  // Assuming your data is in the body
                    this.loadingService.hide();
            },
            (error: any) => {
                this.loadingService.hide();
                this.router.navigate(['/login']);
               
            }
        );
    }
    

    viewParty(party: any): void {
        this.partyService.getPartyById(party.id).subscribe(partyDetails => {
            const dialogRef = this.dialog.open(PartyViewDialogComponent, {
              width: '300px',
              data: partyDetails
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
          });
    }

    editParty(party: any): void {
        //this.partyService.updateParty(party).subscribe(partyDetails => {
            const dialogRef = this.dialog.open(PartyFormDialogComponent, {
              width: '300px',
              data: party
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
          //});
    }

    deleteParty(party: any): void {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '300px',
            data: party
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.partyService.deleteParty(party.id).subscribe(() => {
                    console.log('Party deleted successfully');
                    // Show success message
                    this.getAllPartyList(); // Refresh party list
                }, error => {
                    console.error('Failed to delete party:', error);
                    // Show error message
                });
            }
        });
    }
}

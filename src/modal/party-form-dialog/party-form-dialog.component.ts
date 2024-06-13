import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PartyListService } from '../../services/party-list.service';

@Component({
  selector: 'app-party-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './party-form-dialog.component.html',
  styleUrls: ['./party-form-dialog.component.scss']
})
export class PartyFormDialogComponent implements OnInit {
  fb = inject(FormBuilder);
  partyForm!: FormGroup;
  imageFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<PartyFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private partyService: PartyListService
  ) { }

  ngOnInit(): void {
    // debugger
    this.partyForm = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
      company_name: [this.data ? this.data.company_name : '', Validators.required],
      mobile_no: [this.data ? this.data.mobile_no : ''],
      telephone_no: [this.data ? this.data.telephone_no : ''],
      whatsapp_no: [this.data ? this.data.whatsapp_no : ''],
      email: [this.data ? this.data.email : ''],
      login_access: [this.data ? (this.data.hasOwnProperty('login_access', 'login_access') ? this.data.login_access : true) : true],
      remark: [this.data ? this.data.remark : ''],
      date_of_birth: [this.data ? this.data.date_of_birth : '', Validators.required],
      anniversary_date: [this.data ? this.data.anniversary_date : ''],
      gstin: [this.data ? this.data.gstin : ''],
      pan_no: [this.data ? this.data.pan_no : ''],
      apply_tds: [this.data ? this.data.apply_tds : false],
      credit_limit: [this.data ? this.data.credit_limit : '', Validators.min(0)],
      banks: this.fb.array([]),
      address: this.fb.array([]),
      image: [null]
    });

      // Add initial bank and address data if available
  if (this.data && this.data.banks) {
    this.data.banks.forEach((bank: any) => this.addBank(bank));
  }
  if (this.data && this.data.address) {
    this.data.address.forEach((address: any) => this.addAddress(address));
  } else {
    this.addAddress();
    this.addBank();
  }

  }

  get bankControls() {
    return (this.partyForm.get('banks') as FormArray).controls;
  }

  get addressControls() {
    return (this.partyForm.get('address') as FormArray).controls;
  }

  addBank(bankData?: any) {
    const bankGroup = this.fb.group({
      id: [bankData ? bankData.id : null],
      bank_ifsc_code: [bankData ? bankData.bank_ifsc_code : '', Validators.required],
      bank_name: [bankData ? bankData.bank_name : '', Validators.required],
      branch_name: [bankData ? bankData.branch_name : '', Validators.required],
      account_no: [bankData ? bankData.account_no : '', Validators.required],
      account_holder_name: [bankData ? bankData.account_holder_name : '', Validators.required],
      is_active: [bankData ? bankData.is_active : true]
    });
    (this.partyForm.get('banks') as FormArray).push(bankGroup);
  }

  removeBank(index: number) {
    (this.partyForm.get('banks') as FormArray).removeAt(index);
  }

  get f() {
    return this.partyForm.controls;
  }

  addAddress(addressData?: any) {
    const addressGroup = this.fb.group({
      id: [addressData ? addressData.id : null],
      address_line_1: [addressData ? addressData.address_line_1 : '', Validators.required],
      address_line_2: [addressData ? addressData.address_line_2 : ''],
      country: [addressData ? addressData.country : 'India'],
      state: [addressData ? addressData.state : '', Validators.required],
      city: [addressData ? addressData.city : '', Validators.required],
      pincode: [addressData ? addressData.pincode : '', Validators.required],
      is_active: [addressData ? addressData.is_active : true]
    });
    (this.partyForm.get('address') as FormArray).push(addressGroup);
  }

  removeAddress(index: number) {
    (this.partyForm.get('address') as FormArray).removeAt(index);
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.imageFile = event.target.files[0];
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.partyForm.valid) {
      const formData = new FormData();
      for (const key in this.partyForm.value) {
        if (key === 'banks' || key === 'address') {
          formData.append(key, JSON.stringify(this.partyForm.value[key]));
        }
         else {
          if (key === 'image' )  {
            if (this.imageFile)  {
            formData.append(key, this.partyForm.value[key]);
            }
          } else {
            formData.append(key, this.partyForm.value[key]);
          }
        }
      }
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      if (this.data) {
        // Update existing party
        formData.append('id', this.data.id); // Assuming the ID is passed in the data object
        this.partyService.updateParty(formData,this.data.id).subscribe(
          (res: any) => {
            console.log("Party updated successfully");
            this.dialogRef.close();
          },
          error => {
            console.error('Error updating party', error);
          }
        );
      } else {
        // Create new party
        this.partyService.createParty(formData).subscribe(
          (res: any) => {
            console.log("Party created successfully");
            this.dialogRef.close();
          },
          error => {
            console.error('Error creating party', error);
          }
        );
      }
    }
  }
}

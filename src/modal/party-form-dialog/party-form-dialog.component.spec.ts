import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyFormDialogComponent } from './party-form-dialog.component';

describe('PartyFormDialogComponent', () => {
  let component: PartyFormDialogComponent;
  let fixture: ComponentFixture<PartyFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyViewDialogComponent } from './party-view-dialog.component';

describe('PartyViewDialogComponent', () => {
  let component: PartyViewDialogComponent;
  let fixture: ComponentFixture<PartyViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyViewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

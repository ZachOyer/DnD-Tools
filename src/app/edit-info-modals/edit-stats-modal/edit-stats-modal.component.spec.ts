import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatsModalComponent } from './edit-stats-modal.component';

describe('EditStatsModalComponent', () => {
  let component: EditStatsModalComponent;
  let fixture: ComponentFixture<EditStatsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStatsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStatsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

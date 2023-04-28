import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefModalComponent } from './predef-modal.component';

describe('PredefModalComponent', () => {
  let component: PredefModalComponent;
  let fixture: ComponentFixture<PredefModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredefModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBattleStatsComponent } from './edit-battle-stats.component';

describe('EditBattleStatsComponent', () => {
  let component: EditBattleStatsComponent;
  let fixture: ComponentFixture<EditBattleStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBattleStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBattleStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

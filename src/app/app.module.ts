import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { InformationSheetComponent } from './information-sheet/information-sheet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditBasicInfoModalComponent } from './edit-info-modals/edit-basic-info-modal/edit-basic-info-modal.component';
import { EditStatsModalComponent } from './edit-info-modals/edit-stats-modal/edit-stats-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterService } from './character/character.service';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { NewCharacterComponent } from './character-creation/new-character/new-character.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditBattleStatsComponent } from './edit-info-modals/edit-battle-stats/edit-battle-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceRollerComponent,
    InformationSheetComponent,
    EditBasicInfoModalComponent,
    EditStatsModalComponent,
    CharacterCreationComponent,
    NewCharacterComponent,
    EditBattleStatsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [CharacterService,
              BsModalRef,
              BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

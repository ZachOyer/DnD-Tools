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
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemCharService } from 'src/app/character/character-database';
import { CharacterService } from './character/character.service';
import { CharacterCreationComponent } from './character-creation/character-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceRollerComponent,
    InformationSheetComponent,
    EditBasicInfoModalComponent,
    EditStatsModalComponent,
    CharacterCreationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemCharService)
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { InformationSheetComponent } from './information-sheet/information-sheet.component';

const routes: Routes = [
  { path: 'dice-roller', component: DiceRollerComponent, data: { animation: 'Dice'}},
  { path: 'info-sheet', component: InformationSheetComponent, data: { animation: 'Info'}},
  { path: 'character-creation', component: CharacterCreationComponent, data: { animation: 'CharCreation'}},
  { path: '', redirectTo: 'dice-roller', pathMatch: 'full'},
  { path: '**', redirectTo: 'dice-roller', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faArrowsDownToPeople, faArrowUpWideShort, faBolt, faBrain, faCircleArrowUp, faCircleCheck, faCircleLeft, faCoins, faCommentSlash, faDice, faFilePen, faHandFist, faHeart, faMasksTheater, faMinus, faPersonHiking, faPersonRunning, faPlus, faRotate, faSackXmark, faScroll, faShield, faSlash, faWandMagic, faWandMagicSparkles, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleDot, faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { CharacterService } from '../character/character.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { animate, style, transition, trigger } from '@angular/animations';
import { EditBasicInfoModalComponent } from '../edit-info-modals/edit-basic-info-modal/edit-basic-info-modal.component';
import { EditStatsModalComponent } from '../edit-info-modals/edit-stats-modal/edit-stats-modal.component';
import { EditBattleStatsComponent } from '../edit-info-modals/edit-battle-stats/edit-battle-stats.component';
import { EditOtherInfoComponent } from '../edit-info-modals/edit-other-info/edit-other-info.component';

@Component({
  selector: 'app-information-sheet',
  templateUrl: './information-sheet.component.html',
  styleUrls: ['./information-sheet.component.sass'],
  animations: [
    trigger('scaleOut', [
      transition('* => void', [
        animate('0.4s ease-in'),
        style({ transform: 'scale(0) translateY(-100%)', opacity: 0})
      ])
    ]),
    trigger('fadeInBottom', [
      transition('void => *', [
        style({ transform: 'translateY(100%)', opacity: 0}),
        animate('0.4s ease-in'),
        style({ transform: 'translateY(0%)', opacity: 1})
      ])
    ])
  ]
})
export class InformationSheetComponent implements OnInit {
  faStr = faHandFist;
  faDex = faPersonRunning;
  faCon = faHeart;
  faInt = faBrain;
  faWis = faScroll;
  faCha = faMasksTheater;
  faProfBonus = faArrowUpWideShort;
  faEdit = faFilePen;
  faSave = faCircleCheck;
  faAC = faShield;
  faMovement = faPersonHiking;
  faInitiative = faBolt;
  faHealth = faHeart;
  faSelectChar = faArrowsDownToPeople;
  faSuperProf = faCircleArrowUp;
  faYesProf = faCircleDot;
  faNoProf = faCircle;
  faRollWeapon = faDice;
  faCurrency = faCoins;
  faPoor = faSackXmark;
  faConvertRight = faCircleRight;
  faConvertLeft = faCircleLeft;
  faWand = faWandSparkles;
  faNoSpeak = faCommentSlash;
  faAdd = faPlus;
  faRemove = faMinus;

  includeElectrum = true;

  // ------- SET TO TRUE TO RE-ENTER DATA ON LOCAL STORAGE ---------
  reenterData = true;
  // ---------------------------------------------------------------

  currentCharacterIndex: number;
  characters: any;


  constructor(private charService: CharacterService,
              private bsModalService: BsModalService,
              private bsModalRef: BsModalRef,
              private ref: ChangeDetectorRef) {
    this.characters = undefined;
    this.currentCharacterIndex = 0;
  }

  ngOnInit(): void {
    if (this.reenterData) {
      localStorage.setItem('characters', JSON.stringify(this.charService.getHardcodedData()));
    }
    this.characters = this.charService.getCharacters();
    this.currentCharacterIndex = this.charService.getCurrentCharacterIndex(this.characters.length);
    document.documentElement.style.setProperty("--duration", "2s");
  }

  getMod(stat: number): number {
    return Math.floor(stat / 2) - 5;
  }

  setCurrentCharacter(index: string) {
    this.charService.setCurrentCharacterIndex(Number(index));
    this.currentCharacterIndex = Number(index);
  }

  changeHealth(change: number) {
    if (this.characters[this.currentCharacterIndex].hitPoints + change > this.characters[this.currentCharacterIndex].maxHitPoints) {
      this.characters[this.currentCharacterIndex].hitPoints = this.characters[this.currentCharacterIndex].maxHitPoints
    } else if (this.characters[this.currentCharacterIndex].hitPoints + change < 0) {
      this.characters[this.currentCharacterIndex].hitPoints = 0
    } else {
      this.characters[this.currentCharacterIndex].hitPoints += change;
    }
    this.updateInfo();
  }

  updateInfo() {
    console.log("Saving data");
    this.charService.updateCharacters(this.characters);
  }

  toggleElectrum() {
    this.includeElectrum = !this.includeElectrum;
    this.characters[this.currentCharacterIndex].currency.silver += this.characters[this.currentCharacterIndex].currency.electrum * 5;
    this.characters[this.currentCharacterIndex].currency.electrum = 0;
  }

  calcHealth(): string {
    if (this.characters[this.currentCharacterIndex].hitPoints == 0) {
      return '';
    }
    if (this.characters[this.currentCharacterIndex].hitPoints / this.characters[this.currentCharacterIndex].maxHitPoints < 0.5) {
      if (this.characters[this.currentCharacterIndex].hitPoints / this.characters[this.currentCharacterIndex].maxHitPoints < 0.2) {
        document.documentElement.style.setProperty("--duration", "1s");
      } else {
        document.documentElement.style.setProperty("--duration", "2s");
      }
      return 'low-health';
    }
    return '';
  }

  initCurrency() {
    if (!this.characters[this.currentCharacterIndex]?.currency) {
      this.characters[this.currentCharacterIndex].currency = {
        copper: 0,
        silver: 0,
        electrum: 0,
        gold: 0,
        platinum: 0
      }
    }
  }

  convertUp(currency: string) {
    if (currency === 'copper' && this.characters[this.currentCharacterIndex].currency.copper > 9) {
      this.characters[this.currentCharacterIndex].currency.silver += 1;
      this.characters[this.currentCharacterIndex].currency.copper -= 10;
    } else if (currency === 'silver' && this.includeElectrum && this.characters[this.currentCharacterIndex].currency.silver > 4) {
      this.characters[this.currentCharacterIndex].currency.electrum += 1;
      this.characters[this.currentCharacterIndex].currency.silver -= 5;
    } else if (currency === 'silver' && !this.includeElectrum && this.characters[this.currentCharacterIndex].currency.silver > 9) {
      this.characters[this.currentCharacterIndex].currency.gold += 1;
      this.characters[this.currentCharacterIndex].currency.silver -= 10;
    } else if (currency === 'electrum' && this.characters[this.currentCharacterIndex].currency.electrum > 1) {
      this.characters[this.currentCharacterIndex].currency.gold += 1;
      this.characters[this.currentCharacterIndex].currency.electrum -= 2;
    } else if (currency === 'gold' && this.characters[this.currentCharacterIndex].currency.gold > 9) {
      this.characters[this.currentCharacterIndex].currency.platinum += 1;
      this.characters[this.currentCharacterIndex].currency.gold -= 10;
    }
    this.updateInfo();
  }

  convertDown(currency: string) {
    if (currency === 'silver' && this.characters[this.currentCharacterIndex].currency.silver > 0) {
      this.characters[this.currentCharacterIndex].currency.silver -= 1;
      this.characters[this.currentCharacterIndex].currency.copper += 10;
    } else if (currency === 'electrum' && this.characters[this.currentCharacterIndex].currency.electrum > 0) {
      this.characters[this.currentCharacterIndex].currency.electrum -= 1;
      this.characters[this.currentCharacterIndex].currency.silver += 5;
    } else if (currency === 'gold' && this.includeElectrum && this.characters[this.currentCharacterIndex].currency.gold > 0) {
      this.characters[this.currentCharacterIndex].currency.gold -= 1;
      this.characters[this.currentCharacterIndex].currency.electrum += 2;
    } else if (currency === 'gold' && !this.includeElectrum && this.characters[this.currentCharacterIndex].currency.gold > 0) {
      this.characters[this.currentCharacterIndex].currency.gold -= 1;
      this.characters[this.currentCharacterIndex].currency.silver += 10;
    } else if (currency === 'plat' && this.characters[this.currentCharacterIndex].currency.platinum > 0) {
      this.characters[this.currentCharacterIndex].currency.platinum -= 1;
      this.characters[this.currentCharacterIndex].currency.gold += 10;
    }
    this.updateInfo();
  }

  convertCurrency() {
    this.characters[this.currentCharacterIndex].currency.silver += Math.floor(this.characters[this.currentCharacterIndex].currency.copper / 10);
    this.characters[this.currentCharacterIndex].currency.copper %= 10;
    if (this.includeElectrum) {
      this.characters[this.currentCharacterIndex].currency.electrum += Math.floor(this.characters[this.currentCharacterIndex].currency.silver / 5);
      this.characters[this.currentCharacterIndex].currency.silver %= 5;
    } else {
      this.characters[this.currentCharacterIndex].currency.gold += Math.floor(this.characters[this.currentCharacterIndex].currency.silver / 10);
      this.characters[this.currentCharacterIndex].currency.silver %= 10;
    }
    this.characters[this.currentCharacterIndex].currency.gold += Math.floor(this.characters[this.currentCharacterIndex].currency.electrum / 2);
    this.characters[this.currentCharacterIndex].currency.electrum %= 2;
    this.characters[this.currentCharacterIndex].currency.platinum += Math.floor(this.characters[this.currentCharacterIndex].currency.gold / 10);
    this.characters[this.currentCharacterIndex].currency.gold %= 10;
    this.updateInfo();
  }

  numRows(input: string) {
    if (!input || (input.match(/\n/g) || [])?.length < 5) {
      return 5;
    } else if ((input.match(/\n/g) || [])?.length > 23) {
      return 24;
    }
    return (input.match(/\n/g) || []).length + 1;
  }

  changeBasicInfo() {
    this.bsModalRef = this.bsModalService.show(EditBasicInfoModalComponent, {class: 'modal-dialog-centered'});
    this.bsModalRef.content.newInfo.name = this.characters[this.currentCharacterIndex].name;
    this.bsModalRef.content.newInfo.level = this.characters[this.currentCharacterIndex].level;
    this.bsModalRef.content.newInfo.class = this.characters[this.currentCharacterIndex].class;
    this.bsModalRef.content.newInfo.race = this.characters[this.currentCharacterIndex].race;
    this.bsModalRef.content.newInfo.background = this.characters[this.currentCharacterIndex].background;
    this.bsModalRef.content.newInfo.alignment = this.characters[this.currentCharacterIndex]?.alignment;
    this.bsModalRef.content.newInfo.xp = this.characters[this.currentCharacterIndex]?.xp;
    this.bsModalRef.content.updateBasicInfo.subscribe((info: any) => {
      this.characters[this.currentCharacterIndex].name = info?.name;
      this.characters[this.currentCharacterIndex].level = info?.level;
      this.characters[this.currentCharacterIndex].class = info?.class;
      this.characters[this.currentCharacterIndex].race = info?.race;
      this.characters[this.currentCharacterIndex].background = info?.background;
      this.characters[this.currentCharacterIndex].alignment = info?.alignment;
      this.characters[this.currentCharacterIndex].xp = info?.xp;
      this.updateInfo();
      this.ref.detectChanges();
    })
  }

  changeStats() {
    this.bsModalRef = this.bsModalService.show(EditStatsModalComponent, {class: 'modal-dialog-centered'});
    this.bsModalRef.content.newInfo.strength = this.characters[this.currentCharacterIndex].strength;
    this.bsModalRef.content.newInfo.dexterity = this.characters[this.currentCharacterIndex].dexterity;
    this.bsModalRef.content.newInfo.constitution = this.characters[this.currentCharacterIndex].constitution;
    this.bsModalRef.content.newInfo.intelligence = this.characters[this.currentCharacterIndex].intelligence;
    this.bsModalRef.content.newInfo.wisdom = this.characters[this.currentCharacterIndex].wisdom;
    this.bsModalRef.content.newInfo.charisma = this.characters[this.currentCharacterIndex]?.charisma;
    this.bsModalRef.content.updateStats.subscribe((info: any) => {
      this.characters[this.currentCharacterIndex].strength = info?.strength;
      this.characters[this.currentCharacterIndex].dexterity = info?.dexterity;
      this.characters[this.currentCharacterIndex].constitution = info?.constitution;
      this.characters[this.currentCharacterIndex].intelligence = info?.intelligence;
      this.characters[this.currentCharacterIndex].wisdom = info?.wisdom;
      this.characters[this.currentCharacterIndex].charisma = info?.charisma;
      this.updateInfo();
      this.ref.detectChanges();
    })
  }

  changeBattleStats() {
    this.bsModalRef = this.bsModalService.show(EditBattleStatsComponent, {class: 'modal-dialog-centered'});
    this.bsModalRef.content.newInfo.armorClass = this.characters[this.currentCharacterIndex].armorClass;
    this.bsModalRef.content.newInfo.initiative = this.characters[this.currentCharacterIndex].initiative;
    this.bsModalRef.content.newInfo.speed = this.characters[this.currentCharacterIndex].speed;
    this.bsModalRef.content.newInfo.maxHitPoints = this.characters[this.currentCharacterIndex].maxHitPoints;
    this.bsModalRef.content.updateBattleStats.subscribe((info: any) => {
      this.characters[this.currentCharacterIndex].armorClass = info?.armorClass;
      this.characters[this.currentCharacterIndex].initiative = info?.initiative;
      this.characters[this.currentCharacterIndex].speed = info?.speed;
      this.characters[this.currentCharacterIndex].maxHitPoints = info?.maxHitPoints;
      if (this.characters[this.currentCharacterIndex].hitPoints > this.characters[this.currentCharacterIndex].maxHitPoints) {
        this.characters[this.currentCharacterIndex].hitPoints = this.characters[this.currentCharacterIndex].maxHitPoints;
      }
      this.updateInfo();
      this.ref.detectChanges();
    })
  }

  changeOtherInfo(openTo?: number) {
    this.bsModalRef = this.bsModalService.show(EditOtherInfoComponent, {class: 'modal-lg modal-dialog-centered'});
    this.bsModalRef.content.character = this.characters[this.currentCharacterIndex];
    if (openTo) {
      this.bsModalRef.content.openToTab = openTo;
    }
  }


}

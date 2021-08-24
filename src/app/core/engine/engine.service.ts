import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BandsService } from '../bands.service';
import { RngService } from '../rng.service';
import {
  TribesService,
  MAX_PLAYERS,
  IControlledStatus,
} from '../tribes.service';
import { AiActions } from './aiActions';
import { MIN_ROLLS, MAX_ROLLS, D10 } from './constants';
import { LoggerService } from './logger.service';
import { Resources, IResource } from './resources';
import { logTypes } from './log';
import { HumanActions } from './human-actions';
import { IField, MapService } from '../map.service';
import { EventTypes } from './events';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class EngineService {
  maxPlayers: number;
  tribesStatus: IControlledStatus[];
  aiActions: AiActions;
  humanActions: HumanActions;
  currentTurn: number;
  currentPlayerId: number = 0;
  currentIndex: number = 0;
  currentPhase: number = 0;
  selectedField: IField | null = null;

  private statusSource = new BehaviorSubject(false);
  newResourcesDialogStatus = this.statusSource.asObservable();

  private newMoveSource = new BehaviorSubject(false);
  newMoveMessage = this.newMoveSource.asObservable();

  private newAdvancesSource = new BehaviorSubject(false);
  newAdvances = this.newAdvancesSource.asObservable();

  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private rngService: RngService,
    private loggerService: LoggerService,
    private mapService: MapService,
    private eventsService: EventsService
  ) {
    this.maxPlayers = MAX_PLAYERS;
    this.aiActions = new AiActions();
    this.humanActions = new HumanActions();
  }

  initControlledStatus() {
    this.tribesStatus = this.tribesService.getIsControlledStatus();
  }

  phaseLoop() {
    if (this.currentIndex >= MAX_PLAYERS) {
      this.currentIndex = 0;
      this.currentPhase += 1;
    }

    this.currentPlayerId = this.tribesStatus[this.currentIndex].id;

    // new resources
    if (this.currentPhase === 0) {
      if (!this.tribesStatus[this.currentIndex].controlledByPlayer) {
        this.aiNewResuorces();
        this.currentIndex += 1;
        this.phaseLoop();
      } else {
        this.playerNewResuorces();
        this.currentIndex += 1;
      }
      return;
    }
    // set new resources
    if (this.currentPhase === 1) {
      this.setNewBands();
      this.setNewAdvances();
      this.tribesService.setMovement();
      this.currentPhase += 1;
    }
    // bands movement
    if (this.currentPhase === 2) {
      if (!this.tribesStatus[this.currentIndex].controlledByPlayer) {
        let availableMoves = this.tribesService.getMovement(
          this.currentPlayerId
        );
        while (availableMoves > 0) {
          const selectedMaxSizeBand = this.bandsService.selectMaxSizeBand(
            this.currentPlayerId
          );
          const { x, y } = selectedMaxSizeBand;
          this.moveBand(x, y, this.currentPlayerId);
          this.tribesService.decreaseMovement(this.currentPlayerId);
          availableMoves -= 1;
        }
        this.currentIndex += 1;
        this.phaseLoop();
      } else {
        let humanPlayerAvailableMoves = this.tribesService.getMovement(
          this.currentPlayerId
        );
        if (humanPlayerAvailableMoves === 0) {
          this.currentIndex += 1;
          this.phaseLoop();
        } else {
          this.currentIndex += 1;
        }
      }
      return;
    }
    // events
    if (this.currentPhase === 3) {
      this.checkEventsForFields();
      this.currentPhase += 1;
    }
    if (this.currentPhase === 4) {
      console.log('phase 4');
    }
    this.currentIndex = 0;
    this.currentPhase = 0;
  }

  setCurrentTurn(currentTurn: number) {
    this.currentTurn = currentTurn;
  }

  closeNewResourcesDialog() {
    this.statusSource.next(false);
    const cards = this.tribesService.getPlayerNewResources() || [];
    const cardsLog = `Player Id:${this.currentPlayerId} ${cards
      .map((card) => card.type)
      .join(',')}`;
    this.loggerService.addLog(
      logTypes.phase1,
      this.currentTurn,
      ' [ H ] ' + cardsLog
    );
  }

  /* new Resources phase */
  newResources() {
    this.humanActions.resetReroll();
    this.phaseLoop();
  }

  aiNewResuorces = () => {
    const lostGame = this.tribesService.getLostGame(this.currentPlayerId);
    if (lostGame) {
      this.tribesService.setNewResources(this.currentPlayerId, []);
      this.loggerService.addLog(
        logTypes.phase1,
        this.currentTurn,
        'skip - lost game'
      );
    } else {
      let cards = this.drawNewResources(this.currentPlayerId);
      cards = this.aiActions.newResourcesDecision(cards);
      const cardsLog = `Player Id:${this.currentPlayerId} ${cards
        .map((card) => card.type)
        .join(',')}`;
      this.loggerService.addLog(logTypes.phase1, this.currentTurn, cardsLog);
      this.tribesService.setNewResources(this.currentPlayerId, cards);
    }
  };

  playerNewResuorces = () => {
    let cards = this.drawNewResources(this.currentPlayerId);
    this.tribesService.setNewResources(this.currentPlayerId, cards);
    this.statusSource.next(true);
  };

  getNextCard = (index: number) => {
    const { nextCard, rollAgain } = this.humanActions.getNextCard();
    const newResources = this.tribesService.getPlayerNewResources() || [];
    if (newResources.length) newResources[index] = nextCard;
    this.tribesService.setNewResources(this.currentPlayerId, newResources);
    return rollAgain;
  };

  drawNewResources(id: number) {
    const fieldsNumber = this.bandsService.getNumberOfSettledFieldsById(id);
    const additionalRolls = Math.floor(fieldsNumber / 3); // one dice roll for each 3 fields extra
    const diceRollNumber =
      additionalRolls > 3 ? MAX_ROLLS : MIN_ROLLS + additionalRolls;
    const resourcesSet = new Resources().defaultSet();
    let cards: IResource[] = [];

    for (let i = 0; i < diceRollNumber; i++) {
      const draw = this.rngService.draw(D10);
      cards.push(resourcesSet[draw]);
    }
    return cards;
  }

  /* set new resources phase */

  setNewBands() {
    const newBands = this.tribesService.getNewBands();
    newBands.forEach(({ tribeId, newBandsNumber }) => {
      while (newBandsNumber > 0) {
        const index = this.bandsService.findMinBandsIndex(tribeId);
        this.bandsService.insertNewBand(index);
        newBandsNumber -= 1;
      }
    });
  }

  setNewAdvances() {
    const newAdvances = this.tribesService.getNewAdvances();
    let advancesAdded = false;
    newAdvances.forEach((id) => {
      if (id !== -1) {
        this.tribesService.setNewAdvance(id);
        if (!advancesAdded) advancesAdded = true;
      }
    });
    if (advancesAdded) this.newAdvancesSource.next(true);
  }

  /* automatic random direction move */
  moveBand(fromX: number, fromY: number, ownerId: number) {
    const availableFields = this.mapService.getAvailableFields(fromX, fromY);
    const selectedField = this.aiActions.makeMove(availableFields);
    const { x: newX, y: newY } = selectedField;
    this.bandsService.moveBand(ownerId, fromX, fromY, newX, newY);
  }

  /* human player move phase */

  setSelectedField(field: IField) {
    const availableMoves = this.tribesService.getMovement(this.currentPlayerId);
    if (availableMoves < 1) return;

    if (!this.selectedField) {
      this.selectMapField(field);
    } else if (this.selectedField.id === field.id) {
      this.deselectMapField(field);
    } else {
      this.checkMove(field);
    }
  }

  selectMapField(field: IField) {
    this.selectedField = field;
    this.mapService.setSelectField(field.id, true);
  }

  deselectMapField(field: IField) {
    this.selectedField = null;
    this.mapService.setSelectField(field.id, false);
  }

  checkMove(field: IField) {
    if (this.selectedField) {
      const { x, y } = this.selectedField;
      const { x: newX, y: newY } = field;
      const hasBands = this.bandsService.playerHasBandOnField(
        this.currentPlayerId,
        x,
        y
      );
      const distance = Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2));

      if (hasBands && distance < 1.5) {
        this.bandsService.moveBand(this.currentPlayerId, x, y, newX, newY);
        this.tribesService.decreaseMovement(this.currentPlayerId);
        this.deselectMapField(this.selectedField);
        this.bandsService.removeEmptyBands();
        this.newMoveSource.next(true);
        const availableMoves = this.tribesService.getMovement(
          this.currentPlayerId
        );
        if (availableMoves === 0) this.phaseLoop();
      } else {
        this.deselectMapField(this.selectedField);
        this.selectMapField(field);
      }
    }
  }

  // events
  checkEventsForFields() {
    this.mapService.fields.forEach((field) => {
      const bandsOnField = this.bandsService.getBandsByPosition(
        field.x,
        field.y
      );
      if (bandsOnField.length > 0) {
        const event = this.rngService.drawEvent();

        if (event.eventType !== EventTypes.NoEvent) {
          bandsOnField.forEach((band) => {
            const technologyLevel = this.tribesService.getTechnologyLevel(
              band.ownerId,
              event.skill
            );
            const randomD6 = this.rngService.draw(6) + 1;
            const result = randomD6 - technologyLevel;

            const DIFFICULTY_LEVEL = 1; // the designed difficulty level is equal to 0

            if (
              event.eventType === EventTypes.Disaster &&
              result > DIFFICULTY_LEVEL
            ) {
              band.size -= 1;
              if (this.tribesService.getTribeControlledByPlayer(band.ownerId)) {
                this.eventsService.createEventLog(
                  event,
                  field,
                  'Straciłeś jedną bandę.'
                );
              }
            }

            if (
              event.eventType === EventTypes.Progress &&
              result <= DIFFICULTY_LEVEL
            ) {
              this.tribesService.setNewAdvance(band.ownerId);
              // TODO: add new advance info
              if (this.tribesService.getTribeControlledByPlayer(band.ownerId)) {
                this.eventsService.createEventLog(
                  event,
                  field,
                  'Zyskałeś wynalazek.'
                );
              }
            }
            if (
              event.eventType === EventTypes.Expansion &&
              result <= DIFFICULTY_LEVEL
            ) {
              band.size += 1;
              if (this.tribesService.getTribeControlledByPlayer(band.ownerId)) {
                this.eventsService.createEventLog(
                  event,
                  field,
                  'Zyskałeś jedną bandę.'
                );
              }
            }
            if (event.eventType === EventTypes.Migration) {
              if (result <= DIFFICULTY_LEVEL) {
                this.moveBand(band.x, band.y, band.ownerId);
                if (
                  this.tribesService.getTribeControlledByPlayer(band.ownerId)
                ) {
                  this.eventsService.createEventLog(
                    event,
                    field,
                    'Jedna z band migowała.'
                  );
                }
              } else {
                band.size -= 1;
                if (
                  this.tribesService.getTribeControlledByPlayer(band.ownerId)
                ) {
                  this.eventsService.createEventLog(
                    event,
                    field,
                    'Straciłeś jedną bandę w czasie migracji.'
                  );
                }
              }
            }
            this.bandsService.removeEmptyBands();
          });
        }
      }
    });

    const tribes = this.tribesService.getTribes();
    tribes.map((tribe) => {
      let hasAnyBands = this.bandsService.hasBands(tribe.id);
      const lostGame = this.tribesService.getLostGame(tribe.id);
      if (!lostGame && !hasAnyBands) {
        // TODO: add tribe lost info
        console.log(tribe.id, 'lost');
        tribe.lostGame = true;
      }
      return tribe;
    });
  }
}

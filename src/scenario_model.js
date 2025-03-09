import { today } from "./utils";
import { BaseModel, createInstance } from "./base_model";
import { Campaign } from "./campaign_model";
import { Character } from "./character_model";
import { Deck } from "./deck";
import { BATTLE_GOALS, ENEMIES_MAP, MONSTER_MODIFIERS_DECK } from "./data";
import { Enemy } from "./enemy_model";

const levels = [1, 2, 3, 4, 5, 6, 7].map((l) => ({ value: l, text: l }));

class EnemyActions {
  decks = {};
  shown = {};

  addType(type) {
    if (!(type in this.decks)) {
      const cards = ENEMIES_MAP[type].actions.map((a) => a.id);
      this.decks[type] = new Deck(cards);
    }
  }

  hasEnemyAction(type) {
    return this.shown[type];
  }

  getEnemyDeck(type) {
    return this.decks[type];
  }

  selectAction(type) {
    if (this.shown[type]) {
      return;
    }
    this.shown[type] = true;
    this.decks[type].deal(1);
  }

  getAction(type) {
    if (!this.shown[type]) {
      return false;
    }
    const cardId = this.decks[type]._discardPile[0];
    const card = ENEMIES_MAP[type].actions.find((c) => c.id === cardId);
    return card;
  }

  nextRound() {
    this.shown = {};
  }
}

export class Scenario extends BaseModel {
  fields = {
    name: { type: "char", label: "Description", placeholder: "New Scenario" },
    createDate: { type: "char", label: "Create Date", default: today },
    level: {
      type: "select",
      label: "Level",
      choices: levels,
      default: 1,
      isNumber: true,
    },

    campaign: { type: "many2one", label: "Campaign", comodel: Campaign },
    characters: { type: "one2many", label: "Heroes", comodel: Character },
    enemies: { type: "one2many", label: "Enemies", comodel: Enemy },
    rounds: { type: "number", label: "Rounds" },
    activeEntityId: { type: "char", label: "Id of ActiveEntity" },
    actionSelected: { type: "boolean" }, // true if actions have been selected

    enemyAttackMods: {
      type: "instance",
      cls: Deck,
      default: () => new Deck(MONSTER_MODIFIERS_DECK.map((c) => c.id)),
    },
    enemyActions: {
      type: "instance",
      cls: EnemyActions,
      deserialize: (e) => {
        for (let t in e.decks) {
          Object.setPrototypeOf(e.decks[t], Deck.prototype);
        }
      },
    },

    // elements
    fire: { type: "number", label: "Fire" },
    ice: { type: "number", label: "Ice" },
    air: { type: "number", label: "Air" },
    earth: { type: "number", label: "Earth" },
    light: { type: "number", label: "Light" },
    darkness: { type: "number", label: "Darkness" },

    // stats
    enemyCount: { type: "number", label: "Spawned Enemies" },
  };

  // constructor(data) {
  //   super(data);
  //   /** @type { string } */
  //   this.name;
  //   /** @type { Campaign } */
  //   this.campaign;
  //   if (!this.campaign) {
  //     throw new Error("boom");
  //   }
  setup() {
    const battleGoals = new Deck(BATTLE_GOALS);
    battleGoals.shuffle();
    this.characters = this.campaign.heroes.map((h) => {
      const battleGoalChoices = battleGoals.take(2).map((g) => g.id);
      return createInstance(Character, {
        hero: h,
        scenario: this,
        battleGoalChoices,
      });
    });
  }

  isValid() {
    return !!this.name;
  }

  nextRound() {
    this.endCurrentTurn();
    this.rounds++;
    if (this.fire > 0) {
      this.fire--;
    }
    if (this.ice > 0) {
      this.ice--;
    }
    if (this.air > 0) {
      this.air--;
    }
    if (this.earth > 0) {
      this.earth--;
    }
    if (this.light > 0) {
      this.light--;
    }
    if (this.darkness > 0) {
      this.darkness--;
    }
    this.updateAttackMods(this.enemyAttackMods);
    for (let char of this.characters) {
      this.updateAttackMods(char.attackMods);
    }
    this.enemyActions.nextRound();
    this.actionSelected = false;
    for (let char of this.characters) {
      char.didStart = false;
    }
    for (let enemy of this.enemies) {
      enemy.didStart = false;
      enemy.didEnd = false;
    }
    this.activeEntityId = null;
  }

  updateAttackMods(deck) {
    deck.filterDiscardPile((e) => e !== "curse" && e !== "blessing");
    if (
      deck.hasInDiscardPile((id) => {
        const card = MONSTER_MODIFIERS_DECK.find((m) => m.id === id);
        return card && card.recycled;
      })
    ) {
      deck.moveDiscarPileToDeck();
    }
  }

  startCharTurn(id) {
    this.endCurrentTurn();
    const char = this.characters.find((c) => c.id === id);
    char.didStart = true;
    this.activeEntityId = id;
    if (char.wound) {
      char.hp--;
    }
  }

  startEnemyTurn(type) {
    this.endCurrentTurn();
    this.activeEntityId = type;
    for (let enemy of this.enemies) {
      if (!enemy.didStart && enemy.type === type) {
        enemy.didStart = true;
        if (enemy.wound) {
          enemy.hp--;
        }
      }
    }
  }

  removeSomeStatus(entity) {
    if (entity.confusion > 0) {
      entity.confusion--;
    }
    if (entity.immobilisation > 0) {
      entity.immobilisation--;
    }
    if (entity.stunned > 0) {
      entity.stunned--;
    }
    if (entity.renforced > 0) {
      entity.renforced--;
    }
    if (entity.disarmed > 0) {
      entity.disarmed--;
    }
  }

  endCurrentTurn() {
    if (!this.activeEntityId) {
      return;
    }
    const char = this.characters.find((c) => c.id === this.activeEntityId);
    if (char) {
      // end of character turn
      this.removeSomeStatus(char);
    } else {
      for (let enemy of this.enemies) {
        if (
          enemy.type === this.activeEntityId &&
          enemy.didStart &&
          !enemy.didEnd
        ) {
          enemy.didEnd = true;
          // end of enemy turn
          this.removeSomeStatus(enemy);
        }
      }
    }
  }

  cycleElement(elem) {
    this[elem] = this[elem] - 1;
    if (this[elem] < 0) {
      this[elem] = 2;
    }
  }

  addEnemy(enemy) {
    this.enemyCount++;
    this.enemies.push(enemy);
    this.enemyActions.addType(enemy.type);
  }

  addCurse(deck) {
    const ncurses = deck.count((c) => c === "curse");
    if (ncurses < 10) {
      deck.addCard("curse");
      deck.shuffle();
    }
  }

  addBlessing(deck) {
    const nBlessings = deck.count((c) => c === "blessing");
    if (nBlessings < 10) {
      deck.addCard("blessing");
      deck.shuffle();
    }
  }

  removeEnemy(enemy) {
    const index = this.enemies.findIndex((e) => e.id === enemy.id);
    if (index >= 0) {
      this.enemies.splice(index, 1);
    }
  }

  getEnemyActions() {
    const result = [];
    const obj = {};
    for (let e of this.enemies) {
      if (!obj[e.id]) {
        obj[e.id] = true;
        result.push({
          id: e.id,
          enemyName: e.name,
          card: this.enemyActions.getAction(e.type),
          ncards: this.enemyActions.getEnemyDeck(e.type).length(),
        });
      }
    }
    return result;
  }

  hasAllEnemyActions() {
    for (let e of this.enemies) {
      if (!this.enemyActions.hasEnemyAction(e.type)) {
        return false;
      }
    }
    return true;
  }

  selectActions() {
    for (let e of this.enemies) {
      if (!this.enemyActions.hasEnemyAction(e.type)) {
        this.enemyActions.selectAction(e.type);
      }
    }
    this.actionSelected = true;
  }
}

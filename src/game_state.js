import { ENEMIES_MAP, MONSTER_MODIFIERS_DECK } from "./data";
import { shuffleArray } from "./utils";

// -----------------------------------------------------------------------------
// MARK: Game state
// -----------------------------------------------------------------------------

export class GameState {
  nextId = 1;
  heroes = [];
  enemies = [];
  scenarioLevel = 1;
  round = 0;
  fire = 0;
  ice = 0;
  air = 0;
  earth = 0;
  light = 0;
  darkness = 0;
  monsterActions = {};
  enemyModifiers = {
    visible: 0, // number of discarded cards to show
    deck: shuffleArray(MONSTER_MODIFIERS_DECK.map((c) => c.id)),
    discardPile: [],
  };
  battleGoals = {};
  turnTracker = {};
  activeEntity = false;
  config = {
    elements: true,
    turnTracker: true,
    battleGoals: true,
    enemyActions: true,
    attackModifiers: true,
  };

  screens = ["START"];
  states = [null];

  get screen() {
    return this.screens.at(-1);
  }

  get state() {
    return this.states.at(-1);
  }

  setScreen(screen) {
    this.screens = [screen];
    this.states = [null];
  }

  pushScreen(screen, state = null) {
    this.screens.push(screen);
    this.states.push(state);
  }

  popScreen() {
    this.screens.pop();
    this.states.pop();
  }

  addHero(hero) {
    hero.id = this.nextId++;
    this.heroes.push(hero);
  }

  addEnemy(enemy) {
    enemy.id = this.nextId++;
    this.enemies.push(enemy);
    this.turnTracker[enemy.type] = false;
    if (!this.monsterActions[enemy.type]) {
      const deck = ENEMIES_MAP[enemy.type].actions.map((a) => a.id);
      shuffleArray(deck);
      this.monsterActions[enemy.type] = {
        deck,
        discardPile: [],
        active: false,
        initiative: false,
      };
    }
  }

  getId() {
    return this.nextId++;
  }

  isNextRoundEnabled() {
    if (this.round === 0) {
      return true;
    }
    if (this.config.turnTracker) {
      for (let hero of this.heroes) {
        if (!this.turnTracker[hero.id]) {
          return false;
        }
      }
      for (let enemy of this.enemies) {
        if (!this.turnTracker[enemy.type]) {
          return false;
        }
      }
    }
    return true;
  }

  startTurn(entity) {
    const prevEntity = this.activeEntity;
    if (prevEntity) {
      this.endTurn(prevEntity);
    }
    this.activeEntity = entity;
    this.turnTracker[entity] = true;
  }

  endTurn(entity) {
    if (typeof entity === "number") {
      // its a hero!
      const hero = this.heroes.find((hero) => hero.id === entity);
      this.clearStatus(hero.status);
    } else {
      // its a monster!
      for (let enemy of this.enemies) {
        if (enemy.type === entity && !enemy.hasTurnEnded) {
          this.clearStatus(enemy.status);
        }
        enemy.hasTurnEnded = true;
      }
    }
  }

  clearStatus(status) {
    status.confusion = Math.max(0, status.confusion - 1);
    status.immobilisation = Math.max(0, status.immobilisation - 1);
    status.stunned = Math.max(0, status.stunned - 1);
    status.disarmed = Math.max(0, status.disarmed - 1);
    status.renforced = Math.max(0, status.renforced - 1);
  }

  incrementRound() {
    if (this.activeEntity) {
      this.endTurn(this.activeEntity);
    }
    this.round++;
    for (let elem of ["fire", "ice", "air", "earth", "light", "darkness"]) {
      if (this[elem] > 0) {
        this[elem]--;
      }
    }
    // reset all monster actions
    for (let type in this.monsterActions) {
      this.monsterActions[type].active = false;
      this.monsterActions[type].initiative = false;
      let shouldShuffle = false;
      for (let actionId of this.monsterActions[type].discardPile) {
        const action = ENEMIES_MAP[type].actions.find((a) => a.id === actionId);
        if (action.recycled) {
          shouldShuffle = true;
          break;
        }
      }
      if (shouldShuffle) {
        const deck = ENEMIES_MAP[type].actions.map((a) => a.id);
        shuffleArray(deck);
        this.monsterActions[type].deck = deck;
        this.monsterActions[type].discardPile = [];
      }
    }

    // reset all enemy attack modifiers if necessary
    const mods = this.enemyModifiers;
    mods.visible = 0;
    // remove strings (curses and blessings)
    mods.discardPile = mods.discardPile.filter((c) => typeof c === "number");
    const discardedMods = mods.discardPile.map((id) =>
      MONSTER_MODIFIERS_DECK.find((mod) => mod.id === id),
    );
    if (discardedMods.find((mod) => mod.recycled)) {
      // should shuffle
      while (mods.discardPile.length) {
        mods.deck.push(mods.discardPile.pop());
      }
      shuffleArray(mods.deck);
    }

    // reset turntracker to false
    this.turnTracker = {};
    this.activeEntity = false;

    for (let enemy of this.enemies) {
      enemy.hasTurnEnded = false;
    }
  }

  addCurse() {
    const curses = this.enemyModifiers.deck.filter((id) => {
      return typeof id === "string" && id.startsWith("curse");
    });
    if (curses.length < 10) {
      this.enemyModifiers.deck.push(`curse${-this.nextId++}`);
      shuffleArray(this.enemyModifiers.deck);
    }
  }
  addBlessing() {
    const blessings = this.enemyModifiers.deck.filter((id) => {
      return typeof id === "string" && id.startsWith("blessing");
    });
    if (blessings.length < 10) {
      this.enemyModifiers.deck.push(`blessing${-this.nextId++}`);
      shuffleArray(this.enemyModifiers.deck);
    }
  }
}

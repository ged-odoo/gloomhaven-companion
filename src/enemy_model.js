import { BaseModel } from "./base_model";
import { mapping } from "./character_model";
import { ENEMIES } from "./data";
import { Scenario } from "./scenario_model";

const types = ENEMIES.map((e) => {
  const text = e.name + (e.boss ? " (BOSS)" : "");
  return { value: e.id, text };
});

export class Enemy extends BaseModel {
  fields = {
    scenario: { type: "many2one", label: "Scenario", comodel: Scenario },
    hp: { type: "number", label: "HP" },
    maxHp: { type: "number", label: "Max HP" },
    attack: { type: "number", label: "Attack" },
    move: { type: "number", label: "Move" },
    visibleId: { type: "number", label: "Visible Id" },
    type: {
      type: "char",
      label: "Type",
      choices: [{ value: "", text: "" }].concat(types),
    },
    isElite: { type: "boolean", label: "Is Elite" },
    didStart: { type: "boolean" },
    didEnd: { type: "boolean" },

    // statuses
    poisoned: { type: "boolean" },
    wound: { type: "boolean" },
    confusion: { type: "number" },
    immobilisation: { type: "number" },
    stunned: { type: "number" },
    renforced: { type: "number" },
    disarmed: { type: "number" },
  };
  cache = null;

  setup() {
    // todo: get maxhp, hp
    //   this.maxHp = this.hero.maxHp;
    //   this.hp = this.maxHp;
  }

  get moveValue() {
    return 10;
  }

  get attackValue() {
    return 10;
  }

  isValid() {
    return !!this.type;
  }

  get name() {
    return this.descr.name;
  }

  get fullName() {
    let result = this.isElite ? "Elite " : "";
    result += this.name;
    if (this.isBoss) {
      result += " [BOSS]";
    }
    if (!this.isBoss && this.visibleId) {
      result += ` [${this.visibleId}]`;
    }
    return result;
  }

  get initiative() {
    const action = this.scenario.enemyActions.getAction(this.type);
    return action ? action.initiative : false;
  }
  get isBoss() {
    return this.descr?.boss;
  }

  get modifiers() {
    if (this.isBoss) {
      return "";
    }
    const lvl = this.scenario.level;
    if (this.isElite) {
      return this.descr.eliteModifiers[lvl - 1];
    }
    return this.descr.normalModifiers[lvl - 1];
  }

  get immunities() {
    const immunities = this.descr.immunities;
    return immunities ? this.descr.immunities.join(", ") : "";
  }

  get descr() {
    if (!this.cache || this.cache.id !== this.type) {
      this.cache = ENEMIES.find((e) => e.id === this.type);
    }
    return this.cache;
  }

  get special1() {
    const lvl = this.scenario.level;
    const A = this.scenario.characters.length;
    return this.descr.special1[lvl - 1](A);
  }

  get special2() {
    const lvl = this.scenario.level;
    const A = this.scenario.characters.length;
    return this.descr.special2[lvl - 1](A);
  }

  computeValues() {
    const lvl = this.scenario.level;
    const descr = this.descr;
    if (this.isBoss) {
      const A = this.scenario.characters.length;
      this.maxHp = descr.hp[lvl - 1](A);
      this.hp = this.maxHp;
      this.attack = descr.attack[lvl - 1](A);
      this.move = descr.move[lvl - 1];
    } else if (this.isElite) {
      this.maxHp = descr.eliteHp[lvl - 1];
      this.hp = this.maxHp;
      this.attack = descr.eliteAttack[lvl - 1];
      this.move = descr.eliteMove[lvl - 1];
    } else {
      this.maxHp = descr.normalHp[lvl - 1];
      this.hp = this.maxHp;
      this.attack = descr.normalAttack[lvl - 1];
      this.move = descr.normalMove[lvl - 1];
    }
  }

  get status() {
    const s = [];
    for (let key in mapping) {
      if (this[key]) {
        s.push(mapping[key]);
      }
    }
    return s.join(", ");
  }

  isActive() {
    return this.scenario.activeEntityId === this.type;
  }
}

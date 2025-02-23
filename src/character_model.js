import { BaseModel } from "./base_model";
import { Hero } from "./hero_model";
import { Scenario } from "./scenario_model";

export const mapping = {
  poisoned: "poison",
  wound: "blessure",
  confusion: "confusion",
  immobilisation: "immobilisation",
  stunned: "étourdissement",
  renforced: "renforcement",
  disarmed: "désarmé",
};

export class Character extends BaseModel {
  fields = {
    hero: { type: "many2one", label: "Hero", comodel: Hero },
    scenario: { type: "many2one", label: "Scenario", comodel: Scenario },
    battleGoal: { type: "number", label: "Battle Goal" },
    battleGoalChoices: { type: "any" },
    hp: { type: "number", label: "HP" },
    maxHp: { type: "number", label: "Max HP" },
    xp: { type: "number", label: "XP Gained" },
    gold: { type: "number", label: "Gold Gained" },
    didStart: { type: "boolean" },

    // statuses
    poisoned: { type: "boolean" },
    wound: { type: "boolean" },
    confusion: { type: "number" },
    immobilisation: { type: "number" },
    stunned: { type: "number" },
    renforced: { type: "number" },
    disarmed: { type: "number" },
  };

  setup() {
    this.maxHp = this.hero.maxHp;
    this.hp = this.maxHp;
  }

  isActive() {
    return this.scenario.activeEntityId === this.id;
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
}

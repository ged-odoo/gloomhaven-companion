import { today } from "./utils";
import { BaseModel } from "./base_model";
import { Hero } from "./hero_model";
import { Scenario } from "./scenario_model";

const levels = [1, 2, 3, 4, 5, 6, 7].map((l) => ({
  value: l,
  text: l,
}));

export class Campaign extends BaseModel {
  fields = {
    name: { type: "char", label: "Name", placeholder: "New Campaign" },
    createDate: { type: "char", label: "Creation Date", default: today },
    level: {
      type: "select",
      label: "Scenario Level",
      choices: levels,
      default: 1,
      isNumber: true,
    },
    heroes: { type: "one2many", comodel: Hero },
    scenarios: { type: "one2many", comodel: Scenario },
  };

  // constructor(data) {
  //   super(data);
  //   /** @type { string } */
  //   this.name;
  //   /** @type { Hero[] } */
  //   this.heroes;
  //   /** @type { Scenario[] } */
  //   this.scenarios;
  // }

  /**
   * @param {Hero} hero
   */
  addHero(hero) {
    if (!(hero instanceof Hero)) {
      throw new Error("nope");
    }
    this.heroes.push(hero);
  }

  /**
   * @param {Hero} hero
   */
  deleteHero(hero) {
    this.heroes = this.heroes.filter((h) => h.id !== hero.id);
  }

  /**
   * @param {Scenario} scenario
   */
  deleteScenario(scenario) {
    this.scenarios = this.scenarios.filter((s) => s.id !== scenario.id);
  }

  /**
   * @param {Scenario} scenario
   */
  addScenario(scenario) {
    if (!(scenario instanceof Scenario)) {
      throw new Error("nope");
    }
    this.scenarios.push(scenario);
  }

  isValid() {
    return !!this.name;
  }

  heroList() {
    return this.heroes.map((h) => `${h.name} (${h.className})`).join(", ");
  }
}

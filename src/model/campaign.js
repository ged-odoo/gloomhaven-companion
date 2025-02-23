import { BaseModel } from "./base_model";
import { Hero } from "./hero";

const levels = [1, 2, 3, 4, 5, 6, 7].map((l) => ({
  value: l,
  text: `Scenario Level ${l}`,
}));

export class Campaign extends BaseModel {
  static fields = [
    { name: "name", type: "char", label: "Name", placeholder: "New Campaign" },
    {
      name: "level",
      type: "select",
      label: "Scenario Level",
      choices: levels,
      default: 1,
      isNumber: true,
    },
    { name: "heroes", type: "one2many" },
  ];
  constructor() {
    super();
    /** @type { string } */
    this.name;
    /** @type { Hero[] } */
    this.heroes;
  }

  /**
   * @param {Hero} hero
   */
  addHero(hero) {
    if (!(hero instanceof Hero)) {
      throw new Error("nope");
    }
    this.heroes.push(hero);
  }

  isValid() {
    return !!this.name;
  }
}

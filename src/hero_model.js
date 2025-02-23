import { CLASS_NAME, MAX_HP_MAP } from "./data";
import { BaseModel } from "./base_model";
import { Campaign } from "./campaign_model";

const heroClasses = [{ value: "", text: "" }];

for (let c in CLASS_NAME) {
  heroClasses.push({ value: c, text: CLASS_NAME[c] });
}

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => ({
  value: l,
  text: `Level ${l}`,
}));

export class Hero extends BaseModel {
  fields = {
    name: { type: "char", label: "Name", placeholder: "Hero Name" },
    cls: { type: "select", label: "Class", choices: heroClasses },
    level: {
      type: "select",
      label: "Level",
      default: 1,
      choices: levels,
      isNumber: true,
    },
    campaign: { type: "many2one", label: "Campaign", comodel: Campaign },
  };

  // constructor(data) {
  //   super(data);
  //   /** @type { string } */
  //   this.name;
  //   /** @type { string } */
  //   this.cls;
  //   /** @type { number } */
  //   this.level;
  // }

  isValid() {
    return !!(this.name && this.cls);
  }

  get className() {
    return CLASS_NAME[this.cls];
  }

  get maxHp() {
    return MAX_HP_MAP[this.cls][this.level - 1];
  }
}

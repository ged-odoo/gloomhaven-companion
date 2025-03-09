import { CLASS_NAME, MAX_HP_MAP, MONSTER_MODIFIERS_DECK, PERKS } from "./data";
import { BaseModel } from "./base_model";
import { Campaign } from "./campaign_model";
import { Deck } from "./deck";

const heroClasses = [{ value: "", text: "" }];

for (let c in CLASS_NAME) {
  heroClasses.push({ value: c, text: CLASS_NAME[c] });
}

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => ({
  value: l,
  text: `Level ${l}`,
}));

class Perks {
  cls = null;
  perks = {}; // mapping perkid -> arity

  toggle(id) {
    const perk = PERKS[this.cls].find((p) => p.id === id);
    if (!(id in this.perks)) {
      this.perks[id] = 0;
    }
    this.perks[id]++;
    if (this.perks[id] > perk.arity) {
      this.perks[id] = 0;
    }
  }

  isActive(id, index) {
    if (!(id in this.perks)) {
      return false;
    }
    return this.perks[id] > index;
  }

  makeDeck() {
    const cards = MONSTER_MODIFIERS_DECK.map((c) => c.id);
    for (let pid in this.perks) {
      let perkId = parseInt(pid);
      const perk = PERKS[this.cls].find((p) => p.id === perkId);
      for (let i = 0; i < this.perks[pid]; i++) {
        perk.apply(cards);
      }
    }
    return new Deck(cards);
  }
}

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
    perks: { type: "instance", cls: Perks },
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

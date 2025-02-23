import { CLASS_NAME } from "../data/data";
import { BaseModel } from "./base_model";

const heroClasses = [{ value: "", text: "" }];

for (let c in CLASS_NAME) {
  heroClasses.push({ value: c, text: CLASS_NAME[c] });
}

export class Hero extends BaseModel {
  static fields = [
    { name: "name", type: "char", label: "Name", placeholder: "Hero Name" },
    { name: "cls", type: "select", label: "Class", choices: heroClasses },
    { name: "level", type: "number", label: "Level", default: 1 },
  ];
  constructor() {
    super();
    /** @type { string } */
    this.name;
    /** @type { string } */
    this.cls;
    /** @type { number } */
    this.level;
  }

  isValid() {
    return !!(this.name && this.cls);
  }

  get className() {
    return CLASS_NAME[this.cls];
  }
}

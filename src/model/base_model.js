import { reactive } from "@odoo/owl";
import { generateId } from "../utils";

function getDefaultValue(field) {
  if ("default" in field) {
    const def = field.default;
    return typeof def === "function" ? def() : def;
  }
  switch (field.type) {
    case "char":
      return "";
    case "one2many":
      return [];
    case "select":
      return null;
    default:
      throw new Error("boom");
  }
}

/**
 * @typedef {Object} Field
 * @property {string} name - technical name of the field
 * @property { string} type - The type of the field
 * @property {Function | any} [default] - default value
 */

export class BaseModel {
  /** @type { Field[] } */
  static fields = [{ name: "id", type: "char", default: generateId }];

  data = {};
  fields = {};

  constructor() {
    const fields = BaseModel.fields.concat(this.constructor.fields);
    for (let field of fields) {
      this.data[field.name] = getDefaultValue(field);
      this.fields[field.name] = field;
      if (field.name in this) {
        throw new Error("boom");
      }
      Object.defineProperty(this, field.name, {
        get() {
          return this.data[field.name];
        },
        set(value) {
          this.data[field.name] = value;
        },
      });
    }
    /** @type { string } */
    this.id;
    return reactive(this);
  }

  isValid() {
    return true;
  }

  toJSON() {
    return this.data;
  }
}

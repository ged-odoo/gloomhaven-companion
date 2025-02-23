import { reactive } from "@odoo/owl";
import { generateId } from "./utils";

function getDefaultValue(field) {
  if ("default" in field) {
    const def = field.default;
    return typeof def === "function" ? def() : def;
  }
  switch (field.type) {
    case "number":
      return 0;
    case "char":
      return "";
    case "one2many":
      return [];
    case "select":
    case "many2one":
    case "any":
      return null;
    case "boolean":
      return false;
    case "instance":
      return new field.cls();
    default:
      throw new Error("boom");
  }
}

export function createInstance(Model, data = {}, doNotSetup = false) {
  const inst = reactive(new Model());
  inst.fields.id = { type: "char", default: generateId };
  // this.fields = [{ name: "id", type: "char", default: generateId }].concat(this.fields);
  // const fields = BaseModel.fields.concat(this.constructor.fields);
  for (let field in inst.fields) {
    const desc = inst.fields[field];
    inst.data[field] = field in data ? data[field] : getDefaultValue(desc);
    if (field in inst) {
      throw new Error("boom");
    }
    Object.defineProperty(inst, field, {
      get() {
        return this.data[field];
      },
      set(value) {
        BaseModel.isDirty = true;
        this.data[field] = value;
        setTimeout(() => {
          if (BaseModel.isDirty) {
            window.dispatchEvent(new CustomEvent("force_save"));
            BaseModel.isDirty = false;
          }
        }, 1000);
      },
    });
  }
  if (!doNotSetup) {
    inst.setup();
  }
  return inst;
}
/**
 * @typedef {Object} Field
 * @property {string} name - technical name of the field
 * @property { string} type - The type of the field
 * @property {Function | any} [default] - default value
 */

export class BaseModel {
  static isDirty = false;
  data = {};
  fields = {};

  setup() {}

  isValid() {
    return true;
  }

  toJSON() {
    const data = { ...this.data };
    for (let field in this.fields) {
      const desc = this.fields[field];
      if (desc.type === "many2one" && data[field]) {
        // i know this loses information. it only works if we have the linked
        // record somewhere else. but this is the case i need to support. a better
        // implementation would maintain a table for each model somehow
        data[field] = data[field].id;
      }
    }
    return data;
  }
}

export function deserialize(Model, obj) {
  const recs = [];
  const recordMap = {};
  const m2os = [];

  function _deserialize(Model, obj) {
    const fields = new Model().fields;
    const _m2os = [];
    for (let field in fields) {
      const desc = fields[field];
      if (desc.type === "one2many") {
        obj[field] = (obj[field] || []).map((o) =>
          _deserialize(desc.comodel, o),
        );
      }
      if (desc.type === "many2one") {
        if (obj[field]) {
          _m2os.push(field);
        }
      }
      if (desc.type === "instance") {
        if (obj[field]) {
          Object.setPrototypeOf(obj[field], desc.cls.prototype);
          if (desc.deserialize) {
            desc.deserialize(obj[field]);
          }
        }
      }
    }
    const record = createInstance(Model, obj, true);
    recs.push(record);
    for (let m of _m2os) {
      m2os.push({ record, field: m, id: obj[m] });
    }
    recordMap[record.id] = record;
    return record;
  }

  const result = _deserialize(Model, obj);
  // relink all m2os
  for (let { record, field, id } of m2os) {
    record.data[field] = recordMap[id];
  }
  // for (let r of recs) {
  //   r.setup();
  // }
  return result;
}

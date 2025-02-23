import { xml, Component } from "@odoo/owl";
import { BaseModel } from "../model/base_model";

// -----------------------------------------------------------------------------
// FieldChar
// -----------------------------------------------------------------------------

export class FieldChar extends Component {
  static props = {
    name: String,
    record: BaseModel,
    labelWidth: { type: String, optional: true },
  };
  static defaultProps = {
    labelWidth: "50px",
  };

  static template = xml`
    <div class="d-flex align-center mx-2 my-3">
        <div class="text-right" t-attf-style="width:{{props.labelWidth}}">
          <t t-esc="field.label"/>
        </div>
        <input class="mx-2 flex-grow" t-model="props.record[props.name]" t-att-placeholder="placeholder"/>
      </div>`;

  setup() {
    const record = this.props.record;
    this.field = record.fields[this.props.name];
    this.placeholder = this.field.placeholder || "";
  }
}

// -----------------------------------------------------------------------------
// FieldSelect
// -----------------------------------------------------------------------------

export class FieldSelect extends Component {
  static props = {
    name: String,
    record: BaseModel,
    labelWidth: { type: String, optional: true },
  };
  static defaultProps = {
    labelWidth: "50px",
  };
  static template = xml`
      <div class="d-flex align-center mx-2 my-3">
        <div class="text-right" t-attf-style="width:{{props.labelWidth}}">
          <t t-esc="field.label"/>
        </div>
        <t t-if="field.isNumber">
          <select class="mx-2 flex-grow" t-model.number="props.record[props.name]">
              <t t-foreach="field.choices" t-as="choice" t-key="choice_index">
                <option t-att-value="choice.value"><t t-esc="choice.text"/></option>
              </t>
            </select>
        </t>
        <t t-else="">
          <select class="mx-2 flex-grow" t-model="props.record[props.name]">
            <t t-foreach="field.choices" t-as="choice" t-key="choice_index">
              <option t-att-value="choice.value"><t t-esc="choice.text"/></option>
            </t>
          </select>
        </t>
      </div>
    `;

  setup() {
    const record = this.props.record;
    this.field = record.fields[this.props.name];
  }
}

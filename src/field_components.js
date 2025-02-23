import { xml, Component, useState } from "@odoo/owl";
import { BaseModel } from "./base_model";

// -----------------------------------------------------------------------------
// TwoColForm
// -----------------------------------------------------------------------------

export class TwoColForm extends Component {
  static props = {
    label: String,
    value: true,
    labelWidth: { type: String, optional: true },
  };
  static template = xml`
        <div class="d-flex align-center mx-2 my-3" >
            <div class="text-right" t-attf-style="width:{{props.labelWidth}}">
                <t t-esc="props.label"/>:
            </div>
            <div class="mx-2 flex-grow text-bold">
              <t t-esc="props.value"/>
            </div>
        </div>
  `;
}

// -----------------------------------------------------------------------------
// FieldChar
// -----------------------------------------------------------------------------

export class FieldChar extends Component {
  static props = {
    name: String,
    record: BaseModel,
    labelWidth: { type: String, optional: true },
    readonly: { type: Boolean, optional: true },
    editable: { type: Boolean, optional: true },
    cls: { type: String, optional: true },
  };
  static defaultProps = {
    labelWidth: "50px",
  };

  static template = xml`
    <div class="d-flex align-center mx-2 my-3" t-att-class="props.cls">
        <div class="text-right" t-attf-style="width:{{props.labelWidth}}">
          <t t-esc="field.label"/>:
        </div>
        <t t-if="state.readonly">
          <span class="mx-2 flex-grow d-flex space-between">
             <span class="text-bold" t-esc="props.record[props.name]"/>
             <span class="px-2" t-if="props.editable" t-on-click="switchToEdit">✎</span>
          </span>
        </t>
        <t t-else="">
          <input class="mx-2 flex-grow" t-model="props.record[props.name]" t-att-placeholder="placeholder" t-on-focusout="onFocusout"/>
        </t>
      </div>`;

  setup() {
    this.state = useState({ readonly: this.props.readonly });
    const record = this.props.record;
    this.field = record.fields[this.props.name];
    this.placeholder = this.field.placeholder || "";
  }

  switchToEdit() {
    this.state.readonly = false;
  }

  onFocusout() {
    if (!this.state.readonly && this.props.readonly) {
      this.state.readonly = true;
    }
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
    readonly: { type: Boolean, optional: true },
    editable: { type: Boolean, optional: true },
  };
  static defaultProps = {
    labelWidth: "50px",
  };
  static template = xml`
      <div class="d-flex align-center mx-2 my-3">
        <div class="text-right" t-attf-style="width:{{props.labelWidth}}">
          <t t-esc="field.label"/>:
        </div>
        <t t-if="state.readonly">
          <span class="mx-2 flex-grow d-flex space-between">
             <span class="text-bold" t-esc="props.record[props.name]"/>
             <span class="px-2" t-if="props.editable" t-on-click="switchToEdit">✎</span>
          </span>
        </t>
        <t t-else="">
          <t t-if="field.isNumber">
            <select class="mx-2 flex-grow" t-model.number="props.record[props.name]" t-on-change="onChange">
                <t t-foreach="field.choices" t-as="choice" t-key="choice_index">
                  <option t-att-value="choice.value"><t t-esc="choice.text"/></option>
                </t>
              </select>
          </t>
          <t t-else="">
            <select class="mx-2 flex-grow" t-model="props.record[props.name]" t-on-change="onChange">
              <t t-foreach="field.choices" t-as="choice" t-key="choice_index">
                <option t-att-value="choice.value"><t t-esc="choice.text"/></option>
              </t>
            </select>
          </t>
        </t>
      </div>
    `;

  setup() {
    const record = this.props.record;
    this.field = record.fields[this.props.name];
    this.state = useState({ readonly: this.props.readonly });
  }

  switchToEdit() {
    this.state.readonly = false;
  }

  onChange() {
    if (!this.state.readonly && this.props.readonly) {
      this.state.readonly = true;
    }
  }
}

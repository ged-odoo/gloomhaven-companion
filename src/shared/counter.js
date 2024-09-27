import { Component, xml } from "@odoo/owl";

export class Counter extends Component {
  static template = xml`
        <div class="d-flex align-center p-1">
          <span class="button m-1 py-2 px-3" t-on-click="props.dec">-</span>
          <t t-slot="default"/>
          <span class="button m-1 py-2 px-3" t-on-click="props.inc">+</span>
        </div>`;
}

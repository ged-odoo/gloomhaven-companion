import { Component, xml } from "@odoo/owl";

export class ControlPanel extends Component {
  static template = xml`
        <div class="bg-white d-flex align-center border-bottom-gray space-between" style="height:50px;">
          <t t-slot="default"/>
        </div>`;
}

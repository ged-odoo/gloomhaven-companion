import { Component, xml } from "@odoo/owl";

export class Layout extends Component {
  static template = xml`
    <div class="h-100 d-flex flex-column">
      <div class="bg-primary text-white d-flex align-center space-between" style="height:45px;">
        <t t-slot="navbar"/>
      </div>
      <div class="overflow-y-auto">
        <t t-slot="default"/>
      </div>
    </div>`;
}

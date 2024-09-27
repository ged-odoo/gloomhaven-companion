import { Component, xml } from "@odoo/owl";

// -----------------------------------------------------------------------------
// MARK: TopMenu
// -----------------------------------------------------------------------------
export class TopMenu extends Component {
  static template = xml`
        <div class="bg-primary text-white d-flex align-center space-between" style="height:45px;">
          <t t-slot="default"/>
        </div>`;
}

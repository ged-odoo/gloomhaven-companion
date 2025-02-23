import { Component, mount, useState, useSubEnv, xml } from "@odoo/owl";
import { preventSleep } from "./utils";
import { Game } from "./game";

class GloomHaven extends Component {
  static template = xml`
    <t t-set="screen" t-value="game.screen"/>
    <div class="h-100 d-flex flex-column" t-att-class="{ inactive: game.BottomSheet }">
      <div class="bg-primary text-white d-flex align-center space-between" style="flex:0 0 40px;">
        <span class="ps-1"><t t-esc="screen.navbarText"/></span>
      </div>
        <t t-if="screen.ControlPanel">
            <div class="bg-white d-flex align-center border-bottom-gray space-between" style="flex: 0 0 50px;">
                <t t-component="screen.ControlPanel" t-props="screen.props"/>
            </div>
        </t>
      <div class="overflow-y-auto">
        <t t-component="screen.Content" t-props="screen.props"/>
      </div>
    </div>
    <div class="overlay" t-att-class="{active: game.BottomSheet}" t-on-click="removeBottomSheet"/>
    <div class="bottom-sheet" t-att-class="{active: game.BottomSheet}">
        <t t-if="game.BottomSheet">
            <t t-component="game.BottomSheet.Comp" t-props="game.BottomSheet.props"/>
        </t>
    </div>
    `;

  setup() {
    preventSleep();
    this.game = useState(new Game());
    useSubEnv({ game: this.game });
  }

  removeBottomSheet() {
    this.game.closeBottomSheet();
  }
}

mount(GloomHaven, document.body, { dev: true });

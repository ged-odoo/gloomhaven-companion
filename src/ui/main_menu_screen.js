import { Component, xml } from "@odoo/owl";
import { useGame } from "../game";

class ControlPanel extends Component {
  static template = xml`
        <span class="ms-1">Welcome!</span>
        <button class="button" t-on-click="addNewCampaign">New Campaign</button>
    `;
  setup() {
    this.game = useGame();
  }

  addNewCampaign() {
    this.game.addNewCampaign();
  }
}

class Content extends Component {
  static template = xml`
        <div class="text-gray text-larger text-center mt-2" style="padding:24px;">
            No active campaign yet.
        </div>
    `;
}

export const MAIN_MENU = () => ({
  navbarText: "Gloomhaven",
  ControlPanel,
  Content,
});

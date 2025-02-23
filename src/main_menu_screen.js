import { Component, useState, xml } from "@odoo/owl";
import { useGame } from "./game";
import { Campaign } from "./campaign_model";
import { FieldChar } from "./field_components";
import { createInstance } from "./base_model";

class ControlPanel extends Component {
  static template = xml`
        <span class="ms-1"></span>
        <button class="button me-1" t-on-click="addNewCampaign">New Campaign</button>
    `;
  setup() {
    this.game = useGame();
  }

  addNewCampaign() {
    this.game.openBottomSheet(AddCampaign);
  }
}

class AddCampaign extends Component {
  static template = xml`
      <div class="d-flex">
        <!-- <div class="d-flex flex-grow"> -->
          <FieldChar name="'name'" record="campaign" cls="'flex-grow'"/>
        <!-- </div> -->
        <button class="button me-2" t-att-class="{ disabled: !campaign.isValid()}" t-on-click="add">Add</button>
      </div>
    `;
  static components = { FieldChar };

  setup() {
    this.game = useGame();
    this.campaign = useState(createInstance(Campaign));
  }

  add() {
    this.game.addNewCampaign(this.campaign);
    this.game.closeBottomSheet();
  }
}

class Content extends Component {
  static template = xml`
    <t t-if="game.campaigns.length">
      <t t-foreach="game.campaigns" t-as="campaign" t-key="campaign.id">
        <div 
          class="m-2 p-3 bg-white border-gray border-radius-4" 
          t-att-class="{'border-bold': campaign.id===state.active}" 
          t-on-touchstart="() => this.onTouchStart(campaign)"
          t-on-touchend="() => this.onTouchEnd(campaign)">
            <div class="d-flex space-between mb-1">
              <span class="text-bold text-larger"><t t-esc="campaign.name || 'New Campaign'"/></span>
              <span><t t-esc="campaign.scenarios.length"/> scenario(s)</span>
            </div>
            <div>
              <t t-if="campaign.heroes.length">
                <t t-if="campaign.heroes.length === 1">
                  <t t-esc="campaign.heroes[0].name"/>
                </t>
                <t t-else="">
                  <ul class="m-0">
                    <t t-foreach="campaign.heroes" t-as="hero" t-key="hero.id">
                      <li><t t-esc="hero.name"/> (<t t-esc="hero.className"/>)</li>
                    </t>
                  </ul>
                </t>
              </t>
              <t t-else="">
                No heroes!
              </t>
            </div>
        </div>
      </t>
      <div class="text-gray text-larger text-center mt-2" style="padding:24px;">
          Hint: long press on some elements to get an additional menu
      </div>
    </t>
    <t t-else="">
        <div class="text-gray text-larger text-center mt-2" style="padding:24px;">
            No active campaign yet.
        </div>
    </t>
    `;

  setup() {
    this.state = useState({ active: null });
    this.game = useGame();
    this.longPress = null;
  }

  openCampaignMenu(campaign) {
    this.state.active = campaign.id;
    this.game.openBottomSheet(OpenCampaign, { campaign }, () => {
      this.state.active = null;
    });
  }

  onTouchStart(campaign) {
    this.longPress = setTimeout(() => {
      this.openCampaignMenu(campaign);
      this.longPress = null;
    }, 400);
  }

  onTouchEnd(campaign) {
    if (this.longPress) {
      this.game.openCampaign(campaign);
      clearTimeout(this.longPress);
      this.longPress = null;
    }
  }
}

// -----------------------------------------------------------------------------
// Campaign Bottomsheet
// -----------------------------------------------------------------------------

class OpenCampaign extends Component {
  static props = {
    campaign: Campaign,
  };

  static template = xml`
        <div class="d-flex space-between">
          <span class="text-bold p-1">
            <t t-esc="props.campaign.name || 'New Campaign'"/>
          </span>
          <span>
            <button class="button secondary" t-on-click="deleteCampaign">Delete</button>
            <button class="button" t-on-click="openCampaign">Open</button>
          </span>
        </div>
    `;

  setup() {
    this.game = useGame();
  }

  deleteCampaign() {
    if (confirm("Are you sure that you want to delete this campaign?")) {
      this.game.deleteCampaign(this.props.campaign);
    }
    this.game.closeBottomSheet();
  }

  openCampaign() {
    this.game.openCampaign(this.props.campaign);
  }
}

// -----------------------------------------------------------------------------
// Main Menu Screen
// -----------------------------------------------------------------------------

export const MAIN_MENU = () => ({
  navbarText: "Gloomhaven",
  ControlPanel,
  Content,
});

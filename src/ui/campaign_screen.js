import { Component, useState, xml } from "@odoo/owl";
import { useGame } from "../game";
import { Campaign } from "../model/campaign";
import { Hero } from "../model/hero";
import { FieldChar, FieldSelect } from "./fields";

// -----------------------------------------------------------------------------
// ControlPanel
// -----------------------------------------------------------------------------

class ControlPanel extends Component {
  static template = xml`
        <span/>
        <button class="button" t-att-class="{ disabled: !props.campaign.isValid()}" t-on-click="save">
          Save
        </button>
    `;

  setup() {
    this.game = useGame();
  }

  save() {
    console.log("add new campaign");
    this.game.popScreen();
  }
}

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

class Content extends Component {
  static template = xml`
        <h2 class="ms-1">Campaign</h2>
        <FieldChar name="'name'" record="props.campaign" labelWidth="'120px'"/>
        <FieldSelect name="'level'" record="props.campaign" labelWidth="'120px'"/>
        <h2 class="ms-1">Heroes</h2>
        <div class="p-3">
            <t t-foreach="props.campaign.heroes" t-as="hero" t-key="hero.id">
              <div class="m-2 p-2 bg-white border-gray border-radius-4 d-flex space-between">
                  <span class="text-bold">
                    <t t-esc="hero.name"/>
                  </span> 
                  <span>
                    <t t-esc="hero.className"/> (level <t t-esc="hero.level"/>)
                  </span>
              </div>
            </t>
            <div class="m-2 p-2 bg-white text-center border-gray border-radius-4" t-on-click="addHero">
                Add a hero
            </div>
        </div>
    `;
  static components = { FieldChar, FieldSelect };

  setup() {
    this.game = useGame();
  }

  addHero() {
    this.game.openBottomSheet(AddHero, {
      addHero: (hero) => {
        this.props.campaign.addHero(hero);
        this.game.closeBottomSheet();
      },
    });
  }
}

// -----------------------------------------------------------------------------
// AddHero Bottomsheet
// -----------------------------------------------------------------------------

class AddHero extends Component {
  static props = {
    addHero: Function,
  };

  static template = xml`
        <FieldChar name="'name'" record="hero"/>
        <FieldSelect name="'cls'" record="hero"/>
        <div class="d-flex flex-end me-2">
            <button class="button" t-att-class="{ disabled: !hero.isValid()}" t-on-click="addHero">Add</button>
        </div>
    `;
  static components = { FieldChar, FieldSelect };

  setup() {
    this.hero = useState(new Hero());
  }

  addHero() {
    this.props.addHero(this.hero);
  }
}

// -----------------------------------------------------------------------------
// Campaign Screen
// -----------------------------------------------------------------------------

export const CAMPAIGN_SCREEN = () => {
  const campaign = new Campaign();
  return {
    navbarText: "Campaign Editor",
    ControlPanel,
    Content,
    props: { campaign },
  };
};

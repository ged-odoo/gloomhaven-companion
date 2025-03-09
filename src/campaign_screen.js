import { Component, useState, xml } from "@odoo/owl";
import { useGame } from "./game";
import { Hero } from "./hero_model";
import { FieldChar, FieldSelect, TwoColForm } from "./field_components";
import { Campaign } from "./campaign_model";
import { Scenario } from "./scenario_model";
import { createInstance } from "./base_model";

class ControlPanel extends Component {
  static props = ["campaign"];
  static template = xml`
      <button class="button secondary me-1" t-on-click="showInfo">Show Info</button>
      <span>
        <button class="button me-1" t-on-click="addHero">Add Hero</button>
        <button class="button me-1" t-on-click="addScenario">Add Scenario</button>
      </span>
    `;
  setup() {
    this.game = useGame();
  }

  addHero() {
    this.game.openBottomSheet(AddHero, { campaign: this.props.campaign });
  }

  addScenario() {
    this.game.openBottomSheet(AddScenario, {
      campaign: this.props.campaign,
      addScenario: (scenario) => {
        this.props.campaign.addScenario(scenario);
        this.game.save();
        this.game.closeBottomSheet();
      },
    });
  }

  showInfo() {
    this.game.openBottomSheet(
      ShowInfo,
      { campaign: this.props.campaign },
      () => {
        this.game.updateNavbarText(`Campaign: ${this.props.campaign.name}`);
      },
    );
  }
}

class ShowInfo extends Component {
  static template = xml`
    <FieldChar name="'name'" record="props.campaign" labelWidth="'150px'" readonly="!!props.campaign.name" editable="true"/>
    <FieldChar name="'createDate'" record="props.campaign" labelWidth="'150px'" readonly="true"/>
    <FieldSelect name="'level'" record="props.campaign" labelWidth="'150px'" readonly="true" editable="true"/>
    <TwoColForm label="'# scenarios'" value="props.campaign.scenarios.length" labelWidth="'150px'"/>
    `;
  static components = { FieldChar, FieldSelect, TwoColForm };
  static props = ["campaign"];
}

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

class Content extends Component {
  static template = xml`
        <div class="d-flex space-between" style="margin-top:20px;">
          <h2 class="m-1 ms-2 text-primary">Heroes</h2>
        </div>
        <t t-foreach="props.campaign.heroes" t-as="hero" t-key="hero.id">
          <div class="m-2 p-3 bg-lightgreen border-gray border-radius-4 d-flex space-between"
              t-att-class="{ 'border-bold': hero.id === state.active}"
              t-on-touchstart="() => this.onTouchStart(hero)"
              t-on-touchend="() => this.onTouchEnd(hero)">
              <span class="text-bold">
                <t t-esc="hero.name"/>
              </span> 
              <span>
                <t t-esc="hero.className"/> (level <t t-esc="hero.level"/>)
              </span>
          </div>
        </t>
        <t t-if="!props.campaign.heroes.length">
          <div class="m-2 p-2 text-center text-gray text-larger" style="margin-top:10px;">
            No heroes yet!
          </div>
        </t>
        <div class="d-flex space-between mt-3" style="margin-top:30px;">
          <h2 class="m-1 ms-2 text-primary">Scenarios</h2>
        </div>
        <t t-if="props.campaign.scenarios.length">
          <t t-foreach="props.campaign.scenarios" t-as="scenario" t-key="scenario.id">
            <div class="m-2 p-3 bg-white border-gray border-radius-4 d-flex space-between"
                t-att-class="{ 'border-bold': scenario.id === state.active}"
                t-on-touchstart="() => this.onTouchStart(scenario)"
                t-on-touchend="() => this.onTouchEnd(scenario)">
                <span>
                  <span class="text-bold">
                    <t t-esc="scenario_index + 1"/>. <t t-esc="scenario.name"/>
                  </span> 
                </span> 
                <span>
                  Created: <t t-esc="scenario.createDate"/>
                </span>
            </div>
          </t>
        </t>
        <t t-else="">
          <div class="m-2 p-2 text-center text-gray text-larger" style="margin-top:30px;">
            Add a scenario to start your adventures!
          </div>
        </t>

    `;
  static components = { FieldChar, FieldSelect, TwoColForm };

  setup() {
    this.game = useGame();
    this.state = useState({ active: null });
    this.longPress = null;
  }

  openEntityMenu(entity) {
    this.state.active = entity.id;
    const campaign = this.props.campaign;
    this.game.openBottomSheet(EntityMenu, { entity: entity, campaign }, () => {
      this.state.active = null;
    });
  }

  onTouchStart(target) {
    this.longPress = setTimeout(() => {
      this.openEntityMenu(target);
      this.longPress = null;
    }, 400);
  }

  onTouchEnd(target) {
    if (this.longPress) {
      if (target instanceof Hero) {
        this.game.openHero(target);
      } else {
        this.game.openScenario(target);
      }
      clearTimeout(this.longPress);
      this.longPress = null;
    }
  }
}

// -----------------------------------------------------------------------------
// AddHero Bottomsheet
// -----------------------------------------------------------------------------

class AddHero extends Component {
  static props = {
    campaign: Campaign,
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
    this.hero = useState(
      createInstance(Hero, { campaign: this.props.campaign }),
    );
    this.game = useGame();
  }

  addHero() {
    this.hero.perks.cls = this.hero.cls;
    this.props.campaign.addHero(this.hero);
    this.game.closeBottomSheet();
  }
}

// -----------------------------------------------------------------------------
// Hero Bottomsheet
// -----------------------------------------------------------------------------
class EntityMenu extends Component {
  static props = {
    entity: true,
    campaign: Campaign,
  };

  static template = xml`
        <div class="d-flex space-between">
          <span class="text-bold p-1">
            <t t-esc="props.entity.name"/>
          </span>
          <span>
            <button class="button secondary" t-on-click="delete">Delete</button>
            <button class="button" t-on-click="open">Open</button>
          </span>
        </div>
    `;

  setup() {
    this.game = useGame();
  }

  delete() {
    if (confirm("Are you sure that you want to delete this hero?")) {
      if (this.props.entity instanceof Hero) {
        this.props.campaign.deleteHero(this.props.entity);
      } else {
        this.props.campaign.deleteScenario(this.props.entity);
      }
    }
    this.game.closeBottomSheet();
  }

  open() {
    if (this.props.entity instanceof Hero) {
      this.game.openHero(this.props.entity);
    } else {
      this.game.openScenario(this.props.entity);
    }
  }
}

// -----------------------------------------------------------------------------
// AddScenario Bottomsheet
// -----------------------------------------------------------------------------

class AddScenario extends Component {
  static props = {
    campaign: Campaign,
    addScenario: Function,
  };

  static template = xml`
        <FieldChar name="'name'" record="scenario" labelWidth="'90px'"/>
        <FieldSelect name="'level'" record="scenario" labelWidth="'90px'"/>
        <div class="d-flex flex-end me-2">
            <button class="button" t-att-class="{ disabled: !scenario.isValid()}" t-on-click="addScenario">Add</button>
        </div>
    `;
  static components = { FieldChar, FieldSelect };

  setup() {
    const campaign = this.props.campaign;
    this.scenario = useState(
      createInstance(Scenario, { level: campaign.level, campaign }),
    );
  }

  addScenario() {
    this.props.addScenario(this.scenario);
  }
}

// -----------------------------------------------------------------------------
// Campaign Screen
// -----------------------------------------------------------------------------

export const CAMPAIGN_SCREEN = (campaign) => {
  return {
    navbarText: `Campaign: ${campaign.name}`,
    backButton: true,
    ControlPanel,
    Content,
    props: { campaign },
  };
};

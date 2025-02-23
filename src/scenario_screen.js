import { Component, useState, xml } from "@odoo/owl";
import { useGame } from "./game";
import { FieldChar, FieldSelect } from "./field_components";
import { Scenario } from "./scenario_model";
import { BATTLE_GOALS } from "./data";
import { MAIN_SCREEN } from "./main_screen";

class ControlPanel extends Component {
  static props = { scenario: Scenario };
  static template = xml`
      <button class="button secondary me-1" t-on-click="showInfo">Show Info</button>
      <span>Level: <t t-esc="props.scenario.level"/></span>
      <button class="button me-1 px-3" t-on-click="play">Play</button>
    `;
  setup() {
    this.game = useGame();
  }

  showInfo() {
    const scenario = this.props.scenario;
    this.game.openBottomSheet(ShowInfo, { scenario }, () => {
      this.game.updateNavbarText(`Scenario: ${scenario.name}`);
    });
  }

  play() {
    this.game.pushScreen(MAIN_SCREEN(this.props.scenario));
  }
}

class ShowInfo extends Component {
  static template = xml`
        <FieldChar name="'name'" record="props.scenario" labelWidth="'150px'" readonly="true" editable="true"/>
        <FieldChar name="'createDate'" record="props.scenario" labelWidth="'150px'" readonly="true"/>
        <FieldSelect name="'level'" record="props.scenario" labelWidth="'150px'" readonly="true" editable="true"/>
    `;
  static components = { FieldChar, FieldSelect };
  static props = ["scenario"];
}

class BattleGoal extends Component {
  static props = ["id", "onClick?"];
  static template = xml`
          <div class="mx-3 my-2 p-2 border-gray border-radius-4" t-on-click="onClick">
            <div class="text-bold"><t t-esc="goal.title"/></div>
            <div><t t-esc="goal.description"/></div>
          </div>`;

  get goal() {
    const goal = BATTLE_GOALS.find((g) => g.id === this.props.id);
    return goal;
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
}

class BattleGoalSelector extends Component {
  static template = xml`
    <div class="m-1 p-1">
    <t t-if="props.character.battleGoal">
      <BattleGoal id="props.character.battleGoal"/>
    </t>
    <t t-else="">
      <div class="text-bold">Choose a battle goal for <t t-esc="props.character.hero.name"/>:</div>
      <BattleGoal id="props.character.battleGoalChoices[0]" onClick="() => this.selectGoal(0)"/>
      <BattleGoal id="props.character.battleGoalChoices[1]" onClick="() => this.selectGoal(1)"/>
    </t>
    </div>`;
  static components = { BattleGoal };
  static props = ["character"];

  setup() {
    this.game = useGame();
  }

  selectGoal(index) {
    const char = this.props.character;
    char.battleGoal = char.battleGoalChoices[index];
    this.game.closeBottomSheet();

    // const heroId = this.state.hero.id;
    // this.props.game.battleGoals[heroId] = this.goals[goalIndex];
    // this.state.hero = false;
    // this.props.game.isDirty = true;
  }
}

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

class Content extends Component {
  static template = xml`
      <h2 class="m-1 ms-2 text-primary" style="margin-top: 10px;">Battle Goals</h2>
      <t t-foreach="props.scenario.characters" t-as="char" t-key="char.id">
        <div class="m-2 p-3 bg-white border-gray border-radius-4 d-flex space-between"
            t-att-class="{ 'border-bold': char.id === state.active}"
            t-on-click="() => this.onBattleGoalClicked(char)">
            <span><t t-esc="char.hero.name"/></span>
            <span t-if="!char.battleGoal">⬜</span>
            <span t-if="char.battleGoal">✅</span>
        </div>
      </t>
      <h2 class="m-1 ms-2 text-primary" style="margin-top: 30px;">Summary</h2>
      <div class="border-gray bg-white border-radius-4 m-2 d-flex">
        <table class="table m-0 flex-grow">
          <thead>
            <tr>
              <th></th>
              <th class="text-right">XP gained</th>
              <th class="text-right">Gold gained</th>
            </tr>
          </thead>
          <tbody>
            <t t-foreach="props.scenario.characters" t-as="char" t-key="char.id">
              <tr>
                <td><t t-esc="char.hero.name"/></td>
                <td class="text-right"><t t-esc="char.xp"/></td>
                <td class="text-right"><t t-esc="char.gold"/></td>
              </tr>
            </t>
          </tbody>
        </table>
        </div>
        <div class="p-2">
        <ul>
          <li>Rounds played: <t t-esc="props.scenario.rounds"/></li>
          <li>Spawned Enemies: <t t-esc="props.scenario.enemyCount"/></li>
        </ul>
      </div>
        <h2 class="m-1 ms-2 text-primary" style="margin-top: 30px;">City Event</h2>
        <div>todo </div>
        `;
  static components = { FieldChar, FieldSelect };
  static props = { scenario: Scenario };

  setup() {
    this.game = useGame();
    this.state = useState({ active: null });
  }

  onBattleGoalClicked(character) {
    this.state.active = character.id;
    this.game.openBottomSheet(BattleGoalSelector, { character }, () => {
      this.state.active = null;
    });
  }
}

// -----------------------------------------------------------------------------
// Scenario Screen
// -----------------------------------------------------------------------------

export const SCENARIO_SCREEN = (scenario) => {
  return {
    navbarText: `Scenario: ${scenario.name}`,
    backButton: true,
    Content,
    ControlPanel,
    props: { scenario },
  };
};

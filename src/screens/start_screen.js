import { Component, xml } from "@odoo/owl";
import { TopMenu } from "../shared/top_menu";
import { ControlPanel } from "../shared/control_panel";
import { CharacterCard } from "../shared/character_card";

export class StartScreen extends Component {
  static template = xml`
        <t t-set="game" t-value="props.game"/>
        <t t-set="ui" t-value="props.ui"/>
        <TopMenu>
          <span class="mx-2">GloomHaven</span>
          <div class="m-3 text-bold text-larger" t-on-click="() => game.pushScreen('CONFIG')">⚙</div>
        </TopMenu>
        <ControlPanel>
          <div class="button ms-1" t-on-click="() => game.pushScreen('CHAR_EDITOR')">Add Hero</div>
          <select class="border-none bg-white" t-model.number="game.scenarioLevel">
            <option value="1">Scenario Level 1</option>
            <option value="2">Scenario Level 2</option>
            <option value="3">Scenario Level 3</option>
            <option value="4">Scenario Level 4</option>
            <option value="5">Scenario Level 5</option>
            <option value="6">Scenario Level 6</option>
            <option value="7">Scenario Level 7</option>
          </select>
          <div class="me-2 button me-2" t-att-class="{disabled: !canStartGame() }" t-on-click="start">Start Game</div>
        </ControlPanel>
        <t t-if="game.heroes.length">
          <t t-foreach="game.heroes" t-as="hero" t-key="hero.id">
            <CharacterCard hero="hero" game="game"/>
          </t>
        </t>
        <div t-else="" class="text-gray" style="padding:24px;">
          Prepare your team of heroes, then start a game!
        </div>
      `;
  static components = {
    TopMenu,
    ControlPanel,
    CharacterCard,
  };

  canStartGame() {
    return this.props.game.heroes.length;
  }

  start() {
    this.props.game.round = 1;
    this.props.game.pushScreen("MAIN");
  }
}

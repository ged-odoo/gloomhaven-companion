import { Component, xml } from "@odoo/owl";
import { Layout } from "../shared/layout";

export class ConfigScreen extends Component {
  static template = xml`
    <Layout>
      <t t-set-slot="navbar">
        <span class="p-2" t-on-click="() => props.game.popScreen()">Back</span>
      </t>
      <div>
        <h2 class="p-2">Settings</h2>
        <div class="mx-2">
          Scenario
          <select class="bg-white" t-model.number="props.game.scenarioLevel">
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
            <option value="6">Level 6</option>
            <option value="7">Level 7</option>
          </select>
        </div>
        <h2 class="p-2">Features</h2>
        <t t-set="config" t-value="props.game.config"/>
        <div class="d-grid align-center" style="grid-template-columns:50px 1fr;row-gap:10px">
          <input type="checkbox" t-model="config.elements" id="track_element"/>
          <label for="track_element">Element Tracker</label>
          <input type="checkbox" t-model="config.turnTracker" id="track_turns"/>
          <label for="track_turns">Turn Tracker</label>
          <input type="checkbox" t-model="config.battleGoals" id="track_battlegoals"/>
          <label for="track_battlegoals">Battle Goals</label>
          <input type="checkbox" t-model="config.attackModifiers" id="enemy_attack_modifiers"/>
          <label for="enemy_attack_modifiers">Enemy Attack Modifiers</label>
          <input type="checkbox" t-model="config.enemyActions" id="enemy_actions"/>
          <label for="enemy_actions">Enemy Actions</label>
        </div>
        <hr/>
        <h2 class="p-2 my-2">Data</h2>
        <div class="d-flex flex-column align-center">
            <div class="button p-2 mx-3 my-1 text-center" style="width:200px;" t-on-click="save">
                Save to local storage
            </div>
            <div class="button p-2 mx-3 my-1 text-center" style="width:200px;" t-on-click="restore">
                Restore from local storage
            </div>
        </div>

      </div>
    </Layout>`;
  static components = { Layout };

  save() {
    const state = JSON.stringify(this.props.game);
    localStorage.setItem("game_state", state);
    this.props.game.popScreen();
    alert("Game saved!");
  }

  restore() {
    const dataStr = localStorage.getItem("game_state");
    if (!dataStr) {
      return;
    }
    const data = JSON.parse(dataStr);
    Object.assign(this.props.game, data);
    this.props.game.popScreen();
  }
}

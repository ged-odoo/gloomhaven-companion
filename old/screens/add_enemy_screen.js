import { Component, xml, useState } from "@odoo/owl";
import { ENEMIES, ENEMIES_MAP } from "../data";
import { Layout } from "../shared/layout";

export class AddEnemyScreen extends Component {
  static template = xml`
    <Layout>
      <t t-set="navbar">
        <span class="p-2" t-on-click="() => props.game.popScreen()">Back</span>
      </t>
      <h2 class="p-2">Add an Enemy</h2>
      <div class="d-flex m-2 align-center">
        <div class="width-50px text-right">Type </div>
        <select class=" mx-2 flex-grow" t-model="state.type">
          <option value="">Select a type</option>
          <t t-foreach="enemies" t-as="enemy" t-key="enemy.id">
            <option t-att-value="enemy.id"><t t-esc="enemy.name"/><t t-if="enemy.boss"> (BOSS)</t></option>
          </t>
        </select>
      </div>
      <div class="" t-if="!isBoss()">
        <div class="d-flex m-2 align-center">
          <div class="width-50px text-right">Id </div>
          <input class="mx-2 width-50px" type="number" t-model.number="state.nbr"/>
        </div>
        <div class="d-flex m-2 align-center" >
          <div class="width-50px text-right">Elite </div>
          <div class="width-50px"><input type="checkbox" t-model="state.elite"/>
          </div>
        </div>
      </div>
      <div class="d-flex flex-end">
        <div class="button p-2 m-1" t-on-click="create" t-att-class="{disabled: !state.type}">
          Add Enemy
        </div>
      </div>
    </Layout>`;
  static components = { Layout };

  setup() {
    this.state = useState({
      type: "",
      nbr: 0,
      elite: false,
    });
    this.enemies = ENEMIES;
  }

  create() {
    this.props.game.addEnemy(this.state.type, this.state.nbr, this.state.elite);
    this.props.game.popScreen();
  }

  isBoss() {
    if (!this.state.type) {
      return false;
    }
    return !!ENEMIES_MAP[this.state.type].boss;
  }
}

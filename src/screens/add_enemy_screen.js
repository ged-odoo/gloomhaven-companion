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
    const enemy = ENEMIES_MAP[this.state.type];
    const level = this.props.game.scenarioLevel;
    const A = this.props.game.heroes.length;
    // hp computation
    let maxHp;
    if (enemy.boss) {
      maxHp = enemy.hp[level](A);
    } else {
      const hpArray = this.state.elite ? enemy.eliteHp : enemy.normalHp;
      maxHp = hpArray[level];
    }
    // move computation
    let move;
    if (enemy.boss) {
      move = enemy.move[level];
    } else {
      const moveArray = this.state.elite ? enemy.eliteMove : enemy.normalMove;
      move = moveArray[level];
    }
    // attack computation
    let attack;
    if (enemy.boss) {
      attack = enemy.attack[level](A);
    } else {
      const attackArray = this.state.elite
        ? enemy.eliteAttack
        : enemy.normalAttack;
      attack = attackArray[level];
    }
    // modifiers computation
    let modifiers = "";
    if (!enemy.boss) {
      const modifiersArray = this.state.elite
        ? enemy.eliteModifiers
        : enemy.normalModifiers;
      modifiers = modifiersArray[level];
    }
    // boss specific values
    let immunities = "";
    let special1 = "";
    let special2 = "";
    if (enemy.boss) {
      immunities = enemy.immunities.join(", ");
      special1 = enemy.special1[level](A);
      special2 = enemy.special2[level](A);
    }
    const enemyObj = {
      id: this.props.game.getId(),
      type: this.state.type,
      name: enemy.name,
      nbr: this.state.nbr,
      elite: this.state.elite,
      boss: !!enemy.boss,
      hp: maxHp,
      maxHp,
      move,
      attack,
      modifiers,
      immunities,
      special1,
      special2,
      hasTurnEnded: false,
      status: {
        poisoned: false,
        wound: false,
        confusion: false,
        immobilisation: false,
        stunned: false,
        disarmed: false,
        renforced: false,
      },
    };
    this.props.game.addEnemy(enemyObj);
    this.props.game.popScreen();
  }

  isBoss() {
    if (!this.state.type) {
      return false;
    }
    return !!ENEMIES_MAP[this.state.type].boss;
  }
}

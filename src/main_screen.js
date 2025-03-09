import { Component, useState, xml } from "@odoo/owl";
import { useGame } from "./game";
import { Scenario } from "./scenario_model";
import { createInstance } from "./base_model";
import { Enemy } from "./enemy_model";
import { FieldSelect } from "./field_components";
import { ATTACK_MODS, MONSTER_MODIFIERS_DECK } from "./data";

class ControlPanel extends Component {
  static props = { scenario: Scenario };
  static template = xml`
      <span>
        <button class="button me-1" t-on-click="addEnemy">Add Enemy</button>
        <button class="button me-1" t-on-click="attackModifiers">Attack Modifiers</button>
      </span>
      <button class="button me-1" t-att-class="{'disabled': !isNextRoundActive()}" t-on-click="nextRound">Next Round</button>
    `;
  setup() {
    this.game = useGame();
  }

  addEnemy() {
    const scenario = this.props.scenario;
    this.game.openBottomSheet(AddEnemy, { scenario });
  }

  isNextRoundActive() {
    for (let char of this.props.scenario.characters) {
      if (!char.didStart) {
        return false;
      }
    }
    for (let enemy of this.props.scenario.enemies) {
      if (!enemy.didStart) {
        return false;
      }
    }
    return true;
  }

  nextRound() {
    const scenario = this.props.scenario;
    scenario.nextRound();
    this.game.updateNavbarText(`${scenario.name}, round ${scenario.rounds}`);
  }

  attackModifiers() {
    const scenario = this.props.scenario;
    this.game.openBottomSheet(AttackModifiers, { scenario });
  }
}

const CARDS = ATTACK_MODS.concat(MONSTER_MODIFIERS_DECK).slice();

class AttackModifier extends Component {
  static props = ["deck", "descr", "scenario"];
  static template = xml`
      <div class="p-1 d-flex space-between" >
        <span><t t-esc="props.descr"/> (<t t-esc="props.deck.length()"/> cards)</span>
      </div>
      <div class="d-grid" style="grid-template-columns: 90px 1fr 95px;">
        <div class="d-flex flex-column">
          <div class="button mb-0 py-2" t-on-click="() => this.dealCard(1)">1 Card</div>
          <div class="button py-2" t-on-click="() => this.dealCard(2)">2 Cards</div>
        </div>
        <div class="d-flex py-1 flex-center">
          <t t-foreach="state.visible" t-as="mod" t-key="mod_index">
            <div class="border-gray border-radius-4 p-2 mx-1 d-flex align-center flex-center flex-column" t-attf-style="width:50px;position:relative;background-color:{{mod.color || 'white'}};">
              <t t-if="mod.recycled">
                <span class="text-bold" style="position:absolute;bottom:0;right:0">♲</span>
              </t>
              <t t-foreach="mod.effects" t-as="effect" t-key="effect_index">
                <div class="text-bold" t-att-class="{'text-larger': effect.length lt 3, 'text-smaller': effect.length gt 7}"><t t-esc="effect"/></div>
              </t>
            </div>
          </t>
        </div>
        <div>
          <div class="button mb-0 py-2" t-on-click="addCurse">+ Curse</div>
          <div class="button py-2" t-on-click="addBlessing">+ Blessing</div>
        </div>
      </div>`;

  setup() {
    this.state = useState({
      visible: [],
    });
    this.game = useGame();
  }

  addCurse() {
    this.props.scenario.addCurse(this.props.deck);
  }

  addBlessing() {
    this.props.scenario.addBlessing(this.props.deck);
  }

  dealCard(n) {
    const cards = this.props.deck.deal(n).map((id, index) => {
      if (typeof id === "string") {
        if (id === "curse") {
          return {
            id: `curse_${index}`,
            effects: [" Cx0"],
            recycled: false,
            color: "#ffffd9",
          };
        }
        if (id === "blessing") {
          return {
            id: `blessing_${index}`,
            effects: [" Bx2"],
            recycled: false,
            color: "#ffc7ff",
          };
        }
      }
      return CARDS.find((m) => m.id === id);
    });
    this.props.deck.filterDiscardPile((e) => e !== "curse" && e !== "blessing");
    this.state.visible = cards;
    this.game.save();
  }
}

class AttackModifiers extends Component {
  static props = ["scenario"];
  static components = { AttackModifier };
  static template = xml`
    <t t-foreach="props.scenario.characters" t-as="char" t-key="char.id">
      <AttackModifier scenario="props.scenario" deck="char.attackMods" descr="char.hero.name"/>
    </t>
    <AttackModifier scenario="props.scenario" deck="props.scenario.enemyAttackMods" descr="'Enemy Attack Modifiers'"/>
    `;
}

class ElementPane extends Component {
  static props = ["scenario"];
  static template = xml`
    <div class="p-1" style="display:grid;grid-template-columns:1fr 1fr 1fr;">
      <div class="element-card" t-att-class="{'text-bold': scenario.fire > 1, 'text-gray': !scenario.fire}" t-on-click="() => this.updateElement('fire')">
        Feu <t t-if="scenario.fire" t-esc="scenario.fire"/>
      </div>
      <div class="element-card" t-att-class="{'text-bold': scenario.ice > 1, 'text-gray': !scenario.ice}" t-on-click="() => this.updateElement('ice')">
        Glace <t t-if="scenario.ice" t-esc="scenario.ice"/>
      </div>
      <div class="element-card" t-att-class="{'text-bold': scenario.air > 1, 'text-gray': !scenario.air}" t-on-click="() => this.updateElement('air')">
        Air <t t-if="scenario.air" t-esc="scenario.air"/>
      </div>
      <div class="element-card" t-att-class="{'text-bold': scenario.earth > 1, 'text-gray': !scenario.earth}" t-on-click="() => this.updateElement('earth')">
        Terre <t t-if="scenario.earth" t-esc="scenario.earth"/>
      </div>
      <div class="element-card" t-att-class="{'text-bold': scenario.light > 1, 'text-gray': !scenario.light}" t-on-click="() => this.updateElement('light')">
        Lumière <t t-if="scenario.light" t-esc="scenario.light"/>
      </div>
      <div class="element-card" t-att-class="{'text-bold': scenario.darkness > 1, 'text-gray': !scenario.darkness}" t-on-click="() => this.updateElement('darkness')">
        Obscurité <t t-if="scenario.darkness" t-esc="scenario.darkness"/>
      </div>
    </div>
  `;

  setup() {
    this.scenario = this.props.scenario;
  }

  updateElement(elem) {
    this.scenario.cycleElement(elem);
  }
}

class ElementTracker extends Component {
  static props = ["scenario"];
  static template = xml`
    <div class="m-1 px-2 py-3 bg-white border-gray border-radius-4" t-on-click="showInfo">
      <span class="text-bold">Elements: </span>
      <t t-set="elems" t-value="elements"/>
      <t t-foreach="elems" t-as="elem" t-key="elem.name">
        <span class="" t-att-class="{'text-bold': elem.value > 1}"><t t-esc="elem.name"/></span>
        <t t-if="!elem_last">, </t>
      </t>
      <t t-if="!elems.length">
        none
      </t>
    </div>
  `;

  setup() {
    this.game = useGame();
  }

  get elements() {
    const scenario = this.props.scenario;
    let result = [];
    if (scenario.fire) {
      result.push({ name: "feu", value: scenario.fire });
    }
    if (scenario.ice) {
      result.push({ name: "glace", value: scenario.ice });
    }
    if (scenario.air) {
      result.push({ name: "air", value: scenario.air });
    }
    if (scenario.earth) {
      result.push({ name: "terre", value: scenario.earth });
    }
    if (scenario.light) {
      result.push({ name: "lumière", value: scenario.light });
    }
    if (scenario.darkness) {
      result.push({ name: "obscurité", value: scenario.darkness });
    }
    return result;
  }

  showInfo() {
    this.game.openBottomSheet(ElementPane, { scenario: this.props.scenario });
  }
}

class Counter extends Component {
  static props = ["obj", "key", "slots"];
  static template = xml`
    <div class="d-flex align-center p-1" style="font-size:14px;">
      <span class="button m-1 py-2 px-3" t-on-click="() => props.obj[props.key]--">-</span>
      <t t-slot="default"/>
      <span class="button m-1 py-2 px-3" t-on-click="() => props.obj[props.key]++">+</span>
    </div>`;
}

class StatusEditor extends Component {
  static props = ["entity"];
  static template = xml`
    <div class="d-grid mt-1" style="grid-template-columns: repeat(3, 1fr);gap:10px;">
      <div 
          class="border-radius-2 text-smallcaps text-center p-1 " 
          t-att-class="{'bg-darker text-bold': entity.poisoned}"
          t-on-click="() => entity.poisoned = !entity.poisoned"
        >
          poison
        </div>
        <div 
          class="border-radius-2 text-smallcaps text-center p-1 " 
          t-att-class="{'bg-darker text-bold': entity.wound}"
          t-on-click="() => entity.wound = !entity.wound"
        >
        blessure
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': entity.confusion}"
          t-on-click="() => this.toggleStatus('confusion')"
        >
          confusion
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': entity.immobilisation}"
          t-on-click="() => this.toggleStatus('immobilisation')"
        >
          immobilisation
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': entity.stunned}"
          t-on-click="() => this.toggleStatus('stunned')"
        >
          étourdissement
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': entity.disarmed}"
          t-on-click="() => this.toggleStatus('disarmed')"
        >
          désarmement
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': entity.renforced}"
          t-on-click="() => this.toggleStatus('renforced')"
        >
          renforcement
        </div>
    </div>
    `;
  setup() {
    this.entity = this.props.entity;
  }

  toggleStatus(effect) {
    if (this.entity[effect]) {
      this.entity[effect] = 0;
    } else {
      this.entity[effect] = this.entity.isActive() ? 2 : 1;
    }
  }
}

class HeroPanel extends Component {
  static props = ["char"];
  static components = { Counter, StatusEditor };
  static template = xml`
    <div class="px-2 py-1"><span class="text-bold"><t t-esc="props.char.hero.name"/></span></div>
    <div class="d-flex space-between mb-3">
      <Counter obj="props.char" key="'hp'">HP: <t t-esc="props.char.hp"/></Counter>
      <Counter obj="props.char" key="'xp'">XP: <t t-esc="props.char.xp"/></Counter>
      <Counter obj="props.char" key="'gold'">Gold: <t t-esc="props.char.gold"/></Counter>
    </div>
    <StatusEditor entity="props.char"/>
  `;
}

class EnemyPanel extends Component {
  static props = ["enemy"];
  static components = { Counter, StatusEditor };
  static template = xml`
    <div class="px-2 py-1"><span class="text-bold"><t t-esc="props.enemy.fullName"/></span></div>
    <StatusEditor entity="props.enemy"/>
    <div class="d-flex space-between mb-3 align-center">
      <Counter obj="props.enemy" key="'hp'">HP: <t t-esc="props.enemy.hp"/></Counter>
      <span t-if="!props.enemy.isBoss">
        <span class="me-1">ID</span>
        <input style="width:40px" type="number" t-model.number="props.enemy.visibleId"/>
      </span>
      <button class="button" t-on-click="removeEnemy">Remove</button>
    </div>
  `;

  setup() {
    this.game = useGame();
  }

  removeEnemy() {
    if (confirm("Are you sure that you want to remove this enemy?")) {
      this.props.enemy.scenario.removeEnemy(this.props.enemy);
      this.game.closeBottomSheet();
    }
  }
}

class AddEnemy extends Component {
  static props = ["scenario"];
  static components = { FieldSelect };
  static template = xml`
    <FieldSelect record="enemy" name="'type'" labelWidth="'80px'"/>
    <div class="d-flex align-center mx-2 my-3"  t-if="!enemy.isBoss" >
      <div class="text-right" style="width:80px">ID</div>
      <input class="mx-2 flex-grow" type="number" t-model.number="enemy.visibleId"/>
    </div>
    <div class="d-flex align-center mx-2 my-3" >
      <label class="text-right" for="eliteinput" style="width:80px" t-if="!enemy.isBoss">Elite</label>
      <div class="flex-grow mx-2 d-flex space-between me-2 align-center">
        <span><input id="eliteinput" t-if="!enemy.isBoss" type="checkbox" t-model="enemy.isElite"/></span>
          <button class="button" t-att-class="{ disabled: !enemy.isValid()}" t-on-click="addEnemy">Add</button>
      </div>
    </div>
    `;

  setup() {
    this.game = useGame();
    this.enemy = useState(
      createInstance(Enemy, { scenario: this.props.scenario }),
    );
  }

  addEnemy() {
    this.enemy.computeValues();
    this.props.scenario.addEnemy(this.enemy);
    this.game.closeBottomSheet();
  }
}

// -----------------------------------------------------------------------------
// Enemy Actions
// -----------------------------------------------------------------------------
class EnemyActions extends Component {
  static props = ["scenario"];
  static template = xml`
      <div class="d-flex space-between align-center justify-center mb-1" t-if="!props.scenario.hasAllEnemyActions()">
        <button class="button mx-2" t-on-click="selectActions">Choisir Actions</button>
      </div>
      <t t-foreach="props.scenario.getEnemyActions()" t-as="action" t-key="action.id">
        <div class="bg-gray px-1 py-2 d-flex space-between">
          <span class="text-bold"><t t-esc="action.enemyName"/></span>
          <span>Deck: <t t-esc="action.ncards"/> cards</span>
        </div>
        <div class="p-1 m-2 border-gray border-radius-4" t-if="action.card">
            <div class="d-flex align-center">
                <span class="text-bold text-larger"><t t-esc="action.card.initiative"/></span>
                <span class="mx-1"><t t-esc="action.card.name"/><t t-if="action.card.recycled"> <span class="text-bold">♲</span></t></span>
            </div>
            <ul class="my-1 text-smaller text-italic">
                <li t-foreach="action.card.effects" t-as="effect" t-key="effect">
                    <t t-esc="effect"/>
                </li>
            </ul>
        </div>
        <div t-else="" class="text-center m-2 p-2 text-gray text-larger">
          No action yet
        </div>
      </t>
  `;

  setup() {
    this.game = useGame();
  }

  selectActions() {
    this.props.scenario.selectActions();
    this.game.save();
  }
}

// -----------------------------------------------------------------------------
// Action/Turn Tracker
// -----------------------------------------------------------------------------

class TurnTracker extends Component {
  static props = ["scenario"];
  static template = xml`
    <t t-set="hasAllEnAct" t-value="props.scenario.hasAllEnemyActions()"/>
    <div class="m-1 px-2 py-1 bg-white border-gray border-radius-4">
      <div class="d-flex space-between align-center">
        <span class="text-bold">Turn Tracker</span>
        <div class="button m-0" t-att-class="{ 'disabled': !props.scenario.enemies.length, 'secondary': hasAllEnAct}" t-on-click="showActions">Enemy Actions</div>
      </div>
      <div t-att-class="{'disabled': !hasAllEnAct}" class="d-flex flex-wrap">
        <t t-foreach="props.scenario.characters" t-as="char" t-key="char.id">
          <t t-if="char.didStart">
            <div class="button disabled" t-att-class="{'text-bold': props.scenario.activeEntityId===char.id}"><t t-esc="char.hero.name"/></div>
          </t>
          <div t-else="" class="button" t-on-click="() => this.startCharTurn(char.id)">
            <t t-esc="char.hero.name"/>
          </div>
        </t>
        <t t-foreach="enemyTurns()" t-as="enemy" t-key="enemy.type">
          <t t-if="enemy.didStart">
            <div class="button disabled" ><t t-esc="enemy.name"/></div>
          </t>
          <div t-else="" class="button" t-on-click="() => this.startEnemyTurn(enemy.type)">
            <t t-if="enemy.initiative">[<t t-esc="enemy.initiative"/>] </t>
            <t t-esc="enemy.name"/>
          </div>
        </t>

      </div>
    </div>
  `;

  setup() {
    this.game = useGame();
  }

  showActions() {
    const scenario = this.props.scenario;
    this.game.openBottomSheet(EnemyActions, { scenario });
  }

  startCharTurn(id) {
    this.props.scenario.startCharTurn(id);
  }
  startEnemyTurn(type) {
    this.props.scenario.startEnemyTurn(type);
  }

  enemyTurns() {
    let mapping = {};
    for (let enemy of this.props.scenario.enemies) {
      if (enemy.type in mapping && !enemy.didStart) {
        mapping[enemy.type] = enemy;
      } else {
        mapping[enemy.type] = enemy;
      }
    }
    return Object.values(mapping);
  }
}

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

class Content extends Component {
  static props = ["scenario"];
  static template = xml`
    <ElementTracker scenario="props.scenario"/>
    <TurnTracker scenario="props.scenario"/>
    <t t-foreach="props.scenario.characters" t-as="char" t-key="char.id">
        <div class="m-1 p-1 bg-lightgreen border-gray border-radius-4"
            t-on-click="() => this.editHero(char)"
            t-att-class="{ 'border-bold': char.id === state.active}">
            <div class="d-flex space-between mb-2 mx-1">
              <span class="text-bold">
                <t t-esc="char.hero.name"/>
              </span> 
              <span>
              <t t-esc="char.hero.className"/> (level <t t-esc="char.hero.level"/>)
              </span>
            </div>
            <div class="d-flex space-between mx-1">
              <span t-att-class="{'text-red': char.hp lte 0}">
                HP: <span class="text-bold"><t t-esc="char.hp"/> / <t t-esc="char.maxHp"/></span>
              </span> 
              <span>
                XP: <span class="text-bold"><t t-esc="char.xp"/></span>
              </span>
              <span>
                Gold: <span class="text-bold"><t t-esc="char.gold"/></span>
              </span>
            </div>
            <div class="d-flex space-between p-1" t-if="char.status">
              <span>Status: <span class="text-bold" t-esc="char.status"/> </span>
            </div>
        </div>
    </t>
    <t t-foreach="props.scenario.enemies" t-as="enemy" t-key="enemy.id">
        <div class="m-1 p-1 bg-lightred border-gray border-radius-4"
            t-on-click="() => this.editEnemy(enemy)"
            t-att-class="{ 'border-bold': enemy.id === state.active}">
            <div class="d-flex space-between mb-2 mx-1">
              <span class="text-bold"><t t-esc="enemy.fullName"/></span> 
              <span>
              Move: <span class="text-bold" t-esc="enemy.move"/>
              </span>
            </div>
            <div class="d-flex space-between mx-1">
              <span t-att-class="{'text-red': enemy.hp lte 0}">
                HP: <span class="text-bold"><t t-esc="enemy.hp"/> / <t t-esc="enemy.maxHp"/></span>
              </span> 
              <span>
                Attack: <span class="text-bold"><t t-esc="enemy.attack"/></span>
              </span>
            </div>
            <div class="d-flex space-between p-1" t-if="enemy.status">
              <span>Status: <span class="text-bold" t-esc="enemy.status"/> </span>
            </div>
            <div class="px-1 mt-1" t-if="enemy.modifiers">
              <span class="me-1">Modifiers: </span> <span class="text-italic"><t t-esc="enemy.modifiers"/></span>
            </div>
            <div class="px-1 mt-1" t-if="enemy.immunities">
              <span class="me-1">Immunités: </span> <span class="text-italic"><t t-esc="enemy.immunities"/></span>
            </div>
            <t t-if="enemy.isBoss">
              <div class="p-1 border-top-gray mt-1 pt-1 pb-0">
                <span class="text-bold">Spécial 1</span> <span class="text-italic"><t t-esc="enemy.special1"/></span>
              </div>
              <div class="p-1 pb-0">
                <span class="text-bold">Spécial 2</span> <span class="text-italic"><t t-esc="enemy.special2"/></span>
              </div>          
            </t>
        </div>
    </t>
    `;
  static components = { ElementTracker, TurnTracker };

  setup() {
    this.game = useGame();
    this.state = useState({ active: null });
  }

  editHero(char) {
    this.state.active = char.id;
    this.game.openBottomSheet(HeroPanel, { char }, () => {
      this.state.active = null;
    });
  }
  editEnemy(enemy) {
    this.state.active = enemy.id;
    this.game.openBottomSheet(EnemyPanel, { enemy }, () => {
      this.state.active = null;
    });
  }
}

// -----------------------------------------------------------------------------
// Hero Screen
// -----------------------------------------------------------------------------

export const MAIN_SCREEN = (scenario) => {
  if (scenario.rounds === 0) {
    scenario.rounds = 1;
  }
  return {
    navbarText: `${scenario.name}, round ${scenario.rounds}`,
    backButton: true,
    ControlPanel,
    Content,
    props: { scenario },
  };
};

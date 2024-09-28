import { Component, useState, xml } from "@odoo/owl";
import { ControlPanel } from "../shared/control_panel";
import { CharacterCard } from "../shared/character_card";
import { CARD } from "../shared/style";
import { BATTLE_GOALS, ENEMIES_MAP, MONSTER_MODIFIERS_DECK } from "../data";
import { shuffleArray } from "../utils";
import { StatusEditor, statusString } from "../shared/status_editor";
import { Counter } from "../shared/counter";
import { Layout } from "../shared/layout";

// -----------------------------------------------------------------------------
// MARK: EnemyAttackModifier
// -----------------------------------------------------------------------------
class EnemyAttackModifiers extends Component {
  static template = xml`
        <div class="${CARD} bg-white">
          <div class="bg-gray p-1 d-flex space-between"  t-on-click="toggle">
            <span>Enemy Attack Modifiers (<t t-esc="mods.deck.length"/> cards)</span>
          </div>
          <div class="d-grid" style="grid-template-columns: 90px 1fr 95px;" t-if="state.open">
            <div class="d-flex flex-column">
              <div class="button mb-0" t-on-click="() => this.dealCard(1)">1 Card</div>
              <div class="button" t-on-click="() => this.dealCard(2)">2 Cards</div>
            </div>
            <div class="d-flex py-1 flex-center">
              <!-- sadf -->
              <t t-foreach="currentModifiers()" t-as="mod" t-key="mod.id">
                <div class="border-gray border-radius-4 p-2 mx-1 d-flex align-center flex-center" t-attf-style="width:35px;position:relative;background-color:{{mod.color || 'white'}};">
                  <t t-if="mod.recycled">
                    <span class="text-bold" style="position:absolute;bottom:0;right:0">♲</span>
                  </t>
                  <t t-foreach="mod.effects" t-as="effect" t-key="effect_index">
                    <div class="text-bold text-larger"><t t-esc="effect"/></div>
                  </t>
                </div>
              </t>
            </div>
            <div>
              <div class="button mb-0" t-on-click="addCurse">+ Curse</div>
              <div class="button" t-on-click="addBlessing">+ Blessing</div>
            </div>
          </div>
        </div>`;

  setup() {
    this.mods = this.props.game.enemyModifiers;
    this.state = useState({
      open: true,
    });
  }

  toggle() {
    this.state.open = !this.state.open;
  }

  addCurse() {
    this.props.game.addCurse();
  }
  addBlessing() {
    this.props.game.addBlessing();
  }

  dealCard(n) {
    this.mods.visible = n;
    if (this.mods.deck.length < n) {
      while (this.mods.discardPile.length) {
        this.mods.deck.push(this.mods.discardPile.pop());
      }
    }
    shuffleArray(this.mods.deck);
    for (let i = 0; i < n; i++) {
      this.mods.discardPile.unshift(this.mods.deck.pop());
    }
  }

  currentModifiers() {
    const n = this.mods.visible;
    const ids = this.mods.discardPile.slice(0, n);
    const cards = ids.map((id) => {
      if (typeof id === "string") {
        if (id.startsWith("curse")) {
          return {
            id,
            effects: [" Cx0"],
            recycled: false,
            color: "#ffffd9",
          };
        }
        if (id.startsWith("blessing")) {
          return {
            id,
            effects: [" Bx2"],
            recycled: false,
            color: "#ffc7ff",
          };
        }
      }
      return MONSTER_MODIFIERS_DECK.find((m) => m.id === id);
    });
    console.log(cards);
    return cards;
  }
}

// -----------------------------------------------------------------------------
// MARK: BattleGoalTracker
// -----------------------------------------------------------------------------
class BattleGoal extends Component {
  static template = xml`
          <div class="mx-3 my-2 p-1 border-gray border-radius-4" t-on-click="onClick">
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

class BattleGoalTracker extends Component {
  static template = xml`
        <div class="${CARD} bg-white">
          <div class="d-flex space-between bg-gray p-1 align-center">
            <span>Battle Goals</span>
            <span class="text-bold text-primary text-larger" t-on-click="close">×</span>
          </div>
          <div class="d-flex">
            <t t-foreach="props.game.heroes" t-as="hero" t-key="hero.id">
                  <div class="button" t-on-click="() => this.toggleHero(hero)" t-att-class="{'text-bold': state.hero and state.hero.id === hero.id}">
                    <t t-esc="hero.name"/>
                    <t t-if="props.game.battleGoals[hero.id]"><span class="ms-1">✓</span></t>
                  </div>
            </t>
          </div>
          <div t-if="state.hero">
                <t t-if="props.game.battleGoals[state.hero.id]">
                  <BattleGoal id="props.game.battleGoals[state.hero.id]"/>
                </t>
                <t t-else="">
                  <t t-set="i" t-value="getHeroIndex(state.hero.id)"/>
                  <BattleGoal id="goals[2*i]" onClick="() => this.selectGoal(2*i)"/>
                  <BattleGoal id="goals[2*i+1]" onClick="() => this.selectGoal(2*i+1)"/>
                </t>
            <div>
            </div>
          </div>
        </div>`;
  static components = { BattleGoal };

  setup() {
    /** @type {{ hero: boolean | object }} */
    this.state = useState({
      hero: false,
    });
    this.goals = shuffleArray(BATTLE_GOALS.map((g) => g.id));
  }

  getHeroIndex(heroId) {
    return this.props.game.heroes.findIndex((h) => h.id === heroId);
  }

  toggleHero(hero) {
    if (this.state.hero === hero) {
      this.state.hero = false;
    } else {
      this.state.hero = hero;
    }
  }

  selectGoal(goalIndex) {
    const heroId = this.state.hero.id;
    this.props.game.battleGoals[heroId] = this.goals[goalIndex];
    this.state.hero = false;
  }

  close() {
    this.props.game.config.battleGoals = false;
  }
}

// -----------------------------------------------------------------------------
// MARK: Turn Tracker
// -----------------------------------------------------------------------------
class TurnTracker extends Component {
  static template = xml`
        <div class="${CARD} bg-white">
          <div class="bg-gray p-1 d-flex space-between align-center" t-on-click="toggle">
            <span t-if="game.activeEntity">Current turn: <t t-esc="activeEntityName()"/></span>
            <span t-else="">Turn Tracker</span>
          </div>
          <div class="p-1" t-if="state.open">
            <div t-if="game.round === 1">Select each hero/monster when its turn starts</div>
            <div class="d-flex align-center flex-wrap">
              <t t-foreach="game.heroes" t-as="hero" t-key="hero.id">
                <t t-if="game.turnTracker[hero.id]">
                  <div class="button disabled" t-att-class="{'text-bold': game.activeEntity===hero.id}"><t t-esc="hero.name"/></div>
                </t>
                <div t-else="" class="button" t-on-click="() => this.startTurn(hero.id)">
                  <t t-esc="hero.name"/>
                </div>
              </t>
              <t t-foreach="enemies()" t-as="type" t-key="type">
                <t t-set="initiative" t-value="enemyInitiative(type)"/>
                <t t-if="game.turnTracker[type]">
                  <div class="button disabled"  t-att-class="{'text-bold': game.activeEntity===type}">
                    <t t-if="initiative">[<t t-esc="initiative"/>] </t>
                    <t t-esc="enemyName(type)"/>
                  </div>
                </t>
                <div t-else="" class="button" t-on-click="() => this.startTurn(type)">
                  <t t-if="initiative">[<t t-esc="initiative"/>] </t>
                  <t t-esc="enemyName(type)"/>
                </div>
              </t>
            </div>
          </div>
        </div>
      `;
  setup() {
    this.state = useState({ open: true });
    this.game = this.props.game;
  }

  toggle() {
    this.state.open = !this.state.open;
  }

  startTurn(entity) {
    this.game.startTurn(entity);
  }

  enemyInitiative(type) {
    return this.game.monsterActions[type].initiative;
  }

  enemyName(type) {
    return ENEMIES_MAP[type].name;
  }

  activeEntityName() {
    const entity = this.game.activeEntity;
    if (typeof entity === "number") {
      // hero
      const hero = this.game.heroes.find((hero) => hero.id === entity);
      return hero.name;
    } else {
      // enemy
      return ENEMIES_MAP[entity].name;
    }
  }
  enemies() {
    const types = new Set();
    for (let enemy of this.game.enemies) {
      types.add(enemy.type);
    }
    return [...types];
  }
}

// -----------------------------------------------------------------------------
// MARK: Element Tracker
// -----------------------------------------------------------------------------
class ElementTracker extends Component {
  static template = xml`
        <div class="${CARD} bg-white p-1" style="display:grid;grid-template-columns:1fr 1fr 1fr;">
          <div class="element-card" t-att-class="{'text-bold': game.fire > 1, 'text-gray': !game.fire}" t-on-click="() => this.updateElement('fire')">
            Feu <t t-if="game.fire" t-esc="game.fire"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.ice > 1, 'text-gray': !game.ice}" t-on-click="() => this.updateElement('ice')">
            Glace <t t-if="game.ice" t-esc="game.ice"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.air > 1, 'text-gray': !game.air}" t-on-click="() => this.updateElement('air')">
            Air <t t-if="game.air" t-esc="game.air"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.earth > 1, 'text-gray': !game.earth}" t-on-click="() => this.updateElement('earth')">
            Terre <t t-if="game.earth" t-esc="game.earth"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.light > 1, 'text-gray': !game.light}" t-on-click="() => this.updateElement('light')">
            Lumière <t t-if="game.light" t-esc="game.light"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.darkness > 1, 'text-gray': !game.darkness}" t-on-click="() => this.updateElement('darkness')">
            Obscurité <t t-if="game.darkness" t-esc="game.darkness"/>
          </div>
        </div>
    `;

  setup() {
    this.game = this.props.game;
  }

  updateElement(elem) {
    this.game[elem] = this.game[elem] - 1;
    if (this.game[elem] < 0) {
      this.game[elem] = 2;
    }
  }
}

// -----------------------------------------------------------------------------
// MARK: EnemyCard
// -----------------------------------------------------------------------------
class EnemyCard extends Component {
  static template = xml`
        <div class="${CARD} bg-lightred py-1" t-on-click="toggle">
          <div class="d-flex space-between px-2 align-center">
            <span class="text-bold">
              <span t-if="props.enemy.elite" style="font-variant: smallcaps;">Elite </span>
              <t t-esc="props.enemy.name"/>
              <t t-if="props.enemy.boss"> [BOSS]</t>
              <t t-if="!props.enemy.boss and props.enemy.nbr"> [<t t-esc="props.enemy.nbr"/>]</t>
            </span>
            <span>Move: <span class="text-bold" t-esc="props.enemy.move"/></span>
          </div>
          <div class="d-flex space-between px-2  align-center">
            <span t-att-class="{'text-red': props.enemy.hp lt 1}">
              HP: <span class="text-bold" t-esc="props.enemy.hp"/> / <span class="text-bold" t-esc="props.enemy.maxHp"/>
            </span>
            <span>Attack: <span class="text-bold" t-esc="props.enemy.attack"/></span>
          </div>
          <div class="d-flex space-between px-2 " t-if="statuses">
            <span>Status: <span class="text-bold" t-esc="statuses"/> </span>
          </div>
          <div class="d-flex px-2" t-if="props.enemy.modifiers">
            <span class="me-1">Modificateurs: </span> <span class="text-italic"><t t-esc="props.enemy.modifiers"/></span>
          </div>
          <div class="d-flex px-2 " t-if="props.enemy.immunities">
            <span>Immunités: <span class="text-italic" t-esc="props.enemy.immunities"/></span>
          </div>
          <t t-if="props.enemy.boss">
            <div class="px-2 border-top-gray mt-1 pt-1 ">
              <span class="text-bold">Spécial 1</span> <span class="text-italic"><t t-esc="props.enemy.special1"/></span>
            </div>
            <div class="px-2" t-if="props.enemy.boss">
              <span class="text-bold">Spécial 2</span> <span class="text-italic"><t t-esc="props.enemy.special2"/></span>
            </div>          
          </t>
          <div t-if="state.isOpen" t-on-click.stop="" class="p-1  border-top-gray">
            <div class="d-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
              <StatusEditor status="props.enemy.status"  isActive="props.enemy.type === props.game.activeEntity"  />
            </div>
            <div class="d-flex space-between align-center">
              <Counter dec="() => props.enemy.hp--" inc="() => props.enemy.hp++">HP</Counter>
              <div t-if="!props.enemy.boss">
                <span>ID </span>
                <select t-model.number="props.enemy.nbr">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
              <div><span class="button p-2" t-on-click="remove">Remove</span></div>
            </div>
          </div>
  
          <!-- <div class="d-flex space-between px-2 py-1">
            <span>XP: <span class="text-bold" t-esc="props.hero.xp"/></span>
            <span>Gold: <span class="text-bold" t-esc="props.hero.gold"/></span>
          </div>
          <div class="d-flex space-between px-2 py-1" t-if="statuses">
            <span>Status: <t t-esc="statuses"/> </span>
          </div> -->
        </div>`;

  static components = { StatusEditor, Counter };

  setup() {
    this.state = useState({
      isOpen: false,
    });
  }

  toggle() {
    this.state.isOpen = !this.state.isOpen;
  }

  get statuses() {
    if (this.props.enemy.hp <= 0) {
      return "";
    }
    return statusString(this.props.enemy.status);
  }

  remove() {
    if (confirm("Are you sure that you want to remove this enemy?")) {
      const index = this.props.game.enemies.findIndex(
        (e) => e._id === this.props.enemy._id,
      );
      if (index >= 0) {
        this.props.game.enemies.splice(index, 1);
      }
    }
  }
}

class EnemyActions extends Component {
  static template = xml`
      <div class="${CARD} bg-white">
        <t t-foreach="enemyTypes" t-as="type" t-key="type">
            <t t-set="actions" t-value="enemyActions(type)"/>
            <div class="">
                <div class="p-2 d-flex space-between" style="background-color: #eee;">
                    <span class="text-bold"><t t-esc="enemyName(type)"/></span>
                    <span class="text-smaller">deck: <t t-esc="actions.deck.length"/> cartes</span>
                </div>
                <div class="d-flex flex-end" t-if="actions.active === false">
                    <span class="button m-2 p-1" t-on-click="() => this.selectAction(type)">Choisir action</span>
                </div>
                <div t-if="actions.active" class="p-1" >
                    <t t-set="action" t-value="activeAction(type)"/>
                    <div class="d-flex align-center">
                        <span class="text-bold text-larger"><t t-esc="action.initiative"/></span>
                        <span class="mx-1"><t t-esc="action.name"/><t t-if="action.recycled"> <span class="text-bold">♲</span></t></span>
                    </div>
                    <ul class="my-1 text-smaller text-italic">
                        <li t-foreach="action.effects" t-as="effect" t-key="effect">
                            <t t-esc="effect"/>
                        </li>
                    </ul>
                </div>
            </div>
        </t>
      </div>`;

  get enemyTypes() {
    const types = new Set();
    for (let enemy of this.props.game.enemies) {
      types.add(enemy.type);
    }
    return [...types];
  }

  enemyActions(type) {
    return this.props.game.monsterActions[type];
  }
  enemyName(type) {
    return ENEMIES_MAP[type].name;
  }

  selectAction(type) {
    const monsterAction = this.enemyActions(type);
    if (!monsterAction.deck.length) {
      const deck = monsterAction.discardPile;
      shuffleArray(deck);
      monsterAction.discardPile = [];
      monsterAction.deck = deck;
    }
    const action = monsterAction.deck.pop();
    monsterAction.discardPile.unshift(action);
    monsterAction.active = true;
    const actionObj = this.activeAction(type);
    monsterAction.initiative = actionObj.initiative;
  }

  activeAction(type) {
    const actions = this.enemyActions(type);
    if (actions.active === false) {
      throw new Error("boom");
    }
    const activeId = actions.discardPile[0];
    const action = ENEMIES_MAP[type].actions.find((a) => a.id === activeId);
    console.log(action);
    return action;
  }
}

export class MainScreen extends Component {
  static template = xml`
    <t t-set="game" t-value="props.game"/>
    <t t-set="ui" t-value="props.ui"/>
    <Layout>
      <t t-set-slot="navbar">
        <span class="mx-2"><t t-if="game.round">Round <t t-esc="game.round"/></t></span>
        <div class="m-3 text-bold text-larger" t-on-click="() => game.pushScreen('CONFIG')">⚙</div>
      </t>
      <ControlPanel>
        <div class="button ms-1" t-on-click="() => game.pushScreen('ADD_ENEMY')">Add Enemy</div>
        <div class="button ms-1" t-on-click="goToNextRound" t-att-class="{disabled: !game.isNextRoundEnabled() }">
          <t t-if="game.round">Next Round</t>
          <t t-else="">Start Scenario</t>
        </div>
      </ControlPanel>
      <t t-if="game.config.battleGoals">
        <BattleGoalTracker game="game"/>
      </t>
      <TurnTracker t-if="game.config.turnTracker" game="props.game" />
      <t t-if="game.enemies.length and game.config.enemyActions">
        <EnemyActions game="game"/>
      </t>
      <ElementTracker t-if="game.config.elements" game="props.game" />
      <t t-foreach="game.heroes" t-as="hero" t-key="hero.id">
        <CharacterCard hero="hero" game="game"/>
      </t>
      <t t-foreach="game.enemies" t-as="enemy" t-key="enemy.id">
        <EnemyCard enemy="enemy" game="game"/>
      </t>
      <t t-if="game.config.attackModifiers and game.enemies.length">
        <EnemyAttackModifiers game="game"/>
      </t>
    </Layout>`;
  static components = {
    Layout,
    ControlPanel,
    CharacterCard,
    EnemyActions,
    EnemyCard,
    ElementTracker,
    TurnTracker,
    BattleGoalTracker,
    EnemyAttackModifiers,
  };

  setup() {
    this.game = this.props.game;
  }

  goToNextRound() {
    this.props.game.incrementRound();
  }
}

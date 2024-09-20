{
  const { Component, mount, xml, useState } = owl;

  // -----------------------------------------------------------------------------
  // MARK: utils
  // -----------------------------------------------------------------------------

  function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  let isSleepPrevented = false;
  function preventSleep() {
    if ("wakeLock" in navigator && !isSleepPrevented) {
      isSleepPrevented = true;
      document.addEventListener(
        "click",
        () => {
          navigator.wakeLock.request("screen");
        },
        { once: true },
      );
    }
  }

  const CARD = "border-gray border-radius-4 mx-1 mt-1 mb-1";

  function statusString(statusObj) {
    const keys = [];
    for (let k in statusObj) {
      if (statusObj[k]) {
        keys.push(k);
      }
    }
    if (!keys.length) {
      return "";
    }
    const mapping = {
      poisoned: "poison",
      wound: "blessure",
      confusion: "confusion",
      immobilisation: "immobilisation",
      stunned: "étourdissement",
      renforced: "renforcement",
    };

    return keys.map((k) => mapping[k]).join(", ");
  }

  // -----------------------------------------------------------------------------
  // MARK: Game state
  // -----------------------------------------------------------------------------

  class GameState {
    nextId = 1;
    heroes = [];
    enemies = [];
    scenarioLevel = 1;
    round = 0;
    fire = 0;
    ice = 0;
    air = 0;
    earth = 0;
    light = 0;
    darkness = 0;
    monsterActions = {};
    enemyModifiers = {
      visible: 0, // number of discarded cards to show
      deck: shuffleArray(MONSTER_MODIFIERS_DECK.map((c) => c.id)),
      discardPile: [],
    };
    battleGoals = {};
    turnTracker = {};
    config = {
      elements: true,
      tours: true,
      battleGoals: true,
      enemyActions: true,
      attackModifiers: true,
    };

    screens = ["START"];
    states = [null];

    get screen() {
      return this.screens.at(-1);
    }

    get state() {
      return this.states.at(-1);
    }

    setScreen(screen) {
      this.screens = [screen];
      this.states = [null];
    }

    pushScreen(screen, state = null) {
      if (!(screen in SCREEN_MAP)) {
        throw new Error("Nope...");
      }
      this.screens.push(screen);
      this.states.push(state);
    }

    popScreen() {
      this.screens.pop();
      this.states.pop();
    }

    addHero(hero) {
      hero.id = this.nextId++;
      this.heroes.push(hero);
    }

    addEnemy(enemy) {
      enemy.id = this.nextId++;
      this.enemies.push(enemy);
    }

    getId() {
      return this.nextId++;
    }

    isNextRoundEnabled() {
      if (this.round) {
        return true;
      } else {
        return true;
      }
    }

    incrementRound() {
      this.round++;
      for (let elem of ["fire", "ice", "air", "earth", "light", "darkness"]) {
        if (this[elem] > 0) {
          this[elem]--;
        }
      }
      // reset all monster actions
      for (let type in this.monsterActions) {
        this.monsterActions[type].active = false;
        let shouldShuffle = false;
        for (let actionId of this.monsterActions[type].discardPile) {
          const action = ENEMIES_MAP[type].actions.find(
            (a) => a.id === actionId,
          );
          if (action.recycled) {
            shouldShuffle = true;
            break;
          }
        }
        if (shouldShuffle) {
          const deck = ENEMIES_MAP[type].actions.map((a) => a.id);
          shuffleArray(deck);
          this.monsterActions[type].deck = deck;
          this.monsterActions[type].discardPile = [];
        }
      }

      // reset all enemy attack modifiers if necessary
      const mods = this.enemyModifiers;
      mods.visible = 0;
      // remove strings (curses and blessings)
      mods.discardPile = mods.discardPile.filter((c) => typeof c === "number");
      const discardedMods = mods.discardPile.map((id) =>
        MONSTER_MODIFIERS_DECK.find((mod) => mod.id === id),
      );
      if (discardedMods.find((mod) => mod.recycled)) {
        // should shuffle
        while (mods.discardPile.length) {
          mods.deck.push(mods.discardPile.pop());
        }
        shuffleArray(mods.deck);
      }
    }

    addCurse() {
      const curses = this.enemyModifiers.deck.filter((id) => {
        return typeof id === "string" && id.startsWith("curse");
      });
      if (curses.length < 10) {
        this.enemyModifiers.deck.push(`curse${-this.nextId++}`);
        shuffleArray(this.enemyModifiers.deck);
      }
    }
    addBlessing() {
      const blessings = this.enemyModifiers.deck.filter((id) => {
        return typeof id === "string" && id.startsWith("blessing");
      });
      if (blessings.length < 10) {
        this.enemyModifiers.deck.push(`blessing${-this.nextId++}`);
        shuffleArray(this.enemyModifiers.deck);
      }
    }
  }

  // -----------------------------------------------------------------------------
  // MARK: CharacterSummary
  // -----------------------------------------------------------------------------
  class CharacterSummary extends Component {
    static template = xml`
      <div class="${CARD} bg-lightgreen" t-on-click="onClick">
        <div class="d-flex space-between px-2 py-1">
          <span class="text-bold"><t t-esc="props.hero.name"/></span>
          <span class=""><t t-esc="heroClass"/> (level <t t-esc="props.hero.level"/>)</span>
        </div>
        <div class="d-flex space-between px-2 py-1">
          <span t-att-class="{'text-red': props.hero.hp lt 1}">HP: <span class="text-bold" t-esc="props.hero.hp"/> / <span class="text-bold" t-esc="props.hero.maxHp"/></span>
          <span>XP: <span class="text-bold" t-esc="props.hero.xp"/></span>
          <span>Gold: <span class="text-bold" t-esc="props.hero.gold"/></span>
        </div>
      </div>`;

    get heroClass() {
      return CLASS_NAME[this.props.hero.class];
    }

    onClick() {
      this.props.onClick?.();
    }
  }

  class Counter extends Component {
    static template = xml`
      <div class="d-flex align-center p-1">
        <span class="button m-1 py-2 px-3" t-on-click="props.dec">-</span>
        <t t-slot="default"/>
        <span class="button m-1 py-2 px-3" t-on-click="props.inc">+</span>
      </div>`;
  }

  class StatusEditor extends Component {
    static template = xml`
      <t t-set="status" t-value="props.status"/>
      <div 
        class="border-radius-2 text-smallcaps text-center p-1 " 
        t-att-class="{'bg-darker text-bold': status.poisoned}"
        t-on-click="() => status.poisoned = !status.poisoned"
      >
        poison
      </div>
      <div
        class="border-radius-2 text-smallcaps text-center p-1 "
        t-att-class="{'bg-darker text-bold': status.wound}"
        t-on-click="() => status.wound = !status.wound"
      >
        blessure
      </div>
      <div
        class="border-radius-2 text-smallcaps text-center p-1 "
        t-att-class="{'bg-darker text-bold': status.confusion}"
        t-on-click="() => status.confusion = !status.confusion"
      >
        confusion
      </div>
      <div
        class="border-radius-2 text-smallcaps text-center p-1 "
        t-att-class="{'bg-darker text-bold': status.immobilisation}"
        t-on-click="() => status.immobilisation = !status.immobilisation"
      >
        immobilisation
      </div>
      <div
        class="border-radius-2 text-smallcaps text-center p-1 "
        t-att-class="{'bg-darker text-bold': status.stunned}"
        t-on-click="() => status.stunned = !status.stunned"
      >
        étourdissement
      </div>
      <div
        class="border-radius-2 text-smallcaps text-center p-1 "
        t-att-class="{'bg-darker text-bold': status.renforced}"
        t-on-click="() => status.renforced = !status.renforced"
      >
        renforcement
      </div>`;
  }

  // -----------------------------------------------------------------------------
  // MARK: CharacterCard
  // -----------------------------------------------------------------------------
  class CharacterCard extends Component {
    static template = xml`
      <div class="${CARD} bg-lightgreen" t-on-click="toggle">
      <div class="d-flex space-between px-2 py-1">
          <span class="text-bold"><t t-esc="props.hero.name"/></span>
          <span class=""><t t-esc="heroClass"/> (level <t t-esc="props.hero.level"/>)</span>
        </div>
        <div class="d-flex space-between px-2 py-1">
          <span t-att-class="{'text-red': props.hero.hp lt 1}">HP: <span class="text-bold" t-esc="props.hero.hp"/> / <span class="text-bold" t-esc="props.hero.maxHp"/></span>
          <span>XP: <span class="text-bold" t-esc="props.hero.xp"/></span>
          <span>Gold: <span class="text-bold" t-esc="props.hero.gold"/></span>
        </div>
        <div class="d-flex space-between px-2 py-1" t-if="statuses">
          <span>Status: <span class="text-bold" t-esc="statuses"/> </span>
        </div>
        <div t-if="state.isOpen" t-on-click.stop="" class="p-1  border-top-gray d-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
          <Counter dec="() => props.hero.hp--" inc="() => props.hero.hp++">HP</Counter>
          <Counter dec="() => props.hero.xp--" inc="() => props.hero.xp++">XP</Counter>
          <Counter dec="() => props.hero.gold--" inc="() => props.hero.gold++">Gold</Counter>
          <StatusEditor status="props.hero.status" />
        </div>

      </div>
        <!-- <div class="d-flex space-between px-2 py-1">
          <span>XP: <span class="text-bold" t-esc="props.hero.xp"/></span>
          <span>Gold: <span class="text-bold" t-esc="props.hero.gold"/></span>
        </div>
        <div class="d-flex space-between px-2 py-1" t-if="statuses">
          <span>Status: <t t-esc="statuses"/> </span>
        </div> -->
      `;
    static components = { Counter, StatusEditor };

    setup() {
      this.state = useState({
        isOpen: false,
      });
    }

    get heroClass() {
      return CLASS_NAME[this.props.hero.class];
    }

    toggle() {
      this.state.isOpen = !this.state.isOpen;
    }

    get statuses() {
      if (this.props.hero.hp <= 0) {
        return "";
      }
      return statusString(this.props.hero.status);
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
  // MARK: Turn Tracker
  // -----------------------------------------------------------------------------
  class TurnTracker extends Component {
    static template = xml`
      <div class="${CARD} bg-white">
        <div class="bg-gray p-1">
          Tours
        </div>
        <div class="p-1">
         dadsf
        </div>
      </div>
  `;
  }

  // -----------------------------------------------------------------------------
  // MARK: EnemyAttackModifier
  // -----------------------------------------------------------------------------
  class EnemyAttackModifiers extends Component {
    static template = xml`
      <div class="${CARD} bg-white">
        <div class="bg-gray p-1 d-flex space-between"  t-on-click="toggle">
          <span>Enemy Attack Modifiers (<t t-esc="mods.deck.length"/> cards)</span>
          <span class="text-bold text-primary text-larger" t-on-click="close">×</span>
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

    close() {
      this.props.game.config.attackModifiers = false;
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
            <StatusEditor status="props.enemy.status" />
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

  // -----------------------------------------------------------------------------
  // MARK: EnemyActions
  // -----------------------------------------------------------------------------

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
      const monsterActions = this.props.game.monsterActions;
      for (let enemy of this.props.game.enemies) {
        types.add(enemy.type);
        if (!(enemy.type in monsterActions)) {
          const deck = ENEMIES_MAP[enemy.type].actions.map((a) => a.id);
          shuffleArray(deck);
          monsterActions[enemy.type] = {
            deck,
            discardPile: [],
            active: false,
          };
        }
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

  // -----------------------------------------------------------------------------
  // MARK: TopMenu
  // -----------------------------------------------------------------------------
  class TopMenu extends Component {
    static template = xml`
      <div class="bg-primary text-white d-flex align-center space-between" style="height:45px;">
        <t t-slot="default"/>
      </div>`;
  }

  // -----------------------------------------------------------------------------
  // MARK: ControlPanel
  // -----------------------------------------------------------------------------
  class ControlPanel extends Component {
    static template = xml`
      <div class="bg-white d-flex align-center border-bottom-gray space-between" style="height:50px;">
        <t t-slot="default"/>
      </div>`;
  }

  // -----------------------------------------------------------------------------
  // MARK: CharacterEditor
  // -----------------------------------------------------------------------------
  class CharacterEditor extends Component {
    static template = xml`
      <TopMenu>
        <span class="p-2" t-on-click="() => props.game.popScreen()">Back</span>
      </TopMenu>
      <h2 class="p-2"><t t-if="activeHero">Edit</t><t t-else="">Create</t> your Hero</h2>
      <div class="d-flex align-center mx-2 my-3">
        <div class="width-50px text-right">Name </div>
        <input class="mx-2 flex-grow" t-model="state.name" placeholder="Character name"/>
      </div>
      <div class="d-flex align-center mx-2 my-3">
        <div class="width-50px text-right">Class </div>
        <select class="mx-2 flex-grow" t-model="state.class">
          <option value="">Select a class</option>
          <option value="void_warden">Gardienne du Néant</option>
          <option value="red_guard">Garde Rouge</option>
        </select>
      </div>
      <div class="d-flex mx-2 my-3 space-between">
        <div class="d-flex align-center">
          <div class="width-50px text-right">Level </div>
          <select class="mx-2" t-model.number="state.level">
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
        <div class="d-flex align-center">
          <div class="width-50px text-right">XP </div>
          <input class="mx-2 width-50px" type="number" t-model.number="state.xp"/>
        </div>
        <div class="d-flex align-center">
          <div class="width-50px text-right">Gold </div>
          <input  class="mx-2 width-50px" type="number" t-model.number="state.gold"/>
        </div>
      </div>
      <div class="d-flex flex-end p-2">
        <div class="button p-2 m-2" t-on-click="create" t-att-class="{disabled: isDisabled}">
          <t t-if="activeHero">Update</t><t t-else="">Add</t> Hero
        </div>
      </div>
    `;
    static components = { TopMenu };

    setup() {
      this.activeHero = this.props.game.state;
      this.state = useState({
        name: this.activeHero ? this.activeHero.name : "",
        class: this.activeHero ? this.activeHero.class : "",
        level: this.activeHero ? this.activeHero.level : 1,
        gold: this.activeHero ? this.activeHero.gold : 0,
        xp: this.activeHero ? this.activeHero.xp : 0,
      });
    }

    get isDisabled() {
      return !(this.state.name && this.state.class);
    }

    create() {
      const maxHp = MAX_HP_MAP[this.state.class][this.state.level - 1];
      const hero = {
        name: this.state.name,
        class: this.state.class,
        level: this.state.level,
        hp: maxHp,
        maxHp: maxHp,
        xp: this.state.xp,
        maxCard: MAX_CARD_MAP[this.state.class],
        gold: this.state.gold,
      };
      if (this.activeHero) {
        Object.assign(this.activeHero, hero);
      } else {
        this.props.game.addHero({
          ...hero,
          status: {
            poisoned: false,
            wound: false,
            confusion: false,
            immobilisation: false,
            stunned: false,
            renforced: false,
          },
        });
      }
      this.props.game.popScreen();
    }
  }

  // -----------------------------------------------------------------------------
  // MARK: AddEnemyScreen
  // -----------------------------------------------------------------------------
  class AddEnemyScreen extends Component {
    static template = xml`
      <TopMenu>
        <span class="p-2" t-on-click="() => props.game.popScreen()">Back</span>
      </TopMenu>
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
    `;
    static components = { TopMenu };

    setup() {
      this.state = useState({
        type: "",
        nbr: 0,
        elite: false,
      });
      this.enemies = ENEMIES;
    }

    get isDisabled() {
      return !(this.state.name && this.state.class);
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
        status: {
          poisoned: false,
          wound: false,
          confusion: false,
          immobilisation: false,
          stunned: false,
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

  // -----------------------------------------------------------------------------
  // MARK: StartScreen
  // -----------------------------------------------------------------------------
  class StartScreen extends Component {
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
        <div class="me-2 button me-2" t-att-class="{disabled: !game.heroes.length }" t-on-click="start">Start Game</div>
      </ControlPanel>
      <t t-foreach="game.heroes" t-as="hero" t-key="hero.id">
        <CharacterSummary hero="hero" onClick="() => this.editChar(hero)"/>
      </t>
      <div t-if="!game.heroes.length" class="text-gray text-smaller" style="padding:24px;">
        Prepare your team of heroes, then start a game!
      </div>
    `;
    static components = { TopMenu, ControlPanel, CharacterSummary };

    editChar(hero) {
      this.props.game.pushScreen("CHAR_EDITOR", hero);
    }

    start() {
      this.props.game.pushScreen("MAIN");
    }
  }

  // -----------------------------------------------------------------------------
  // MARK: ConfigScreen
  // -----------------------------------------------------------------------------
  class ConfigScreen extends Component {
    static template = xml`
      <TopMenu>
        <span class="p-2" t-on-click="() => props.game.popScreen()">Back</span>
      </TopMenu>
      <div>
        <h2 class="p-2">Features</h2>
        <t t-set="config" t-value="props.game.config"/>
        <div class="d-grid align-center" style="grid-template-columns:50px 1fr;">
          <input type="checkbox" t-model="config.elements" id="track_element"/>
          <label for="track_element">Element Tracker</label>
          <input type="checkbox" t-model="config.tours" id="track_tours"/>
          <label for="track_tours">Tour Tracker</label>
          <input type="checkbox" t-model="config.battleGoals" id="track_battlegoals"/>
          <label for="track_battlegoals">Battle Goals</label>
          <input type="checkbox" t-model="config.attackModifiers" id="enemy_attack_modifiers"/>
          <label for="enemy_attack_modifiers">Enemy Attack Modifiers</label>
          <input type="checkbox" t-model="config.enemyActions" id="enemy_actions"/>
          <label for="enemy_actions">Enemy Actions</label>
        </div>
        <hr/>
        <h2 class="p-2 my-2">Game Data</h2>
        <div class="d-flex flex-column align-center">
            <div class="button p-2 mx-3 my-1 text-center" style="width:200px;" t-on-click="save">
                Save to local storage
            </div>
            <div class="button p-2 mx-3 my-1 text-center" style="width:200px;" t-on-click="restore">
                Restore from local storage
            </div>
        </div>

      </div>
    `;
    static components = { TopMenu };

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

  // -----------------------------------------------------------------------------
  // MARK: BattleGoalTracker
  // -----------------------------------------------------------------------------

  class BattleGoalTracker extends Component {
    static template = xml`
      <div class="${CARD} bg-white px-2 py-1 text-italic">
        <div class="d-flex space-between">
          <span>Select a battle goal for each hero!</span>
          <span class="text-bold text-primary text-larger" t-on-click="close">×</span>
        </div>
        <div class="d-flex">
          <t t-foreach="props.game.heroes" t-as="hero" t-key="hero.id">
            <t t-if="!props.game.battleGoals[hero.id]">
              <div class="button" t-on-click="() => this.selectGoal(hero)"><t t-esc="hero.name"/></div>
            </t>
          </t>
        </div>
      </div>`;

    selectGoal(hero) {
      // @todo implemenb battle goal selection screen
      console.log("selecting goal for hero", hero);
      this.props.game.battleGoals[hero.id] = true;
    }

    close() {
      this.props.game.config.battleGoals = false;
    }
  }

  // -----------------------------------------------------------------------------
  // MARK: MainScreen
  // -----------------------------------------------------------------------------
  class MainScreen extends Component {
    static template = xml`
      <t t-set="game" t-value="props.game"/>
      <t t-set="ui" t-value="props.ui"/>
      <TopMenu>
        <span class="mx-2"><t t-if="game.round">Round <t t-esc="game.round"/></t></span>
        <div class="m-3 text-bold text-larger" t-on-click="() => game.pushScreen('CONFIG')">⚙</div>
      </TopMenu>
      <ControlPanel>
        <div class="button ms-1" t-on-click="() => game.pushScreen('ADD_ENEMY')">Add Enemy</div>
        <div class="button ms-1" t-on-click="goToNextRound" t-att-class="{disabled: !game.isNextRoundEnabled() }">
          <t t-if="game.round">Next Round</t>
          <t t-else="">Start Scenario</t>
        </div>
        </ControlPanel>
      <t t-if="game.round">
        <ElementTracker t-if="game.config.elements" game="props.game" />
        <TurnTracker t-if="game.config.tours" game="props.game" />
      </t>
      <t t-if="game.config.battleGoals">
        <BattleGoalTracker game="game"/>
      </t>
      <t t-foreach="game.heroes" t-as="hero" t-key="hero.id">
        <CharacterCard hero="hero"/>
      </t>
      <t t-if="game.round">
        <t t-if="game.config.attackModifiers">
          <EnemyAttackModifiers game="game"/>
        </t>
        <t t-if="game.enemies.length and game.config.enemyActions">
          <EnemyActions game="game"/>
        </t>
      </t>
      <t t-foreach="game.enemies" t-as="enemy" t-key="enemy.id">
        <EnemyCard enemy="enemy" game="game"/>
      </t>
    `;
    static components = {
      TopMenu,
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

  // -----------------------------------------------------------------------------
  // MARK: APP
  // -----------------------------------------------------------------------------
  const SCREEN_MAP = {
    START: StartScreen,
    CONFIG: ConfigScreen,
    CHAR_EDITOR: CharacterEditor,
    MAIN: MainScreen,
    ADD_ENEMY: AddEnemyScreen,
  };

  class App extends Component {
    static template = xml`<t t-component="screen" game="game"/>`;

    setup() {
      this.game = useState(new GameState());

      preventSleep();
      // debug
      window.app = this;
    }

    get screen() {
      return SCREEN_MAP[this.game.screen];
    }
  }

  mount(App, document.body);
}

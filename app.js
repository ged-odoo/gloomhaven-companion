const { Component, mount, xml, useState } = owl;

function newGameState() {
    return {
        nextId: 1,
        heros: [],
        enemies: [],
        level: 1, // scenario level
        round: 0,
        fire: 0,
        ice: 0,
        air: 0,
        earth: 0,
        light: 0,
        darkness: 0,
        monsterActions: {},
    };
}

// -----------------------------------------------------------------------------
// MARK: Character Chard
// -----------------------------------------------------------------------------
class CharacterCard extends Component {
    static template = xml`
        <div class="m-1 border-radius-4 border-gray" style="background-color: #ebfceb;" t-on-click="toggleDisplay">
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
                <span>Status: <t t-esc="statuses"/> </span>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="p-1 d-flex space-between align-center border-top-gray">
                <div class="d-flex align-center p-1">
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.hero.hp--">-</span>
                    <span>HP</span>
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.hero.hp++">+</span>
                </div>
                <div class="d-flex align-center p-1">
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.hero.xp--">-</span>
                    <span>XP</span>
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.hero.xp++">+</span>
                </div>
                <div class="d-flex align-center p-1">
                    <span class="button m-1 p-2 px-3" t-on-click="decreaseGold">-</span>
                    <span>Gold</span>
                    <span class="button m-1 p-2 px-3" t-on-click="increaseGold">+</span>
                </div>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="p-1 d-flex space-between flex-wrap">
                <div 
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center" 
                    t-att-class="{'background-darker text-bold': hasStatus('poisoned')}"
                    t-on-click="() => this.toggleStatus('poisoned')"
                >
                    poison
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('wound')}"
                    t-on-click="() => this.toggleStatus('wound')"
                >
                    blessure
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('confusion')}"
                    t-on-click="() => this.toggleStatus('confusion')"
                >
                    confusion
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('immobilisation')}"
                    t-on-click="() => this.toggleStatus('immobilisation')"
                >
                    immobilisation
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('stunned')}"
                    t-on-click="() => this.toggleStatus('stunned')"
                >
                    étourdissement
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('renforced')}"
                    t-on-click="() => this.toggleStatus('renforced')"
                >
                    renforcement
                </div>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="p-1 d-flex flex-end">
                <span>Max card number: <t t-esc="props.hero.maxCard"/></span>
            </div>
        </div>
    `;

    setup() {
        this.state = useState({ fullDisplay: false });
    }

    get heroClass() {
        return CLASS_NAME[this.props.hero.class];
    }

    hasStatus(status) {
        return this.props.hero.status[status];
    }

    toggleStatus(status) {
        const statuses = this.props.hero.status;
        statuses[status] = !statuses[status];
    }

    get statuses() {
        if (this.props.hero.hp <= 0) {
            return "";
        }
        const statuses = this.props.hero.status;
        const keys = [];
        for (let k in statuses) {
            if (statuses[k]) {
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

    toggleDisplay() {
        this.state.fullDisplay = !this.state.fullDisplay;
    }

    increaseGold() {
        this.props.hero.gold += this.props.game.level;
    }
    decreaseGold() {
        this.props.hero.gold -= this.props.game.level;
    }

    remove() {}
}

// -----------------------------------------------------------------------------
// MARK: Enemy Chard
// -----------------------------------------------------------------------------
class EnemyCard extends Component {
    static template = xml`
        <div class="m-1 border-gray border-radius-4" t-attf-style="background-color:{{props.enemy.boss ? '#f3dcdc' : '#fff0f0'}}" t-on-click="toggleDisplay">
            <div class="d-flex space-between px-2 py-1">
                <span class="text-bold">
                    <span t-if="props.enemy.elite" style="font-variant: smallcaps;">Elite </span>
                    <t t-esc="props.enemy.name"/>
                    <t t-if="props.enemy.boss"> [BOSS]</t>
                    <t t-if="!props.enemy.boss and props.enemy.id"> [<t t-esc="props.enemy.id"/>]</t>
                </span>

            </div>
            <div class="d-flex space-between px-2 py-1">
                <span t-att-class="{'text-red': props.enemy.hp lt 1}">HP: <span class="text-bold" t-esc="props.enemy.hp"/> / <span class="text-bold" t-esc="props.enemy.maxHp"/></span>
                <span>Move: <span class="text-bold" t-esc="props.enemy.move"/></span>
                <span>Attack: <span class="text-bold" t-esc="props.enemy.attack"/></span>
            </div>
            <div class="px-2 py-1" t-if="props.enemy.boss">
                <span class="text-bold">Special 1</span> <span><t t-esc="props.enemy.special1"/></span>
            </div>
            <div class="px-2 py-1" t-if="props.enemy.boss">
                <span class="text-bold">Special 2</span> <span><t t-esc="props.enemy.special2"/></span>
            </div>
            
            <div class="d-flex space-between px-2 py-1" t-if="props.enemy.modifiers">
                <span>Modificateurs: <t t-esc="props.enemy.modifiers"/></span>
            </div>
            <div class="d-flex space-between px-2 py-1" t-if="props.enemy.immunities">
                <span>Immunités: <t t-esc="props.enemy.immunities"/></span>
            </div>
            <div class="d-flex space-between px-2 py-1" t-if="statuses">
                <span>Status: <t t-esc="statuses"/> </span>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="border-top-gray px-2 py-1 pt-2 d-flex space-between flex-wrap">
                <div class="p-1 m-1">
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.enemy.hp--">-</span>
                    <span>HP</span>
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.enemy.hp++">+</span>
                </div>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="px-2 py-1 d-flex space-between flex-wrap mt-2">
                <div 
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center" 
                    t-att-class="{'background-darker text-bold': hasStatus('poisoned')}"
                    t-on-click="() => this.toggleStatus('poisoned')"
                >
                    poison
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('wound')}"
                    t-on-click="() => this.toggleStatus('wound')"
                >
                    blessure
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('confusion')}"
                    t-on-click="() => this.toggleStatus('confusion')"
                >
                    confusion
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('immobilisation')}"
                    t-on-click="() => this.toggleStatus('immobilisation')"
                >
                    immobilisation
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('stunned')}"
                    t-on-click="() => this.toggleStatus('stunned')"
                >
                    étourdissement
                </div>
                <div
                    class="width-100 border-radius-2 height-35 d-flex flex-center align-center"
                    t-att-class="{'background-darker text-bold': hasStatus('renforced')}"
                    t-on-click="() => this.toggleStatus('renforced')"
                >
                    renforcement
                </div>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="px-2 py-1 d-flex space-between flex-wrap mt-2">
                <div>
                    <t t-if="!props.enemy.boss">
                    <span>Id </span>
                    <select t-model.number="props.enemy.id">
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
                    </t>
                </div>
                <div class="p-2 m-1">
                    <span class="button p-2" t-on-click="remove">Remove this enemy</span>
                </div>
            </div>
        </div>
    `;

    setup() {
        this.state = useState({ fullDisplay: false });
    }

    hasStatus(status) {
        return this.props.enemy.status[status];
    }

    toggleStatus(status) {
        const statuses = this.props.enemy.status;
        statuses[status] = !statuses[status];
    }

    get statuses() {
        const statuses = this.props.enemy.status;
        const keys = [];
        for (let k in statuses) {
            if (statuses[k]) {
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

    toggleDisplay() {
        this.state.fullDisplay = !this.state.fullDisplay;
    }

    remove() {
        const index = this.props.game.enemies.findIndex(
            (e) => e._id === this.props.enemy._id,
        );
        if (index >= 0) {
            this.props.game.enemies.splice(index, 1);
        }
    }
}

// -----------------------------------------------------------------------------
// MARK: EnemyActions
// -----------------------------------------------------------------------------

class EnemyActions extends Component {
    static template = xml`
        <div class="p-1">
            <div class="d-flex align-center flex-column">
                <t t-foreach="enemyTypes" t-as="type" t-key="type">
                    <t t-set="actions" t-value="enemyActions(type)"/>
                    <div class="enemy-action">
                        <div class="p-2 d-flex space-between" style="background-color: #eee;">
                            <span class="text-bold"><t t-esc="enemyName(type)"/></span>
                            <span class="text-smaller">deck: <t t-esc="actions.deck.length"/> cartes</span>
                        </div>
                        <div class="d-flex flex-end" t-if="actions.active === false">
                            <span class="button m-2 p-1" t-on-click="() => this.selectAction(type)">Choisir action</span>
                        </div>
                        <div t-if="actions.active" class="p-1" >
                            <t t-set="action" t-value="activeAction(type)"/>
                            <div>
                                <span class="text-bold"><t t-esc="action.initiative"/></span>
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
            </div>
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
// MARK: Character Builder
// -----------------------------------------------------------------------------

class CharacterBuilder extends Component {
    static template = xml`
        <div class="topmenu">
            <div class="mx-1" t-on-click="props.backToMainScreen">Back</div>
        </div>
        <h2 class="p-2">Create your hero</h2>
        <div class="d-flex align-center mx-2 my-3">
            <div class="width-50 text-right">Name </div>
            <input class="mx-2" t-model="state.name" placeholder="Character name"/>
        </div>
        <div class="d-flex align-center mx-2 my-3">
            <div class="width-50 text-right">Class </div>
            <select class="mx-2" t-model="state.class">
                <option value="">Select a class</option>
                <option value="void_warden">Guardienne du Néant</option>
                <option value="red_guard">Guarde Rouge</option>
            </select>
        </div>
        <div class="d-flex align-center mx-2 my-3">
            <div class="width-50 text-right">Level </div>
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
        <div class="d-flex align-center mx-2 my-3">
            <div class="width-50 text-right">XP </div>
            <input class="mx-2" type="number" t-model.number="state.xp"/>
        </div>
        <div class="d-flex align-center mx-2 my-3">
            <div class="width-50 text-right">Gold </div>
            <input  class="mx-2" type="number" t-model.number="state.gold"/>
        </div>
        <div class="d-flex flex-end p-1">
            <div class="button p-2 m-2" t-on-click="create" t-att-class="{disabled: isDisabled}">
                Add Hero
            </div>
        </div>
    `;

    setup() {
        this.state = useState({
            name: "",
            class: "",
            level: 1,
            gold: 0,
            xp: 0,
        });
    }

    get isDisabled() {
        return !(this.state.name && this.state.class);
    }

    create() {
        const maxHp = MAX_HP_MAP[this.state.class][this.state.level - 1];
        this.props.onCreate({
            name: this.state.name,
            class: this.state.class,
            level: this.state.level,
            hp: maxHp,
            maxHp: maxHp,
            xp: this.state.xp,
            maxCard: MAX_CARD_MAP[this.state.class],
            gold: this.state.gold,
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
}

// -----------------------------------------------------------------------------
// MARK: Enemy Builder
// -----------------------------------------------------------------------------

class EnemyBuilder extends Component {
    static template = xml`
        <div class="topmenu">
            <div class="mx-1" t-on-click="props.backToMainScreen">Back</div>
        </div>
        <h2 class="p-2">Add an enemy</h2>
        <div class="d-flex m-2 align-center">
            <div class="width-50 text-right">Type </div>
            <select class=" mx-2" t-model="state.type">
                <option value="">Select a type</option>
                <t t-foreach="enemies" t-as="enemy" t-key="enemy.id">
                    <option t-att-value="enemy.id"><t t-esc="enemy.name"/><t t-if="enemy.boss"> (BOSS)</t></option>
                </t>
            </select>
        </div>
        <div class="d-flex m-2 align-center" t-if="!isBoss()">
            <div class="width-50 text-right">Elite </div>
            <div><input type="checkbox" t-model="state.elite"/>
            </div>
        </div>
        <div class="d-flex m-2 align-center" t-if="!isBoss()">
            <div class="width-50 text-right">Id </div>
            <input class="mx-2" type="number" t-model.number="state.id"/>
        </div>
        <div class="d-flex flex-end">
            <div class="button p-2 m-1" t-on-click="create" t-att-class="{disabled: !state.type}">
                Add Enemy
            </div>
        </div>
    `;

    setup() {
        this.state = useState({
            type: "",
            id: 0,
            elite: false,
        });
        this.enemies = ENEMIES;
    }

    create() {
        const enemy = ENEMIES_MAP[this.state.type];
        const level = this.props.game.level;
        const A = this.props.game.heros.length;
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
            const moveArray = this.state.elite
                ? enemy.eliteMove
                : enemy.normalMove;
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

        this.props.onCreate({
            _id: this.props.game.nextId++,
            type: this.state.type,
            name: enemy.name,
            id: this.state.id,
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
        });
    }

    isBoss() {
        if (!this.state.type) {
            return false;
        }
        return !!ENEMIES_MAP[this.state.type].boss;
    }
}

// -----------------------------------------------------------------------------
// MARK: Element Tracker
// -----------------------------------------------------------------------------
class Scenario extends Component {
    static template = xml`
        <div t-att-class="{'border-bottom-gray': (!game.enemies.length and !game.heros.length)}">
            <div class="m-2 d-flex space-between align-center">
                <span class="text-bold">Round <t t-esc="game.round"/></span>
                <span class="button p-1" t-att-class="{disabled: !game.heros.length }" t-on-click="incrementRound">
                    <t t-if="game.round">Next round</t>
                    <t t-else="">Start</t>
                </span>
            </div>
            <div class="px-1 d-flex space-between" t-if="game.round">
                <div class="element-card" t-att-class="{'text-bold': game.fire > 1, 'text-gray': !game.fire}" t-on-click="() => this.updateElement('fire')">
                    Feu <t t-if="game.fire" t-esc="game.fire"/>
                </div>
                <div class="element-card" t-att-class="{'text-bold': game.ice > 1, 'text-gray': !game.ice}" t-on-click="() => this.updateElement('ice')">
                    Glace <t t-if="game.ice" t-esc="game.ice"/>
                </div>
                <div class="element-card" t-att-class="{'text-bold': game.air > 1, 'text-gray': !game.air}" t-on-click="() => this.updateElement('air')">
                    Air <t t-if="game.air" t-esc="game.air"/>
                </div>
            </div>
            <div class="p-1 d-flex space-between" t-if="game.round">
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
        </div>
    `;

    setup() {
        this.game = this.props.game;
    }

    incrementRound() {
        this.game.round++;
        for (let elem of ["fire", "ice", "air", "earth", "light", "darkness"]) {
            if (this.game[elem] > 0) {
                this.game[elem]--;
            }
        }
        // reset all monster actions
        for (let type in this.game.monsterActions) {
            this.game.monsterActions[type].active = false;
            let shouldShuffle = false;
            for (let actionId of this.game.monsterActions[type].discardPile) {
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
                this.game.monsterActions[type].deck = deck;
                this.game.monsterActions[type].discardPile = [];
            }
        }
    }

    updateElement(elem) {
        this.game[elem] = this.game[elem] - 1;
        if (this.game[elem] < 0) {
            this.game[elem] = 2;
        }
    }
}

// -----------------------------------------------------------------------------
// MARK: Main Menu
// -----------------------------------------------------------------------------

class MainMenu extends Component {
    static template = xml`
        <div class="topmenu">
            <div class="mx-1" t-on-click="props.backToMainScreen">Back</div>
        </div>
        <h2 class="p-2">Configuration</h2>
        <div class="p-2 d-flex space-between align-center">
            <div>Scenario Level </div>
            <div>
                <span class="button m-1 p-1 px-2" t-on-click="()=>props.game.level--">-</span>
                <input type="number" class="width-50" t-model.number="props.game.level"/>
                <span class="button m-1 p-1 px-2" t-on-click="()=>props.game.level++">+</span>
            </div>
        </div>
        <div class="d-flex ">
            <div class="button p-2 m-1" t-on-click="save">
                Save to local storage
            </div>
        </div>
        <div class="d-flex " >
            <div class="button p-2 m-1" t-on-click="restore">
                Restore from local storage
            </div>
        </div>
        <div class="d-flex">
            <div class="button p-2 m-1" t-on-click="reset">
                Reset Game
            </div>
        </div>
    `;

    reset() {
        if (confirm("Are you sure that you want to reset the game?")) {
            Object.assign(this.props.game, newGameState());
            this.props.backToMainScreen();
        }
    }

    save() {
        const state = JSON.stringify(this.props.game);
        localStorage.setItem("game_state", state);
        this.props.backToMainScreen();
        alert("Game saved!");
    }

    restore() {
        const dataStr = localStorage.getItem("game_state");
        if (!dataStr) {
            return;
        }
        const data = JSON.parse(dataStr);
        Object.assign(this.props.game, data);
        this.props.backToMainScreen();
    }
}

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
}

// -----------------------------------------------------------------------------
// MARK: MAIN APP
// -----------------------------------------------------------------------------
class App extends Component {
    static template = xml`
        <div class="gloomhaven-companion">
            <t t-if="state.screen==='MAIN'">
                <div class="topmenu">
                    <div class="mx-1" t-on-click="() => this.state.screen='MENU'">Menu</div>
                    <div class="d-flex">
                        <div class="me-2" t-on-click="addHero" t-if="!game.round">Add Hero</div>
                        <div class="mx-1" t-on-click="addEnemy">Add Enemy</div>
                    </div>
                </div>
                <Scenario game="game"/>
                <t t-if="game.round and game.enemies.length">
                    <EnemyActions game="game"/>
                </t>
                <t t-foreach="game.heros" t-as="hero" t-key="hero_index">
                    <CharacterCard hero="hero" game="game"/>
                </t>
                <t t-foreach="game.enemies" t-as="enemy" t-key="enemy._id">
                    <EnemyCard enemy="enemy" game="game"/>
                </t>
                <t t-if="!game.heros.length and !game.enemies.length">
                    <div class="nocontent">
                        Add heros and/or monsters, then start the game
                    </div>
                </t>
            </t>
            <t t-if="state.screen==='MENU'">
                <MainMenu game="game" backToMainScreen.bind="backToMainScreen"/>
            </t>
            <t t-if="state.screen==='ADD_HERO'">
                <CharacterBuilder onCreate.bind="createHero" backToMainScreen.bind="backToMainScreen"/>
            </t>
            <t t-if="state.screen==='ADD_ENEMY'">
                <EnemyBuilder game="game" onCreate.bind="createEnemy" backToMainScreen.bind="backToMainScreen"/>
            </t>
        </div>`;
    static components = {
        CharacterBuilder,
        EnemyBuilder,
        EnemyCard,
        EnemyActions,
        CharacterCard,
        Scenario,
        MainMenu,
    };

    setup() {
        this.state = useState({
            screen: "MAIN",
        });
        this.game = useState(newGameState());

        // debug
        window.app = this;
    }

    addHero() {
        this.state.screen = "ADD_HERO";
    }
    createHero(hero) {
        this.game.heros.push(hero);
        this.state.screen = "MAIN";
    }

    createEnemy(enemy) {
        console.log("add enemy", enemy);
        this.game.enemies.push(enemy);
        this.state.screen = "MAIN";
    }

    backToMainScreen() {
        this.state.screen = "MAIN";
    }

    addEnemy(enemy) {
        this.state.screen = "ADD_ENEMY";
    }
}

mount(App, document.body);

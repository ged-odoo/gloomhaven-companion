const { Component, mount, xml, useState } = owl;

// -----------------------------------------------------------------------------
// MARK: Data
// -----------------------------------------------------------------------------

const CLASS_NAME = {
    void_warden: "Guardienne du Néant",
    red_guard: "Guarde Rouge",
};

const MAX_HP_MAP = {
    void_warden: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    red_guard: [10, 12, 14, 16, 18, 20, 22, 24, 26],
};

const MAX_CARD_MAP = {
    void_warden: 11,
    red_guard: 10,
};

function newGameState() {
    return {
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
    };
}

// -----------------------------------------------------------------------------
// MARK: Character Chard
// -----------------------------------------------------------------------------
class CharacterCard extends Component {
    static template = xml`
        <div class="card" t-on-click="toggleDisplay">
            <div class="card-row d-flex space-between p-1">
                <span class="text-bold"><t t-esc="props.hero.name"/></span>
                <span><t t-esc="heroClass"/> (level <t t-esc="props.hero.level"/>)</span>
            </div>
            <div class="card-row d-flex space-between p-1">
                <span>HP: <t t-esc="props.hero.hp"/> / <t t-esc="props.hero.maxHp"/></span>
                <span>XP: <t t-esc="props.hero.xp"/></span>
                <span>Gold: <t t-esc="props.hero.gold"/></span>
            </div>
            <div class="card-row d-flex space-between p-1">
                <span>Status: none</span>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="">
                <div class="card-row p-1">
                    Max card number: <t t-esc="props.hero.maxCard"/>
                </div>
                <div class="card-row p-1">
                    <span class="button m-1 p-1 px-2" t-on-click="()=>props.hero.hp--">-</span>
                    <span>HP: <t t-esc="props.hero.hp"/></span>
                    <span class="button m-1 p-1 px-2" t-on-click="()=>props.hero.hp++">-</span>
                </div>
            </div>
        </div>
    `;

    setup() {
        this.state = useState({ fullDisplay: false });
    }

    get heroClass() {
        return CLASS_NAME[this.props.hero.class];
    }

    toggleDisplay() {
        this.state.fullDisplay = !this.state.fullDisplay;
    }
}

// name: this.state.name,
// class: this.state.class,
// level: this.state.level,
// hp: maxHp,
// maxHp: maxHp,
// xp: this.state.xp,
// maxCard: MAX_CARD_MAP[this.state.class],
// gold: this.state.gold,

// -----------------------------------------------------------------------------
// MARK: Character Builder
// -----------------------------------------------------------------------------

class CharacterBuilder extends Component {
    static template = xml`
        <div class="topmenu">
            <div t-on-click="props.backToMainScreen">Back</div>
        </div>
        <h2>Create your hero</h2>
        <div class="formcontrol">
            <div>Name </div>
            <div><input t-model="state.name" placeholder="Character name"/>
            </div>
        </div>
        <div class="formcontrol">
            <div>Class </div>
            <div>
                <select t-model="state.class">
                    <option value="">Select a class</option>
                    <option value="void_warden">Guardienne du Néant</option>
                    <option value="red_guard">Guarde Rouge</option>
                </select>
            </div>
        </div>
        <div class="formcontrol">
            <div>Level </div>
            <select t-model.number="state.level">
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
        <div class="formcontrol">
            <div>XP </div>
            <div><input type="number" t-model.number="state.xp"/>
            </div>
        </div>
        <div class="formcontrol">
            <div>Gold </div>
            <div><input type="number" t-model.number="state.gold"/>
            </div>
        </div>
        <div class="d-flex flex-end">
            <div class="button p-2 m-1" t-on-click="create" t-att-class="{disabled: isDisabled}">
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
        });
    }
}

// -----------------------------------------------------------------------------
// MARK: Element Tracker
// -----------------------------------------------------------------------------
class Scenario extends Component {
    static template = xml`
        <div class="card">
            <div class="card-row p-1 d-flex space-between">
                <span class="text-bold">Round <t t-esc="game.round"/></span>
                <span class="button p-1" t-on-click="incrementRound">Next round </span>
            </div>
            <div class="card-row px-1 d-flex space-between">
                <div class="element-card" t-att-class="{'text-bold': game.fire > 0}" t-on-click="() => this.updateElement('fire')">
                    Feu <t t-esc="game.fire"/>
                </div>
                <div class="element-card" t-att-class="{'text-bold': game.ice > 0}" t-on-click="() => this.updateElement('ice')">
                    Glace <t t-esc="game.ice"/>
                </div>
                <div class="element-card" t-att-class="{'text-bold': game.air > 0}" t-on-click="() => this.updateElement('air')">
                    Air <t t-esc="game.air"/>
                </div>
            </div>
            <div class="card-row px-1 d-flex space-between">
                <div class="element-card" t-att-class="{'text-bold': game.earth > 0}" t-on-click="() => this.updateElement('earth')">
                    Terre <t t-esc="game.earth"/>
                </div>
                <div class="element-card" t-att-class="{'text-bold': game.light > 0}" t-on-click="() => this.updateElement('light')">
                    Lumière <t t-esc="game.light"/>
                </div>
                <div class="element-card" t-att-class="{'text-bold': game.darkness > 0}" t-on-click="() => this.updateElement('darkness')">
                    Obscurité <t t-esc="game.darkness"/>
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
            <div t-on-click="props.backToMainScreen">Back</div>
        </div>
        <h2>Configuration</h2>
        <div class="formcontrol d-flex space-between">
            <div>Scenario Level </div>
            <div>
                <span class="button m-1 p-1 px-2" t-on-click="()=>props.game.level--">-</span>
                <input type="number" class="width-50" t-model.number="props.game.level"/>
                <span class="button m-1 p-1 px-2" t-on-click="()=>props.game.level++">+</span>
            </div>
        </div>
        <div class="d-flex">
            <div class="button p-2 m-1" >
                Save to local storage [not done yet]
            </div>
        </div>
        <div class="d-flex" >
            <div class="button p-2 m-1" >
                Restore from local storage [not done yet]
            </div>
        </div>
        <div class="d-flex">
            <div class="button p-2 m-1" t-on-click="reset">
                Reset Game
            </div>
        </div>
    `;

    reset() {
        Object.assign(this.props.game, newGameState());
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
                    <div class="" t-on-click="() => this.state.screen='MENU'">Menu</div>
                    <div class="d-flex">
                        <div class="me-2" t-on-click="addHero">Add Hero</div>
                        <div class="mx-1" t-on-click="addEnemy">Add Enemy</div>
                    </div>
                </div>
                <Scenario game="game"/>
                <t t-foreach="game.heros" t-as="hero" t-key="hero_index">
                    <CharacterCard hero="hero"/>
                </t>
                <t t-if="!game.heros.length and !game.enemies.length">
                    <div class="nocontent">
                        Add hero and/or monster
                    </div>
                </t>
            </t>
            <t t-if="state.screen==='MENU'">
                <MainMenu game="game" backToMainScreen.bind="backToMainScreen"/>
            </t>
            <t t-if="state.screen==='ADD_HERO'">
                <CharacterBuilder onCreate.bind="createHero" backToMainScreen.bind="backToMainScreen"/>
            </t>
        </div>`;
    static components = { CharacterBuilder, CharacterCard, Scenario, MainMenu };

    setup() {
        this.state = useState({
            screen: "MAIN",
        });
        this.game = useState(newGameState());
    }

    addHero() {
        this.state.screen = "ADD_HERO";
    }
    createHero(hero) {
        this.game.heros.push(hero);
        this.state.screen = "MAIN";
    }

    backToMainScreen() {
        this.state.screen = "MAIN";
    }

    addEnemy() {
        console.log("add enemy");
    }
}

mount(App, document.body);

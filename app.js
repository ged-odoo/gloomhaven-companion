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

const ENEMIES = [
    {
        id: "reanimated_corpse",
        name: "Cadavre Réanimé",
        normalHp: [5, 7, 9, 10, 11, 13, 14, 16],
        eliteHp: [10, 11, 14, 14, 16, 18, 23, 29],
        normalMove: [1, 1, 1, 1, 2, 2, 2, 2],
        eliteMove: [1, 1, 1, 2, 2, 2, 2, 2],
        normalAttack: [3, 3, 3, 4, 4, 4, 4, 5],
        eliteAttack: [3, 4, 4, 5, 5, 6, 6, 6],
        normalModifiers: [
            "",
            "",
            "",
            "",
            "",
            "",
            "empoisonnement",
            "empoisonnement",
        ],
        eliteModifiers: [
            "",
            "",
            "",
            "",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "Empoisonnement",
        ],
    },
    {
        id: "chaos_demon",
        name: "Démon du Chaos",
        normalHp: [7, 8, 11, 12, 15, 16, 20, 22],
        eliteHp: [10, 12, 14, 18, 21, 26, 30, 35],
        normalMove: [3, 3, 3, 3, 4, 4, 4, 4],
        eliteMove: [4, 4, 4, 5, 5, 5, 5, 5],
        normalAttack: [2, 3, 3, 4, 4, 5, 5, 6],
        eliteAttack: [3, 4, 5, 5, 6, 6, 7, 8],
        normalModifiers: [
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
        ],
        eliteModifiers: [
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
        ],
    },
    {
        id: "blood_demon",
        name: "Diablotin de Sang",
        normalHp: [3, 4, 5, 5, 7, 8, 9, 12],
        eliteHp: [4, 6, 7, 10, 11, 13, 17, 21],
        normalMove: [2, 2, 3, 3, 3, 4, 4, 4],
        eliteMove: [2, 2, 3, 3, 3, 4, 4, 4],
        normalAttack: [1, 1, 1, 2, 2, 2, 3, 3],
        eliteAttack: [2, 2, 2, 2, 3, 3, 4, 4],
        normalModifiers: [
            "",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
        ],
        eliteModifiers: [
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
            "confusion",
        ],
    },
    {
        id: "black_imp",
        name: "Diablotin Noir",
        normalHp: [3, 4, 5, 5, 7, 9, 10, 13],
        eliteHp: [4, 6, 8, 8, 11, 14, 15, 19],
        normalMove: [1, 1, 1, 1, 1, 1, 1, 1],
        eliteMove: [1, 1, 1, 1, 1, 1, 1, 1],
        normalAttack: [1, 1, 1, 2, 2, 2, 3, 3],
        eliteAttack: [2, 2, 2, 3, 3, 3, 4, 4],
        normalModifiers: [
            "",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
        ],
        eliteModifiers: [
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement, attaquants gagnent désavantage",
            "empoisonnement, attaquants gagnent désavantage",
            "empoisonnement, attaquants gagnent désavantage",
            "empoisonnement, attaquants gagnent désavantage",
            "empoisonnement, attaquants gagnent désavantage",
        ],
    },
    {
        id: "vermling_scout",
        name: "Éclaireur Vermling",
        normalHp: [2, 3, 3, 5, 6, 8, 10, 13],
        eliteHp: [4, 5, 5, 7, 8, 11, 13, 17],
        normalMove: [3, 3, 3, 3, 3, 3, 4, 4],
        eliteMove: [3, 3, 4, 4, 4, 4, 5, 5],
        normalAttack: [1, 1, 2, 2, 3, 3, 3, 3],
        eliteAttack: [2, 2, 3, 3, 4, 4, 4, 4],
        normalModifiers: ["", "", "", "", "", "", "", ""],
        eliteModifiers: ["", "", "", "", "", "", "", ""],
    },
    {
        id: "reanimated_spirit",
        name: "Esprit Réanimé",
        normalHp: [3, 4, 5, 6, 6, 8, 9, 12],
        eliteHp: [5, 5, 7, 8, 8, 11, 13, 17],
        normalMove: [2, 2, 3, 3, 3, 3, 3, 3],
        eliteMove: [3, 3, 4, 4, 4, 4, 4, 4],
        normalAttack: [2, 2, 2, 3, 3, 3, 4, 4],
        eliteAttack: [3, 3, 3, 4, 4, 4, 5, 5],
        normalModifiers: [
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 2",
            "Bouclier 2",
            "Bouclier 2",
            "Bouclier 2",
        ],
        eliteModifiers: [
            "Bouclier 1",
            "Bouclier 2",
            "Bouclier 2",
            "Bouclier 2",
            "Bouclier 3",
            "Bouclier 3",
            "Bouclier 3",
            "Bouclier 3",
        ],
    },
    {
        id: "stone_golem",
        name: "Golem de Pierre",
        normalHp: [10, 10, 11, 11, 12, 13, 16, 16],
        eliteHp: [10, 11, 13, 14, 16, 18, 20, 21],
        normalMove: [1, 1, 1, 1, 2, 2, 2, 2],
        eliteMove: [2, 2, 2, 2, 2, 3, 3, 3],
        normalAttack: [3, 3, 4, 4, 4, 5, 5, 5],
        eliteAttack: [4, 4, 5, 5, 6, 6, 7, 7],
        normalModifiers: [
            "",
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 2",
            "Bouclier 2",
            "Bouclier 2",
            "Bouclier 2",
            "Bouclier 3",
        ],
        eliteModifiers: [
            "Bouclier 1",
            "Bouclier 2",
            "Bouclier 2",
            "Bouclier 3",
            "Bouclier 3",
            "Bouclier 3",
            "Bouclier 3",
            "Bouclier 4",
        ],
    },
    {
        id: "blood_monster",
        name: "Monstruosité de Sang",
        normalHp: [7, 9, 10, 12, 12, 13, 17, 20],
        eliteHp: [12, 12, 15, 18, 18, 20, 23, 23],
        normalMove: [2, 2, 2, 3, 3, 3, 3, 3],
        eliteMove: [2, 2, 2, 3, 3, 3, 3, 3],
        normalAttack: [2, 2, 3, 3, 3, 4, 4, 5],
        eliteAttack: [3, 3, 4, 4, 4, 5, 6, 6],
        normalModifiers: [
            "à sa mort, tous les personnages adjacents subissent 1 dégats",
            "à sa mort, tous les personnages adjacents subissent 2 dégats",
            "à sa mort, tous les personnages adjacents subissent 2 dégats",
            "à sa mort, tous les personnages adjacents subissent 3 dégats",
            "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
            "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
            "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
            "à sa mort, tous les personnages adjacents subissent 4 dégats, Bouclier 1",
        ],
        eliteModifiers: [
            "à sa mort, tous les personnages adjacents subissent 1 dégats",
            "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
            "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
            "à sa mort, tous les personnages adjacents subissent 4 dégats, Bouclier 1",
            "à sa mort, tous les personnages adjacents subissent 4 dégats, Bouclier 2",
            "à sa mort, tous les personnages adjacents subissent 5 dégats, Bouclier 2",
            "à sa mort, tous les personnages adjacents subissent 5 dégats, Bouclier 2",
            "à sa mort, tous les personnages adjacents subissent 5 dégats, Bouclier 3",
        ],
    },
    {
        id: "rat_monster",
        name: "Monstruosité ratine",
        normalHp: [4, 4, 5, 6, 8, 10, 12, 12],
        eliteHp: [6, 7, 8, 10, 12, 13, 14, 16],
        normalMove: [1, 1, 2, 2, 2, 3, 3, 3],
        eliteMove: [1, 1, 1, 2, 2, 2, 3, 3],
        normalAttack: [1, 2, 2, 3, 3, 3, 3, 4],
        eliteAttack: [2, 2, 3, 3, 3, 4, 4, 5],
        normalModifiers: [
            "à sa mort, tous les personnages adjacents subissent 1 dégats",
            "à sa mort, tous les personnages adjacents subissent 1 dégats",
            "à sa mort, tous les personnages adjacents subissent 1 dégats",
            "à sa mort, tous les personnages adjacents subissent 2 dégats",
            "à sa mort, tous les personnages adjacents subissent 2 dégats",
            "à sa mort, tous les personnages adjacents subissent 2 dégats",
            "à sa mort, tous les personnages adjacents subissent 3 dégats",
            "à sa mort, tous les personnages adjacents subissent 3 dégats",
        ],
        eliteModifiers: [
            "à sa mort, tous les personnages adjacents subissent 1 dégats",
            "à sa mort, tous les personnages adjacents subissent 2 dégats, avantage",
            "à sa mort, tous les personnages adjacents subissent 2 dégats, avantage",
            "à sa mort, tous les personnages adjacents subissent 2 dégats, avantage",
            "à sa mort, tous les personnages adjacents subissent 3 dégats, avantage",
            "à sa mort, tous les personnages adjacents subissent 3 dégats, avantage",
            "à sa mort, tous les personnages adjacents subissent 3 dégats, avantage",
            "à sa mort, tous les personnages adjacents subissent 4 dégats, avantage",
        ],
    },
    {
        id: "vermling_bandit",
        name: "Pillard Vermling",
        normalHp: [4, 5, 9, 11, 12, 15, 17, 19],
        eliteHp: [8, 10, 14, 16, 19, 23, 27, 31],
        normalMove: [1, 1, 2, 3, 3, 3, 4, 4],
        eliteMove: [1, 1, 3, 3, 4, 4, 4, 4],
        normalAttack: [2, 2, 2, 2, 3, 3, 3, 4],
        eliteAttack: [2, 2, 3, 4, 4, 4, 5, 6],
        normalModifiers: ["", "", "", "", "", "", "", ""],
        eliteModifiers: ["", "", "", "", "", "", "", ""],
    },
    {
        id: "black_vase",
        name: "Vase noire",
        normalHp: [4, 5, 7, 8, 9, 10, 12, 16],
        eliteHp: [8, 9, 11, 11, 13, 15, 16, 18],
        normalMove: [1, 1, 1, 1, 2, 2, 2, 2],
        eliteMove: [1, 1, 1, 2, 2, 3, 3, 3],
        normalAttack: [2, 2, 2, 3, 3, 3, 4, 4],
        eliteAttack: [2, 2, 3, 3, 4, 4, 4, 5],
        normalModifiers: [
            "",
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 1, empoisonnement",
            "Bouclier 1, empoisonnement",
        ],
        eliteModifiers: [
            "",
            "Bouclier 1",
            "Bouclier 1",
            "Bouclier 1, empoisonnement",
            "Bouclier 1, empoisonnement",
            "Bouclier 1, empoisonnement",
            "Bouclier 2, empoisonnement",
            "Bouclier 2, empoisonnement",
        ],
    },
    {
        id: "giant_viper",
        name: "Vipère géante",
        normalHp: [2, 3, 4, 4, 6, 7, 8, 10],
        eliteHp: [3, 5, 7, 8, 11, 13, 14, 18],
        normalMove: [2, 2, 3, 3, 3, 3, 4, 4],
        eliteMove: [2, 2, 3, 3, 3, 4, 4, 4],
        normalAttack: [1, 1, 1, 2, 2, 3, 3, 3],
        eliteAttack: [2, 2, 2, 3, 3, 3, 4, 4],
        normalModifiers: [
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
        ],
        eliteModifiers: [
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
            "empoisonnement",
        ],
    },
    {
        id: "zealot",
        name: "Zélote",
        normalHp: [4, 6, 7, 8, 10, 12, 14, 16],
        eliteHp: [7, 8, 11, 13, 17, 18, 22, 26],
        normalMove: [2, 2, 3, 3, 3, 4, 4, 4],
        eliteMove: [2, 2, 3, 3, 3, 4, 4, 4],
        normalAttack: [2, 2, 3, 3, 3, 3, 4, 5],
        eliteAttack: [3, 3, 3, 4, 4, 5, 6, 7],
        normalModifiers: [
            "",
            "",
            "",
            "blessure",
            "blessure",
            "blessure",
            "blessure",
            "blessure",
        ],
        eliteModifiers: [
            "",
            "blessure",
            "blessure",
            "blessure",
            "blessure",
            "blessure",
            "blessure",
            "blessure",
        ],
    },
];

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
        <div class="card" style="background-color: #ebfceb;" t-on-click="toggleDisplay">
            <div class="card-row d-flex space-between p-1">
                <span class="text-bold"><t t-esc="props.hero.name"/></span>
                <span><t t-esc="heroClass"/> (level <t t-esc="props.hero.level"/>)</span>
            </div>
            <div class="card-row d-flex space-between p-1">
                <span t-att-class="{'text-red': props.hero.hp lt 1}">HP: <t t-esc="props.hero.hp"/> / <t t-esc="props.hero.maxHp"/></span>
                <span>XP: <t t-esc="props.hero.xp"/></span>
                <span>Gold: <t t-esc="props.hero.gold"/></span>
            </div>
            <div class="card-row d-flex space-between p-1" t-if="statuses">
                <span>Status: <t t-esc="statuses"/> </span>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="form-advanced p-1 d-flex space-between flex-wrap border-top-gray">
                <div class="card-row p-1 m-1">
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.hero.hp--">-</span>
                    <span>HP: <t t-esc="props.hero.hp"/></span>
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.hero.hp++">+</span>
                </div>
                <div class="card-row p-1 m-1">
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.hero.xp--">-</span>
                    <span>XP: <t t-esc="props.hero.xp"/></span>
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.hero.xp++">+</span>
                </div>
                <div class="card-row p-1 m-1">
                    <span class="button m-1 p-2 px-3" t-on-click="decreaseGold">-</span>
                    <span>Gold: <t t-esc="props.hero.gold"/></span>
                    <span class="button m-1 p-2 px-3" t-on-click="increaseGold">+</span>
                </div>
            <!-- <div> -->
                <span>Max card number: <t t-esc="props.hero.maxCard"/></span>
            <!-- </div> -->
                <!-- <div class="card-row p-1 d-flex space-between">
                </div> -->
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="p-1 d-flex space-between flex-wrap mt-2">
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
        <div class="card" style="background-color:#fff0f0" t-on-click="toggleDisplay">
            <div class="card-row d-flex space-between p-1">
                <span class="text-bold">
                    <t t-if="props.enemy.elite">Elite </t>
                    <t t-esc="props.enemy.name"/>[<t t-esc="props.enemy.id"/>]
                </span>
                <span t-att-class="{'text-red': props.enemy.hp lt 1}">HP: <t t-esc="props.enemy.hp"/> / <t t-esc="props.enemy.maxHp"/></span>

            </div>
            <div class="card-row d-flex space-between p-1">
                <span>Move: <t t-esc="props.enemy.move"/></span>
                <span>Attack: <t t-esc="props.enemy.attack"/></span>
            </div>
            <div class="card-row d-flex space-between p-1" t-if="props.enemy.modifiers">
                <span>Modificateurs: <t t-esc="props.enemy.modifiers"/></span>
            </div>
            <div class="card-row d-flex space-between p-1" t-if="statuses">
                <span>Status: <t t-esc="statuses"/> </span>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="border-top-gray p-1 d-flex space-between flex-wrap mt-2">
                <div class="card-row p-1 m-1">
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.enemy.hp--">-</span>
                    <span>HP: <t t-esc="props.enemy.hp"/></span>
                    <span class="button m-1 p-2 px-3" t-on-click="()=>props.enemy.hp++">+</span>
                </div>
            </div>
            <div t-if="state.fullDisplay" t-on-click.stop="" class="p-1 d-flex space-between flex-wrap mt-2">
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
            <div t-if="state.fullDisplay" t-on-click.stop="" class="p-1 d-flex space-between flex-wrap mt-2">
                <div class="card-row p-1 m-1">
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

let nextId = 1;

class EnemyBuilder extends Component {
    static template = xml`
        <div class="topmenu">
            <div t-on-click="props.backToMainScreen">Back</div>
        </div>
        <h2>Create an enemy</h2>
        <div class="formcontrol">
            <div>Type </div>
            <select t-model="state.type">
                <option value="">Select a type</option>
                <t t-foreach="enemies" t-as="enemy" t-key="enemy.id">
                    <option t-att-value="enemy.id"><t t-esc="enemy.name"/></option>
                </t>
            </select>
        </div>
        <div class="formcontrol">
            <div>Id </div>
            <div><input type="number" t-model.number="state.id"/>
            </div>
        </div>
        <div class="formcontrol">
            <div>Elite </div>
            <div><input type="checkbox" t-model="state.elite"/>
            </div>
        </div>
        <div class="d-flex flex-end">
            <div class="button p-2 m-1" t-on-click="create" t-att-class="{disabled: isDisabled}">
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

    get isDisabled() {
        return !(this.state.type && this.state.id);
    }

    create() {
        const enemy = ENEMIES.find((e) => e.id === this.state.type);
        const level = this.props.game.level;
        const hpArray = this.state.elite ? enemy.eliteHp : enemy.normalHp;
        const moveArray = this.state.elite ? enemy.eliteMove : enemy.normalMove;
        const attackArray = this.state.elite
            ? enemy.eliteAttack
            : enemy.normalAttack;
        const modifiersArray = this.state.elite
            ? enemy.eliteModifiers
            : enemy.normalModifiers;
        const maxHp = hpArray[level];
        this.props.onCreate({
            _id: nextId++,
            type: this.state.type,
            name: enemy.name,
            id: this.state.id,
            elite: this.state.elite,
            hp: maxHp,
            maxHp: maxHp,
            move: moveArray[level],
            attack: attackArray[level],
            modifiers: modifiersArray[level],
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
// MARK: Element Tracker
// -----------------------------------------------------------------------------
class Scenario extends Component {
    static template = xml`
        <div class="card">
            <div class="card-row p-1 d-flex space-between">
                <span class="text-bold">Round <t t-esc="game.round"/></span>
                <span class="button p-1" t-on-click="incrementRound">
                    <t t-if="game.round">Next round</t>
                    <t t-else="">Start</t>
                </span>
            </div>
            <div class="card-row px-1 d-flex space-between" t-if="game.round">
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
            <div class="card-row px-1 d-flex space-between" t-if="game.round">
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
                    <div class="mx-1" t-on-click="() => this.state.screen='MENU'">Menu</div>
                    <div class="d-flex">
                        <div class="me-2" t-on-click="addHero" t-if="!game.round">Add Hero</div>
                        <div class="mx-1" t-on-click="addEnemy">Add Enemy</div>
                    </div>
                </div>
                <Scenario game="game"/>
                <t t-foreach="game.heros" t-as="hero" t-key="hero_index">
                    <CharacterCard hero="hero" game="game"/>
                </t>
                <t t-foreach="game.enemies" t-as="enemy" t-key="enemy._id">
                    <EnemyCard enemy="enemy" game="game"/>
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
            <t t-if="state.screen==='ADD_ENEMY'">
                <EnemyBuilder game="game" onCreate.bind="createEnemy" backToMainScreen.bind="backToMainScreen"/>
            </t>
        </div>`;
    static components = {
        CharacterBuilder,
        EnemyBuilder,
        EnemyCard,
        CharacterCard,
        Scenario,
        MainMenu,
    };

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

import { Component, useState, xml } from "@odoo/owl";
import { TopMenu } from "../shared/top_menu";
import { MAX_CARD_MAP, MAX_HP_MAP } from "../data";

export class CharacterEditor extends Component {
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
      xp: this.state.xp || 0,
      maxCard: MAX_CARD_MAP[this.state.class],
      gold: this.state.gold || 0,
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
          disarmed: false,
          renforced: false,
        },
      });
    }
    this.props.game.popScreen();
  }
}

import { Component, xml, useState } from "@odoo/owl";
import { StatusEditor, statusString } from "./status_editor";
import { Counter } from "./counter";
import { CLASS_NAME } from "../data";
import { CARD } from "./style";

export class CharacterCard extends Component {
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
            <StatusEditor status="props.hero.status" isActive="props.hero.id === props.game.activeEntity" />
          </div>
        </div>`;
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

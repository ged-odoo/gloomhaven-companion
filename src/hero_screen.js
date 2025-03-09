import { Component, xml } from "@odoo/owl";
import { useGame } from "./game";
import { FieldChar, FieldSelect, TwoColForm } from "./field_components";
import { PERKS } from "./data";

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

class Content extends Component {
  static props = ["hero"];
  static template = xml`
        <FieldChar name="'name'" record="props.hero" labelWidth="'120px'" readonly="!!props.hero.name" editable="true"/>
        <TwoColForm label="'Class'" value="props.hero.className" labelWidth="'120px'"/>
        <FieldSelect name="'level'" record="props.hero" labelWidth="'120px'" readonly="true" editable="true"/>
        <TwoColForm label="'Max HP'" value="props.hero.maxHp" labelWidth="'120px'"/>
        <hr/>
        <h2 class="m-1 ms-2 text-primary">Perks</h2>
        <div class="bg-white border-radius-4 border-gray m-1 p-1">

        <t t-foreach="perks" t-as="perk" t-key="perk.id">
          <div class="pt-1 pb-2 px-1" t-on-click="() => this.togglePerk(perk)">
            <t t-foreach="new Array(perk.arity)" t-as="i" t-key="i_index">
              <input style="vertical-align:middle; height:14px;" type="checkbox" t-att-checked="props.hero.perks.isActive(perk.id, i_index)"/>
            </t>
            <t t-esc="perk.text"/>
          </div>
        </t>
        </div>
    `;
  static components = { FieldChar, FieldSelect, TwoColForm };

  setup() {
    this.game = useGame();
  }
  get perks() {
    return PERKS[this.props.hero.cls];
  }

  togglePerk(perk) {
    this.props.hero.perks.toggle(perk.id);
    this.game.save();
  }
}

// -----------------------------------------------------------------------------
// Hero Screen
// -----------------------------------------------------------------------------

export const HERO_SCREEN = (hero) => {
  return {
    navbarText: `Gloomhaven: Hero`,
    backButton: true,
    Content,
    props: { hero },
  };
};

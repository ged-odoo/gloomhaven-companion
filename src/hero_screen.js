import { Component, xml } from "@odoo/owl";
import { useGame } from "./game";
import { FieldChar, FieldSelect, TwoColForm } from "./field_components";

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

class Content extends Component {
  static template = xml`
        <FieldChar name="'name'" record="props.hero" labelWidth="'120px'" readonly="!!props.hero.name" editable="true"/>
        <TwoColForm label="'Class'" value="props.hero.className" labelWidth="'120px'"/>
        <FieldSelect name="'level'" record="props.hero" labelWidth="'120px'" readonly="true" editable="true"/>
        <TwoColForm label="'Max HP'" value="props.hero.maxHp" labelWidth="'120px'"/>
    `;
  static components = { FieldChar, FieldSelect, TwoColForm };

  setup() {
    this.game = useGame();
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

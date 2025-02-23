import { useEnv, useState } from "@odoo/owl";
import { MAIN_MENU } from "./ui/main_menu_screen";
import { CAMPAIGN_SCREEN } from "./ui/campaign_screen";
import { Campaign } from "./model/campaign";

export class Game {
  screens = [MAIN_MENU()];
  BottomSheet = null;
  campaigns = [];
  currentCampaign = null;

  pushScreen(screen) {
    this.screens.push(screen);
  }

  popScreen() {
    this.screens.pop();
  }

  get screen() {
    return this.screens.at(-1);
  }

  openBottomSheet(Comp, props) {
    this.BottomSheet = { Comp, props };
  }

  closeBottomSheet() {
    this.BottomSheet = null;
  }

  addNewCampaign() {
    this.currentCampaign = new Campaign();
    this.campaigns.push(this.currentCampaign);
    this.pushScreen(CAMPAIGN_SCREEN());
  }
}

export function useGame() {
  const env = useEnv();
  return useState(env.game);
}

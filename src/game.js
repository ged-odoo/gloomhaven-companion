import { useEnv, useState } from "@odoo/owl";
import { deserialize } from "./base_model";
import { Campaign } from "./campaign_model";
import { CAMPAIGN_SCREEN } from "./campaign_screen";
import { HERO_SCREEN } from "./hero_screen";
import { MAIN_MENU } from "./main_menu_screen";
import { SCENARIO_SCREEN } from "./scenario_screen";

const LOCAL_STORAGE_KEY = "gh_data";

export class Game {
  screens = [MAIN_MENU()];
  BottomSheet = null;
  campaigns = [];

  constructor() {
    this.load();
    window.addEventListener("force_save", () => this.save());
  }

  pushScreen(screen) {
    this.closeBottomSheet();
    this.screens.push(screen);
  }

  popScreen() {
    this.closeBottomSheet();
    this.screens.pop();
  }

  get screen() {
    return this.screens.at(-1);
  }

  updateNavbarText(newText) {
    this.screen.navbarText = newText;
  }

  openBottomSheet(Comp, props, onClose = () => {}) {
    this.BottomSheet = { Comp, props, onClose };
  }

  closeBottomSheet() {
    this.BottomSheet?.onClose();
    this.BottomSheet = null;
  }

  addNewCampaign(campaign) {
    this.campaigns.push(campaign);
  }

  openCampaign(campaign) {
    this.pushScreen(CAMPAIGN_SCREEN(campaign));
  }

  deleteCampaign(campaign) {
    this.campaigns = this.campaigns.filter((c) => c.id !== campaign.id);
  }

  openHero(hero) {
    this.pushScreen(HERO_SCREEN(hero));
  }

  openScenario(scenario) {
    this.pushScreen(SCENARIO_SCREEN(scenario));
  }

  save() {
    const data = JSON.stringify(this.campaigns);
    localStorage.setItem(LOCAL_STORAGE_KEY, data);
    console.log("saving", data);
  }

  load() {
    const str = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (str) {
      const obj = JSON.parse(str);
      const campaigns = obj.map((obj) => deserialize(Campaign, obj));
      this.campaigns = campaigns;
      console.log(campaigns);
    }
  }
}

export function useGame() {
  const env = useEnv();
  return useState(env.game);
}

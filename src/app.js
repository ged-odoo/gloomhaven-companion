import { GameState } from "./game_state";
import { AddEnemyScreen } from "./screens/add_enemy_screen";
import { CharacterEditor } from "./screens/character_editor_screen";
import { ConfigScreen } from "./screens/config_screen";
import { MainScreen } from "./screens/main_screen";
import { StartScreen } from "./screens/start_screen";
import { preventSleep } from "./utils";

import { Component, mount, useState, xml } from "@odoo/owl";

const SCREEN_MAP = {
  START: StartScreen,
  CONFIG: ConfigScreen,
  CHAR_EDITOR: CharacterEditor,
  MAIN: MainScreen,
  ADD_ENEMY: AddEnemyScreen,
};

class GameModel extends GameState {
  setScreen(screen) {
    if (!(screen in SCREEN_MAP)) {
      throw new Error("Nope...");
    }
    super.setScreen(screen);
  }

  pushScreen(screen, state = null) {
    if (!(screen in SCREEN_MAP)) {
      throw new Error("Nope...");
    }
    super.pushScreen(screen, state);
  }
}

class App extends Component {
  static template = xml`<t t-component="screen" game="game"/>`;

  setup() {
    this.game = useState(new GameModel());

    preventSleep();
    // @ts-ignore (for debug purpose)
    window.app = this;
  }

  get screen() {
    return SCREEN_MAP[this.game.screen];
  }
}

mount(App, document.body);

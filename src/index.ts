import { alexa as ax } from "@chitchatjs/alexa";

import artifacts from "./blocks/artifacts";
import playState from "./states/playState";
import wantToPlay from "./states/wantToPlay";

/**
 * Welcome
 */
let init = ax
  .start()
  .block(
    ax
      .compound()
      .add(artifacts)
      .add(ax.ask("Welcome to High Low guessing game. Would you like to play?").build())
      .add(ax.goto("WantToPlay"))
      .build()
  )
  .build();

/**
 * Stich everything together.
 */
export = ax
  .dialogManager(ax.skill().addState(init).addState(wantToPlay).addState(playState).build())
  .exports();

import { alexa as ax } from "@chitchatjs/alexa";
import builtins from "./builtins";
import artifacts from "./blocks/artifacts";
import wantToPlay from "./states/wantToPlay";
import playState from "./states/playState";

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
      .add(builtins)
      .add(ax.end())
      .build()
  )
  .build();

/**
 * Stich everything together.
 */
export = ax.dialogManager(ax.skill().addState(init).addState(wantToPlay).addState(playState).build()).exports();

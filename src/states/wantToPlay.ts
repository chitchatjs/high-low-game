import { alexa as ax } from "@chitchatjs/alexa";
import generateRandomNumber from "../blocks/generateRandomNumber";
import builtins from "../builtins";

/**
 * A block that gets the confirmation from the user
 * if s/he wants to play the game.
 */
export default ax
  .state("WantToPlay")
  .block(
    ax
      .compound()
      .add(
        ax
          .whenIntentName("AMAZON.YesIntent")
          .then(
            ax
              .compound()
              .add(ax.ask("Great! Try saying a number to start the game.").build())
              .add(generateRandomNumber)
              .add(ax.goto("Play"))
              .build()
          )
          .build()
      )
      .add(ax.whenIntentName("AMAZON.NoIntent").then(ax.say("Thanks for playing!")).build())
      .add(builtins)
      .add(ax.end())
      .build()
  )
  .build();

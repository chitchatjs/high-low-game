import { alexa as ax } from "@chitchatjs/alexa";

import generateRandomNumber from "../blocks/generateRandomNumber";
import handleUsersNumber from "../blocks/handleUsersNumber";
import builtins from "../builtins";

/**
 * Handles the game playing state and
 * all the user events it might receive.
 */
export default ax
  .state("Play")
  .block(
    ax
      .compound()
      .add(handleUsersNumber)
      .add(
        ax
          .whenIntentName("AMAZON.YesIntent")
          .then(
            ax
              .compound()
              .add(ax.removeStateVar("expectedNum"))
              .add(generateRandomNumber)
              .add(ax.ask("Okay! try saying another number").build())
              .build()
          )
          .build()
      )
      .add(ax.whenIntentName("AMAZON.NoIntent").then(ax.say("Thanks for playing!")).build())
      .add(builtins)
      .build()
  )
  .build();

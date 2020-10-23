import { alexa as ax, ssml } from "@chitchatjs/alexa";

import generateRandomNumber from "../blocks/generateRandomNumber";
import { normalVoice } from "../blocks/speech";

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
              .add(ax.ask(normalVoice("Great! Try saying a number to start the game.")).build())
              .add(generateRandomNumber)
              .add(ax.goto("Play"))
              .build()
          )
          .build()
      )
      .add(
        ax
          .whenIntentName("AMAZON.NoIntent")
          .then(ax.say(normalVoice("Thanks for playing!")))
          .build()
      )
      .build()
  )
  .build();

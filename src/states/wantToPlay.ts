import { alexa as ax, ssml } from "@chitchatjs/alexa";

import generateRandomNumber from "../blocks/generateRandomNumber";

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
              .add(
                ax
                  .ask(
                    ax
                      .ssml("Great! Try saying a number to start the game.")
                      .voice(ssml.Voice.Brian)
                      .rate(ssml.Rate.fast)
                      .build()
                  )
                  .build()
              )
              .add(generateRandomNumber)
              .add(ax.goto("Play"))
              .build()
          )
          .build()
      )
      .add(
        ax
          .whenIntentName("AMAZON.NoIntent")
          .then(
            ax.say(
              ax.ssml("Thanks for playing!").voice(ssml.Voice.Brian).rate(ssml.Rate.fast).build()
            )
          )
          .build()
      )
      .build()
  )
  .build();

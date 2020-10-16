import { alexa as ax, AlexaDialogContext, AlexaEvent, Locale } from "@chitchatjs/alexa";
import { supportedLocales } from "../blocks/artifacts";
import { IntentRequest } from "ask-sdk-model";
import generateRandomNumber from "../blocks/generateRandomNumber";
import builtins from "../builtins";
import handleUsersNumber from "../blocks/handleUsersNumber";

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
              .add(ax.removeStateVar("expectNum"))
              .add(generateRandomNumber)
              .add(ax.ask("Okay! try saying another number").build())
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

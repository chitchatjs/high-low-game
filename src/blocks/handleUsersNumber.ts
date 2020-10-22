import { alexa as ax, AlexaDialogContext, AlexaEvent, Locale, ssml } from "@chitchatjs/alexa";
import { supportedLocales } from "../blocks/artifacts";
import { IntentRequest } from "ask-sdk-model";

/**
 * A block that handles user input.
 */
export default ax
  .localize(supportedLocales)
  .block(
    ax
      .whenUserSays([
        "{num}",
        "my number is {num}",
        "number is {num}",
        "how about {num}",
        "my guess is {num}",
        "try {num}",
      ])
      .withSlotType("num", "AMAZON.NUMBER")
      .then(
        ax
          .when()
          .true((c: AlexaDialogContext, e: AlexaEvent) => {
            let ir = <IntentRequest>e.currentRequest.request;
            let expectedNum = c.platformState.globalState["expectedNum"];

            if (ir && ir.type == "IntentRequest" && ir.intent.slots) {
              let userNum = Number.parseInt(ir.intent.slots["num"].value || "-1");

              if (userNum > expectedNum) {
                c.platformState.globalState["highlow"] = "high";
              } else if (userNum < expectedNum) {
                c.platformState.globalState["highlow"] = "low";
              } else {
                delete c.platformState.globalState["highlow"];
                return true;
              }
            }
            return false;
          })
          .then(
            ax
              .ask(
                ax
                  .ssml("{num} is correct! Would you like to play again?")
                  .voice(ssml.Voice.Brian)
                  .rate(ssml.Rate.fast)
                  .emotion(ssml.Emotion.excited, ssml.Intensity.high)
                  .build()
              )
              .build()
          )
          .otherwise(
            ax
              .ask(
                ax
                  .ssml("{num} is {highlow}, try again")
                  .voice(ssml.Voice.Brian)
                  .rate(ssml.Rate.fast)
                  .build()
              )
              .build()
          )
          .build()
      )
      .build()
  )
  .build();

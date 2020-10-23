import { alexa as ax, AlexaDialogContext, AlexaEvent, Locale, ssml } from "@chitchatjs/alexa";
import { supportedLocales } from "../blocks/artifacts";
import { IntentRequest } from "ask-sdk-model";
import { excitedVoice, normalVoice } from "./speech";

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
          .then(ax.ask(excitedVoice("{num} is correct! Would you like to play again?")).build())
          .otherwise(ax.ask(normalVoice("{num} is {highlow}, try again")).build())
          .build()
      )
      .build()
  )
  .build();

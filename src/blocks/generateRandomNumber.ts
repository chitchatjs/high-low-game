import { alexa as ax, AlexaDialogContext, AlexaEvent } from "@chitchatjs/alexa";

/**
 * A block that generates a random number and
 * stores it in the state.
 */
export default ax
  .custom()
  .executor((c: AlexaDialogContext, e: AlexaEvent) => {
    c.platformState.globalState["expectedNum"] = Math.floor(Math.random() * 100);
    return c.currentResponse.response;
  })
  .build();

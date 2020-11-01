import { ax } from "@chitchatjs/alexa";
import { common } from "@chitchatjs/plugin-ax-common";

/**
 * A plugin building block
 * It will help us render experiences for builtin intents like
 * - Stop, Cancel, Fallback etc.
 */
export default common.defaultHandlers({
  help: ax.ask("You can guess a number, just say a number.").build(),
});

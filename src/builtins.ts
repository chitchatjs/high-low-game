import { Locale } from "@chitchatjs/alexa";
import { axkit } from "@chitchatjs/plugin-ax-kit";
import { supportedLocales } from "./blocks/artifacts";

/**
 * A plugin building block
 * It will help us render experiences for builtin intents like
 * - Stop, Cancel, Fallback etc.
 */
export default axkit.builtin.all("You can guess a number, just say a number.", supportedLocales);

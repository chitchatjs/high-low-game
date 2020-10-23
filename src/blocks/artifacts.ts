import { alexa as ax, Locale } from "@chitchatjs/alexa";
export const supportedLocales: Locale[] = [Locale.en_US];

export default ax
  .localize(supportedLocales)
  .block(
    ax
      .compound()
      .add(ax.info().name("CJS High Low Game").invocationName("high low game").build())
      .add(ax.intent("AMAZON.YesIntent").build())
      .add(ax.intent("AMAZON.NoIntent").build())
      .build()
  )
  .build();

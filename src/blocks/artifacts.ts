import { alexa as ax, Locale } from "@chitchatjs/alexa";
export const supportedLocales: Locale[] = [Locale.en_US, Locale.en_AU, Locale.en_CA, Locale.en_GB, Locale.en_IN];

export default ax
  .localize(supportedLocales)
  .block(
    ax
      .compound()
      .add(ax.info().name("CJS High Low Game").invocationName("high low game").build())
      .add(ax.intent("AMAZON.YesIntent", ["yes"]).build())
      .add(ax.intent("AMAZON.NoIntent", ["no"]).build())
      .build()
  )
  .build();

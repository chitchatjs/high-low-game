import { alexa as ax, ssml } from "@chitchatjs/alexa";

export let excitedVoice = (msg: string) => {
  return ax
    .ssml(msg)
    .voice(ssml.Voice.Emma)
    .emotion(ssml.Emotion.excited, ssml.Intensity.high)
    .build();
};

export let normalVoice = (msg: string) => {
  return ax.ssml(msg).voice(ssml.Voice.Emma).build();
};

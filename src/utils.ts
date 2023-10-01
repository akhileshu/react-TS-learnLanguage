import axios from "axios";

export const fetchAudio = async (
  text: string,
  language: LangCodeType
): Promise<string> => {

  const RapidApiKey: string = import.meta.env.VITE_RapidApiKey;
  const voiceRssKey: string = import.meta.env.VITE_voiceRssKey;

  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: {key: voiceRssKey},
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": RapidApiKey,
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );

  return data;
};

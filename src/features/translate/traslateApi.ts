import axios from "axios";
import { generate } from "random-words";
const RapidApiKey: string = import.meta.env.VITE_RapidApiKey;
// Define the error type

export const translateWords = async (
  params: LangCodeType
): Promise<WordType[]> => {
  try {
    const words = generate(8).map((i) => ({
      Text: i,
    })); //[{text:'random english word'},.....]

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },

        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": RapidApiKey,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    const receive: FetchedDataType[] = response.data; //contains 8 obj

    const arr: WordType[] = receive.map((i, idx) => {
      const options = generate(4);
      const correctOptInd = Math.floor(Math.random() * 4); // This will give you a random number between 0 and 3.
      options[correctOptInd] = words[idx].Text;

      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });

    return arr;
  } catch (error) {
    console.log(error);

    // Extract the error message from different possible sources
    const errorMessage =
      (error as { response?: { data?: { error?: { message?: string } } } })
        ?.response?.data?.error?.message ||
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ||
      (error as Error)?.message ||
      "Some Error";

    // Throw an Error with the extracted error message
    throw new Error(errorMessage);
  }
};
// translateWords("hi").then((data)=>console.log(data)).catch((error)=>console.log(error.message))


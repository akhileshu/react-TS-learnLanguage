/// <reference types="vite/client" />

// here we can create dataType
// can use it anywhere without import

type LangCodeType = "ja" | "hi" | "fr" | "es";

type WordType = {
  word: string;
  meaning: string;
  options: string[];
  
};

//*interface
interface StateType {
  loading: boolean;
  result: string[];
  error?: string |null;
  langCode?: LangCodeType;
  words: WordType[];
}

type FetchedDataType = {
    translations: {
      text: string;
    }[];
  };

import { Logger } from "../logger/logger.util"
import { CHINESE_SIMPLIFIED } from "./chinese_simplified"
import { CHINESE_TRADITIONAL } from "./chinese_traditional"
import { CZECH } from "./czech"
import { ENGLISH } from "./english"
import { FRENCH } from "./french"
import { ITALIAN } from "./italian"
import { JAPANESE } from "./japanese"
import { KOREAN } from "./korean"
import { PORTUGUESE } from "./portuguese"
import { SPANISH } from "./spanish"

const WORD_LISTS = {
  ENGLISH: ENGLISH,
  CHINESE_SIMPLIFIED: CHINESE_SIMPLIFIED,
  CHINESE_TRADITIONAL: CHINESE_TRADITIONAL,
  CZECH: CZECH,
  FRENCH: FRENCH,
  ITALIAN: ITALIAN,
  JAPANESE: JAPANESE,
  KOREAN: KOREAN,
  PORTUGUESE: PORTUGUESE,
  SPANISH: SPANISH
}

export enum WORD_LIST {
  ENGLISH = "ENGLISH",
  CHINESE_SIMPLIFIED = "CHINESE_SIMPLIFIED",
  CHINESE_TRADITIONAL = "CHINESE_TRADITIONAL",
  CZECH = "CZECH",
  FRENCH = "FRENCH",
  ITALIAN = "ITALIAN",
  JAPANESE = "JAPANESE",
  KOREAN = "KOREAN",
  PORTUGUESE = "PORTUGUESE",
  SPANISH = "SPANISH"
}

export const getWordList = (wordList?: string) => {
  if (!wordList) {
    return WORD_LISTS.ENGLISH
  }

  if (!WORD_LISTS[wordList]) {
    throw new Error("invalid wordlist key")
  }

  return WORD_LISTS[wordList]
}

export const validateMnemonic = (phrase: string, language = "ENGLISH") => {
  const words = phrase.split(" ")
  const WORD_LIST: string[] = WORD_LISTS[language]

  for (const word of words) {
    if (!WORD_LIST.includes(word)) {
      Logger.error(`${word} is not included in the mnemonic dictionary`)
      return false
    }
  }
  return true
}

const nanoid = require("nanoid");
const { translate } = require("../yandexTranslator/YandexTranslator");

class Word {
  constructor(word, translation, id) {
    this.id = id;
    this.word = word;
    this.translation = translation;
  }
  async translate() {
    this.translation = await translate(this.word);
  }
  toString() {
    return `${this.word}  -  ${this.translation}`;
  }
  toStringId() {
    return `${this.id}  -  ${this.word}`;
  }
  static createWord(word, translation = "", id = nanoid()) {
    return new Word(word, translation, id);
  }
}

module.exports = Word.createWord;

const { translate } = require("../yandexTranslator/YandexTranslator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  word: String,
  translation: String,
  date: {
    type: Date,
    default: Date.now
  },
  userID: Number
});

wordSchema.methods["translate"] = async function() {
  this.translation = await translate(this.word);
};

wordSchema.methods["toString"] = function() {
  return `${this.word}  -  ${this.translation}`;
};
wordSchema.methods["toStringId"] = function() {
  return `${this._id}  -  ${this.word}`;
};

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;

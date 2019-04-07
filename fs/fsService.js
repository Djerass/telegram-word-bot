const fs = require("./fsPromise");

class fsService {
  constructor(fileName) {
    this.fileName = fileName;
  }
  async addWord(word) {
    // Check: if file exist
    // True:
    //       Read word array from file
    //       Check if same word already exists
    //       If no add
    //       Rewrite file
    // False:
    //       Create array on words
    //       Write to new file
    const exist = await fs.access(this.fileName);
    let words = [];
    if (exist) {
      words = await fs.readFile(this.fileName);
      if (!this._checkWord(word, words)) {
        words.push(word);
        await fs.writeFile(this.fileName, words);
        return true;
      } else return false;
    } else {
      words.push(word);
      await fs.writeFile(this.fileName, words);
    }
  }
  async readAllWords() {
    const exist = await fs.access(this.fileName);
    let words = [];
    if (exist) {
      words = await fs.readFile(this.fileName);
    }
    return words;
  }

  async deleteWordById(id) {
    const words = await this.readAllWords();
    const index = words.findIndex(word => word.id === id);
    if (index > -1) {
      const wordValue = words[index];
      words.splice(index, 1);
      await fs.writeFile(this.fileName, words);
      return wordValue;
    }
  }

  _checkWord(word, words) {
    const copy = words.find(
      value => value.word.toUpperCase() === word.word.toUpperCase()
    );
    if (copy) return true;
    return false;
  }
}

module.exports = fsService;

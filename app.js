const { connect } = require("./dbService/dbService");
const telegram = require("./telegram/telegram");
const server = require("./server/serverModule");
const Word = require("./models/wordSchema");

const port = process.env.PORT || 8443;
const urlDB = process.env.MONGODB_URI || `http://localhost:27017`;

// Create Word object, translate, send back translation and add to file if need
const createAndTranslate = async (req, message) => {
  const chatId = req.body.message.chat.id;
  try {
    const newWord = new Word({
      word: message,
      userID: chatId
    });
    await newWord.translate();
    const word = await newWord.save();
    await telegram.sendMessage(chatId, word.toString());
  } catch (e) {
    console.log(e);
  }
};

// Read all words from file, create a message from words and send it
const readAll = async (req, type = "toString") => {
  const chatId = req.body.message.chat.id;
  const words = await Word.find({ userID: chatId });
  let message = "";
  words.forEach(word => {
    message += `${word[type]()}\n`;
  });
  console.log(message);
  if (message) {
    await telegram.sendMessage(chatId, message);
  }
};

const deleteByID = async (message, req) => {
  const id = message.split(" ")[1];
  console.log(id);
  const chatId = req.body.message.chat.id;
  try {
    const value = await Word.findByIdAndDelete(id);
    if (value) {
      await telegram.sendMessage(chatId, `Word "${value.word}"  was deleted`);
    } else {
      await telegram.sendMessage(chatId, "Word with that id not found");
    }
  } catch (e) {
    await telegram.sendMessage(chatId, "Word with that id not found");
    console.log(e);
  }
};

server.post("/api/word", async (req, res) => {
  console.log(req.method, req.url);
  req.on("data", chunk => {
    const body = chunk;
    req.body = JSON.parse(body);
  });
  req.on("end", async () => {
    if (req.body.message) {
      const message = req.body.message.text ? req.body.message.text.trim() : "";
      if (message) {
        switch (true) {
          case message.startsWith("/list"):
            await readAll(req);
            break;
          case message.startsWith("/idlist"):
            await readAll(req, "toStringId");
            break;
          case message.startsWith("/delete"):
            await deleteByID(message, req);
            break;
          default:
            await createAndTranslate(req, message);
            break;
        }
      }
    }
    res.statusCode = 200;
    res.end();
  });
});

server.get("/api/word", async (req, res) => {
  console.log(req.method, req.url);
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  const message = `Route ${req.method}  ${req.url} HEY`;
  return res.end(JSON.stringify({ message }));
});

server.start(port);
connect(urlDB);

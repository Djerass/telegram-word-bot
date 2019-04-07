const axios = require("axios");

const telegramToken =
  process.env.telegramToken || require("../config").telegramToken;
const baseURL = `https://api.telegram.org/bot${telegramToken}/`;

const sendMessage = async (chatId, text) => {
  const encodedText = encodeURIComponent(text);
  const url = `${baseURL}sendMessage?chat_id=${chatId}&text=${encodedText}`;
  await axios.get(url);
};

module.exports = {
  sendMessage
};

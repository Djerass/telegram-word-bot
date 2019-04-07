const yandexToken = process.env.yandexToken || require("../config").yandexToken;
const axios = require("axios");

const baseURL = `https://translate.yandex.net/api/v1.5/tr.json/`;

const translate = async text => {
  const encodedText = encodeURIComponent(text);
  const translateURL = `${baseURL}translate?key=${yandexToken}&text=${encodedText}&lang=ru`;
  try {
    const response = await axios.get(translateURL);
    return response.data.text[0];
  } catch (e) {
    console.log(e);
    return "";
  }
};

module.exports = {
  translate
};

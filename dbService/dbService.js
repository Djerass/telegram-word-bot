const mongoose = require("mongoose");

const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MONGOOSE READY");
});

module.exports = {
  connect: url => {
    mongoose.connect(url, { useNewUrlParser: true });
  },
  mongoose
};

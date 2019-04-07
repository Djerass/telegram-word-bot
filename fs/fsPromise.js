const fs = require("fs");

const access = fileName => {
  return new Promise(resolve => {
    fs.access(fileName, fs.constants.F_OK, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

const readFile = fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, result) => {
      if (err) reject(err);
      resolve(JSON.parse(result));
    });
  });
};

const writeFile = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data), err => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = {
  access,
  writeFile,
  readFile
};

// const data = [
//   {
//     id: 1,
//     word: "cat"
//   },
//   {
//     id: 2,
//     word: "dog"
//   },
//   {
//     id: 3,
//     word: "hamster"
//   }
// ];
//
// const check = async fileName => {
//   const exist = await access(fileName);
//   if (exist) {
//     const read = await readFile(fileName);
//     console.log(read);
//   } else {
//     await writeFile(fileName, data);
//   }
// };

const fs = require("fs");
const path = require("path");

const readdirAsync = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const makeHtml = async (req, res) => {
  let fileData = [];
  try {
    const files = await readdirAsync("./jsonData");

    for (const file of files) {
      const data = await readFileAsync(`./jsonData/${file}`);

      // * 읽은 JSON 파일명을 fileData에 넣기
      fileData.push(`${file.replace(`.json`, "")}:${data}`);
    }
  } catch (err) {
    console.error(err);
  }

  return fileData;
};

module.exports = makeHtml;

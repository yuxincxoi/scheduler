const fs = require("fs");

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

// * 비동기 처리를 하여 모든 파일을 읽은 후 fileData를 반환
const readJson = async (req, res) => {
  let fileData = [];
  try {
    const files = await readdirAsync("./jsonData");

    for (const file of files) {
      const data = await readFileAsync(`./jsonData/${file}`);
      const jsonData = JSON.parse(data);

      // * JSON 데이터에 파일명을 추가하여 객체로 저장
      fileData.push({
        filename: file.replace(`.json`, ""),
        data: jsonData,
      });
    }

    // * time 속성으로 정렬
    fileData.sort((a, b) => a.data.time.localeCompare(b.data.time));

    // * 원하는 형식으로 변환
    fileData = fileData.map(
      (item) => `${item.filename}:${JSON.stringify(item.data)}`
    );
  } catch (err) {
    console.error(err);
  }

  return fileData;
};

module.exports = readJson;

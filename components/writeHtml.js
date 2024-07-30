const readJson = require("./readJson");

const writeHtml = async () => {
  const fileData = await readJson();

  // * fileData가 배열인지 확인
  if (!Array.isArray(fileData)) {
    console.error("fileData is not an array:", fileData);
    return;
  }

  // * fileData 파싱
  const data = fileData
    .map((item) => {
      try {
        const [title, ...jsonParts] = item.split(":");
        const jsonString = jsonParts.join(":");
        const parsedData = JSON.parse(jsonString);

        return `<div id=""eachSchedule>
              <h1>${parsedData.title}</h1>
              <p>Place: ${parsedData.place}</p>
            </div>`;
      } catch (err) {
        console.error("Error parsing JSON for item:", item, err);
        return "";
      }
    })
    .join("");

  const submitHTML = `
    <div>${data}</div>
  `;
  return submitHTML;
};

module.exports = writeHtml;

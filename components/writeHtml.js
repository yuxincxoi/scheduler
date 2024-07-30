const readJson = require("./readJson");

const writeHtml = async () => {
  const fileData = await readJson();

  // * fileData가 배열인지 확인
  if (!Array.isArray(fileData)) {
    console.error("fileData is not an array:", fileData);
    return;
  }

  // * fileData 파싱
  // * fileData 배열의 요소를 하나의 문자열로 병합
  const data = fileData
    .map((item) => {
      try {
        // * item을 ':'을 기준으로 나누어 JSON 부분만 파싱
        const [title, ...jsonParts] = item.split(":");
        const jsonString = jsonParts.join(":");
        const parsedData = JSON.parse(jsonString);

        // * JSON 데이터를 HTML 형식으로 변환
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

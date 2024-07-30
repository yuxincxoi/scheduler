const readJson = require("./readJson");

const writeHtml = async () => {
  const fileData = await readJson();

  // * fileData 파싱
  const data = fileData
    .map((item) => {
      try {
        const [title, ...jsonParts] = item.split(":");
        const jsonString = jsonParts.join(":");
        const parsedData = JSON.parse(jsonString);

        return `<div id=""eachSchedule>
              <h1>${parsedData.title}</h1>
              <p>${parsedData.place}</p>
            </div>`;
      } catch (err) {
        console.error("Error parsing JSON for item:", item, err);
        return "";
      }
    })
    .join("");

  const submitHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
    </head>
    <body>
    <div id="root">
    <div id="detail">
    <div id="createBtn"></div>
    <div id="scheduleContainer">
    <div id="contents">
    <div id="timeBox"></div>
    <div id="timeLine">${data}</div>
    </div>
    <form id="inputBox" action="submit" method="post">
    <div>
    <!-- <label for="title">일정</label> -->
    <input id="title" type="text" name="title" placeholder="일정" />
    </div>
    <div>
    <!-- <label for="time">시간</label> -->
    <input id="time" type="time" name="time" placeholder="시간" />
    </div>
    <div>
    <!-- <label for="place">장소</label> -->
    <input id="place" type="text" name="place" placeholder="장소" />
    </div>
    <div>
    <!-- <label for="memo">메모</label> -->
    <input id="memo" type="text" name="memo" placeholder="메모" />
    </div>
    <div>
    <button id="saveBtn" type="submit">Save</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    <script src="script.js"></script>
    </body>
    </html>
  `;
  return submitHTML;
};

module.exports = writeHtml;

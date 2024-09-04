const { readByDate } = require("../db/crud");
const readJson = require("./readJson");

const writeHtml = async (date) => {
  // const fileData = await readJson();

  // * fileData 파싱
  // const data = fileData
  //   .map((item) => {
  //     try {
  //       const [title, ...jsonParts] = item.split(":");
  //       const jsonString = jsonParts.join(":");
  //       const parsedData = JSON.parse(jsonString);

  //       return `<div id="eachSchedule">
  //                 <div id="eachScheduleHeader">
  //                   <h3>${parsedData.time}</h3>
  //                   <h3 id="title">${parsedData.title}</h3>
  //                 </div>
  //                   <p>${parsedData.place}</p>
  //               </div>`;
  //     } catch (err) {
  //       console.error("Error parsing JSON for item:", item, err);
  //       return "";
  //     }
  //   })
  //   .join("");

  const data = await readByDate(date);
  const schedule = data
    .map((item) => {
      return `
      <div id="eachSchedule">
        <div id="eachScheduleHeader">
          <h3>${item.scheduleTime}</h3>
          <h3 id="title">${item.title}</h3>
        </div>
          <p>${item.place}</p>
      </div>`;
    })
    .join("");

  const submitHTML = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendar</title>
  <link rel="stylesheet" href="style.css"></link>
</head>
<body>
  <div id="root">
    <div id="headContainer">
      <div id="yearContainer"></div>
      <div id="monthContainer"></div>
    </div>
    <div id="calendar">

    </div>
    <div id="modal">
      <div id="createBtn"></div>
      <div id="scheduleContainer">
        <div id="dateContainer"></div>
        <div id="contents">
          <div id="timeLine">${schedule}</div>
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
            <input type="hidden" id="hiddenYear" name="year" />
            <input type="hidden" id="hiddenMonth" name="month" />
            <input type="hidden" id="hiddenDay" name="day" />
            <div>
              <button id="saveBtn" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <div id="modalBackground"></div> -->
    <div id="subBackground"></div>

  </div>
  <script src="calendar.js" type="module"></script>
  <script src="modal.js" type="module"></script>
</body>
</html>
  `;
  return submitHTML;
};

module.exports = writeHtml;

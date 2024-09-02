import closeModal from "./closeModal.js";
import openModal from "./openModal.js";
import paintDays from "./paintDays.js";
import minusMonth from "./minusMonth.js";
import removeDays from "./removeDays.js";
import plusMonth from "./plusMonth.js";

// calendar
const root = document.getElementById("root");
const yearContainer = document.getElementById("yearContainer");
const monthContainer = document.getElementById("monthContainer");
const calendar = document.getElementById("calendar");
const dayofWeekContainer = document.createElement("div");
export const daysContainer = document.createElement("div");
const previousMonth = document.createElement("div");
const nextMonth = document.createElement("div");
let selectedDay;
let selectedMonth;
let selectedYear;
export let year = document.createElement("h2");
export let month = document.createElement("h1");
const hiddenYear = document.getElementById("hiddenYear");
const hiddenMonth = document.getElementById("hiddenMonth");
const hiddenDay = document.getElementById("hiddenDay");
// modal
export const modal = document.getElementById("modal");
export const subBackground = document.getElementById("subBackground");
export const modalBackground = document.getElementById("modalBackground");
const dateContainer = document.getElementById("dateContainer");
const saveBtn = document.getElementById("saveBtn");
const timeLine = document.getElementById("timeLine");

yearContainer.append(year);
monthContainer.append(previousMonth, month, nextMonth);
calendar.append(dayofWeekContainer);
calendar.append(daysContainer);

dayofWeekContainer.id = "dayofWeekContainer";
daysContainer.id = "daysContainer";

previousMonth.id = "previousMonth";
nextMonth.id = "nextMonth";

window.addEventListener("load", async () => {
  try {
    const response = await fetch("/api/schedules/all");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const allSchedules = await response.json();

    allSchedules.forEach((schedule) => {
      const scheduleDate = new Date(schedule.scheduleDate);
      const scheduleYear = scheduleDate.getFullYear();
      const scheduleMonth = scheduleDate.getMonth() + 1;
      const scheduleDay = scheduleDate.getDate();
    });
  } catch (error) {
    console.error("Failed to load schedules:", error);
  }
});

// 월~금 입력하기
for (let i = 0; i < 7; i++) {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const dayofWeek = document.createElement("div");
  dayofWeekContainer.append(dayofWeek);
  dayofWeek.innerText = weeks[i];
}

// 달력 7일 * 6주
let dayBox;

for (let i = 1; i < 43; i++) {
  dayBox = document.createElement("div");
  daysContainer.append(dayBox);
  daysContainer.id = "daysContainer";
  dayBox.className = "dayBox";

  dayBox.addEventListener("click", async (event) => {
    if (event.target.classList.contains("dayBox")) {
      timeLine.innerHTML = "";
      openModal();

      selectedYear = year.textContent;
      selectedMonth = month.textContent;

      const fullText = event.target.textContent.trim();
      const match = fullText.match(/\d+/);
      selectedDay = parseInt(match[0], 10);

      dateContainer.innerHTML = `${selectedYear}년 ${selectedMonth}월 ${selectedDay}일`;

      hiddenYear.value = selectedYear;
      hiddenMonth.value = selectedMonth;
      hiddenDay.value = selectedDay;

      const formattedMonth = selectedMonth.padStart(2, "0");
      const formattedDay = String(selectedDay).padStart(2, "0");

      const response = await fetch(
        `/api/schedules?date=${selectedYear}-${formattedMonth}-${formattedDay}`
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      data
        .map((item) => {
          const schedule = document.createElement("div");
          schedule.id = "eachSchedule";
          schedule.innerHTML = `
              <div id="eachScheduleHeader">
                <h3>${item.scheduleTime}</h3>
                <h3 id="title">${item.title}</h3>
              </div>
              <p>${item.place}</p>`;
          timeLine.append(schedule);
        })
        .join("");
    }
  });
}

saveBtn.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value;
  const memo = document.getElementById("memo").value;

  console.log(title, time, place, memo);

  await fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
      title: title,
      time: time,
      place: place,
      memo: memo,
    }),
  });
});

// 오늘
let today = new Date();
let day = today.getDate();
year.innerText = `${today.getFullYear()}`;
month.innerText = `${today.getMonth() + 1}`;

paintDays();

// 전 달로
previousMonth.addEventListener("click", () => {
  removeDays();
  minusMonth();
  paintDays();
});

// 다음 달로
nextMonth.addEventListener("click", () => {
  removeDays();
  plusMonth();
  paintDays();
});

// todo : 완성시키기
// 전 달
// for (i = 0; i < firstDayofWeek; i++) {
//   daysContainer.children[i].innerText = `${
//     getLastDay() - firstDayofWeek + i + 1
//   }`;
// }

// 다음 달
// 매월 마지막 요일
// let lastDay = new Date(year.innerText, month.innerText - 1, getLastDay());
// let lastDayofWeek = lastDay.getDay();

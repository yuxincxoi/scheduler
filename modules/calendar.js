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
let selectedId;
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
const inputBox = document.getElementById("inputBox");
let title = document.getElementById("title");
let time = document.getElementById("time");
let place = document.getElementById("place");
let memo = document.getElementById("memo");

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

      const currentYear = parseInt(year.textContent, 10);
      const currentMonth = parseInt(month.textContent, 10);

      if (scheduleYear === currentYear && scheduleMonth === currentMonth) {
        const dayBoxes = document.querySelectorAll(".dayBox");

        if (dayBoxes) {
          dayBoxes.forEach((dayBox) => {
            const fullText = dayBox.textContent.trim();
            const match = fullText.match(/\d+/);
            const dayNumber = match ? parseInt(match[0], 10) : null;

            if (dayNumber === scheduleDay) {
              const dataTitle = document.createElement("div");

              dataTitle.dataset.title = schedule.title;
              dataTitle.dataset.date = schedule.scheduleDate;

              dataTitle.textContent = schedule.title;
              dayBox.append(dataTitle);
            }
          });
        } else {
          console.error("No day boxes found.");
        }
      }
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

timeLine.addEventListener("click", (event) => {
  if (event.target && event.target.id === "eachSchedule") {
    const selectedTime = event.target.children[0].children[0].innerText;
    const selectedTitle = event.target.children[0].children[1].innerText;
    const seletedPlace = event.target.children[1].innerText;
    const seletedMemo = event.target.children[2].innerText;
    selectedId = event.target.children[3].innerText;

    inputBox[0].value = selectedTitle;
    inputBox[1].value = selectedTime;
    inputBox[2].value = seletedPlace;
    inputBox[3].value = seletedMemo;
  }
});

for (let i = 1; i < 43; i++) {
  dayBox = document.createElement("div");
  daysContainer.append(dayBox);
  daysContainer.id = "daysContainer";
  dayBox.className = "dayBox";

  dayBox.addEventListener("click", async (event) => {
    if (event.target.classList.contains("dayBox")) {
      timeLine.innerHTML = "";
      openModal();
      title.value = "";
      time.value = "";
      place.value = "";
      memo.value = "";

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
              <p>${item.place}</p>
              <p>${item.memo}</p>
              <p id="hidden">${item.id}</p>`;
          timeLine.append(schedule);
        })
        .join("");
    }
  });
}

saveBtn.addEventListener("submit", async (event) => {
  event.preventDefault();

  console.log(selectedId);

  await fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      id: selectedId,
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
      title: title.value,
      time: time.value,
      place: place.value,
      memo: memo.value,
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

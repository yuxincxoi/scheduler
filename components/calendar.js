import closeModal from "./closeModal.js";
import openModal from "./openModal.js";
import paintDays from "./paintDays.js";
import removeDays from "./removeDays.js";

// calendar
const root = document.getElementById("root");
const yearContainer = document.getElementById("yearContainer");
const monthContainer = document.getElementById("monthContainer");
const calendar = document.getElementById("calendar");
const dayofWeekContainer = document.createElement("div");
export const daysContainer = document.createElement("div");
const previousMonth = document.createElement("div");
const nextMonth = document.createElement("div");
export let year = document.createElement("h2");
export let month = document.createElement("h1");
// modal
export const modal = document.getElementById("modal");
export const subBackground = document.getElementById('subBackground');
export const modalBackground = document.getElementById("modalBackground");
const modalCloseBtn = document.createElement("div");
const modalHeader = document.createElement("div");
const modalDate = document.createElement("div");
const events = document.createElement("div");
const eventsDate = document.createElement("h1");

yearContainer.append(year);
monthContainer.append(previousMonth, month, nextMonth);
calendar.append(dayofWeekContainer);
calendar.append(daysContainer);
modal.append(modalCloseBtn, modalHeader);
modalHeader.append(modalDate, events);
modalDate.append(eventsDate);

dayofWeekContainer.id = "dayofWeekContainer";
daysContainer.id = "daysContainer";
modalCloseBtn.id = "modalCloseBtn";

previousMonth.id = "previousMonth";
nextMonth.id = "nextMonth";
modalCloseBtn.id = "modalCloseBtn";

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

  dayBox.addEventListener("click", () => {
    subBackground.style.display = "block";
    modalBackground.style.display = "block";
    modal.style.display = "block";
  });
}

// 오늘
let today = new Date();
let day = today.getDate();
year.innerText = `${today.getFullYear()}`;
month.innerText = `${today.getMonth() + 1}`;

paintDays();

// modal open
dayBox.addEventListener("click", () => {
  openModal();
});

// modal close
modalCloseBtn.addEventListener("click", () => {
  closeModal();
});

// 전 달로
previousMonth.addEventListener("click", () => {
  removeDays();
  month.innerText--;
  if (month.innerText < 1) {
    month.innerText = "12";
    year.innerText--;
  }
  paintDays();
});

// 다음 달로
nextMonth.addEventListener("click", () => {
  removeDays();
  month.innerText++;
  if (month.innerText > 12) {
    month.innerText = "1";
    year.innerText++;
  }
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

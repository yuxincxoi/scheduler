import removeDays from "./removeDays.js";

// calendar
const root = document.getElementById("root");
const yearContainer = document.getElementById("yearContainer");
const monthContainer = document.getElementById("monthContainer");
const calendar = document.getElementById("calendar");
const dayofWeekContainer = document.createElement("div");
const daysContainer = document.createElement("div");
const previousMonth = document.createElement("div");
const nextMonth = document.createElement("div");
let year = document.createElement("h2");
let month = document.createElement("h1");
// modal
const modal = document.getElementById("modal");
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

PaintDays();

// modal open
dayBox.addEventListener("click", () => {
  subBackground.style.display = "block";
  modalBackground.style.display = "block";
  modal.style.display = "block";
  console.log("click");
});

// modal close
modalCloseBtn.addEventListener("click", () => {
  subBackground.style.display = "none";
  modalBackground.style.display = "none";
  modal.style.display = "none";
});

// 전 달로
previousMonth.addEventListener("click", () => {
  removeDays();
  month.innerText--;
  if (month.innerText < 1) {
    month.innerText = "12";
    year.innerText--;
  }
  PaintDays();
});

// 다음 달로
nextMonth.addEventListener("click", () => {
  removeDays();
  month.innerText++;
  if (month.innerText > 12) {
    month.innerText = "1";
    year.innerText++;
  }
  PaintDays();
});

// 달력 일자 입력하기
function PaintDays() {
  let days = [];
  // let a = [];
  // 1 ~ lastday
  for (let i = 0; i < getLastDay(month.innerText); i++) {
    days[i] = `${i + 1}`;
  }
  // 요일에 맞게 입력
  let firstDay;
  let firstDayofWeek;
  for (let i = 0; i < getLastDay(); i++) {
    firstDay = new Date(year.innerText, month.innerText - 1, 1); // 매월 1일 날짜
    firstDayofWeek = firstDay.getDay(); // 매월 1일 요일
  }
  for (let j = 0; j < getLastDay(month.innerText); j++) {
    dayBox = daysContainer.children[firstDayofWeek + j];
    dayBox.innerText = days[j];
    // 일요일 red 설정
    let sunday = new Date(year.innerText, month.innerText - 1, `${days[j]}`);
    if (sunday.getDay() == 0) {
      dayBox.style.color = "red";
    }
  }
}

// 매월 마지막날 날짜 구하기
function getLastDay(month) {
  let lastDay;
  if (month == 4 || month == 6 || month == 9 || month == 11) {
    lastDay = 30;
  } else if (month == 2) {
    lastDay = 28;
  } else {
    lastDay = 31;
  }
  return lastDay;
}

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

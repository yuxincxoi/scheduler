import { daysContainer, year, month, getLastDay } from './calendar.js';

/**
 * @yuxincxoi 24.07.02
 * * 달력 일자 입력하는 함수
 */

export default () => {
  let days = [];

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
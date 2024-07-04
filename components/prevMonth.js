import { month, year } from "./calendar.js";

/**
 * @yuxincxoi 24.07.04
 * * 이전 달로 변환하는 함수
 */

export default () => {
  month.innerText--;
  if (month.innerText < 1) {
    month.innerText = "12";
    year.innerText--;
  }
};

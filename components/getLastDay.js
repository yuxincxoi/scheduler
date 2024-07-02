/**
 * @yuxincxoi 24.07.03
 * * 매월의 마지막날 날짜를 구하는 함수
 * @param {number} month 월
 * @returns {number}
 */

export default (month) => {
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
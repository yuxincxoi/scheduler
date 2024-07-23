import { subBackground, modal, modalBackground } from "./calendar.js";

/**
 * @yuxincxoi 24.07.04
 * * 모달창을 여는 함수
 * * 달력의 날짜를 클릭하면 실행되는 함수
 */

export default () => {
  subBackground.style.display = "block";
  // modalBackground.style.display = "block";
  modal.style.display = "block";
  console.log("click");
};

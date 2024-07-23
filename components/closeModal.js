import { subBackground, modalBackground, modal } from "./calendar.js";

/**
 * @yuxincxoi 24.07.04
 * * 모달창을 닫는 함수
 */

export default () => {
  subBackground.style.display = "none";
  // modalBackground.style.display = "none";
  modal.style.display = "none";
}
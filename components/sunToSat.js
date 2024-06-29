
const sunToSat = () => {
  const dayofWeekContainer = document.createElement("div");
  // 월~금 입력하기
for (let i = 0; i < 7; i++) {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const dayofWeek = document.createElement("div");
  dayofWeekContainer.append(dayofWeek);
  dayofWeek.innerText = weeks[i];
}

calendar.append(dayofWeekContainer);

dayofWeekContainer.id = "dayofWeekContainer";
}

export default sunToSat;
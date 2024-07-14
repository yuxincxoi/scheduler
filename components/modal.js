const detail = document.getElementById("detail");
const createBtn = document.getElementById("createBtn");
const scheduleContainer = document.getElementById("scheduleContainer");
const timeBox = document.getElementById("timeBox");
const inputBox = document.getElementById("inputBox");
const title = document.getElementById("title");
const time = document.getElementById("time");
const place = document.getElementById("place");
const memo = document.getElementById("memo");
const saveBtn = document.getElementById("saveBtn");

// 24시간 표시
for (i = 0; i < 24; i++) {
  const times = document.createElement("div");
  timeBox.append(times);
  times.innerText = i + 1;
}

// opne & close 이벤트
createBtn.addEventListener("click", () => {
  if (detail.style.height === "50px") {
    detail.style.height = "90vh";
    scheduleContainer.style.display = "flex";
  } else {
    detail.style.height = "50px";
    scheduleContainer.style.display = "none";
  }
});

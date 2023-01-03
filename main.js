let hourCont = document.getElementById("hourCont");
let minCont = document.getElementById("minCont");
let secCont = document.getElementById("secCont");
let limit = document.getElementById("limitSelect");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resumeBtn = document.getElementById("resumeBtn");
let resetBtn = document.getElementById("resetBtn");
let timer, limitValue, hour, min, sec;

startBtn.addEventListener("click", (e) => {
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  resetBtn.removeAttribute("disabled");
  limit.setAttribute("disabled", "true");
  limitValue = limit.value;
  if (limitValue === "custom") {
    limitValue = prompt("Enter your counter limit:");
  }
  startCounter(limitValue);
});

pauseBtn.addEventListener("click", (e) => {
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "block";
  clearInterval(timer);
});

resumeBtn.addEventListener("click", (e) => {
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "block";
  let remainMs = hour * 60 + min + (sec - 1) / 60;
  startCounter(remainMs);
});

resetBtn.addEventListener("click", (e) => {
  resetTimer();
});

function resetTimer() {
  resetBtn.setAttribute("disabled", "true");
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
  startBtn.style.display = "block";
  limit.removeAttribute("disabled");
  clearInterval(timer);
  hourCont.innerHTML = `00`;
  minCont.innerHTML = `00`;
  secCont.innerHTML = `00`;
}

function startCounter(inputLimit) {
  let limitMs = inputLimit * 60 * 1000;
  hour = parseInt(limitMs / (60 * 60 * 1000));
  min = parseInt((limitMs / (60 * 1000)) % 60);
  sec = parseInt((limitMs / 1000) % 60);
  hourCont.innerHTML = hour.toString().padStart(2, "0");
  minCont.innerHTML = min.toString().padStart(2, "0");
  secCont.innerHTML = sec.toString().padStart(2, "0");
  timer = setInterval(() => {
    sec--;
    if (sec <= 0) {
      sec = 59;
      min--;
    }

    if (sec <= 0 && min <= 0) {
      sec = 59;
      min = 59;
      hour--;
    }

    if (sec <= 0 && min <= 0 && hour <= 0) {
      resetTimer();
    }
    hourCont.innerHTML = hour.toString().padStart(2, "0");
    minCont.innerHTML = min.toString().padStart(2, "0");
    secCont.innerHTML = sec.toString().padStart(2, "0");
  }, 1000);
}

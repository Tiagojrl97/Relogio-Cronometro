const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");
const cronometroButton = document.querySelector(".cronometro");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const restartButton = document.querySelector(".restart");
const resumeButton = document.querySelector(".continueTime");
const horasC = document.getElementById("horasC");
const minutosC = document.getElementById("minutosC");
const segundosC = document.getElementById("segundosC");
const milissegundos = document.getElementById("milissegundos");
const backClock = document.querySelector(".backClock");

let isCronometroRunning = false;
let interval;
let relogioInterval;
let isPaused = false;
let isPlayed = false;
let hour = 0;
let minute = 0;
let second = 0;
let milisec = 0;

function updateTime() {
  let date = new Date();
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  horas.textContent = hr;
  minutos.textContent = min;
  segundos.textContent = sec;
}

relogioInterval = setInterval(updateTime, 1000);

playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resumeButton.addEventListener("click", resumeTimer);
restartButton.addEventListener("click", resetTimer);

function startTimer() {
  interval = setInterval(() => {
    if (!isPaused) {
      milisec += 10;

      if (milisec === 1000) {
        second++;
        milisec = 0;
      }
      if (second === 60) {
        minute++;
        second = 0;
      }

      if (minute === 60) {
        hour++;
        minute = 0;
      }
      horasC.textContent = formatTime(hour);
      minutosC.textContent = formatTime(minute);
      segundosC.textContent = formatTime(second);
      milissegundos.textContent = milisec;
    }
  }, 10);

  document.querySelector(".pause").style.display = "flex";
  document.querySelector(".restart").style.display = "flex";
  document.querySelector(".play").style.display = "none";
}

function pauseTimer() {
  isPaused = true;
  document.querySelector(".pause").style.display = "none";
  document.querySelector(".continueTime").style.display = "flex";
  document.querySelector(".restart").style.display = "flex";
  document.querySelector(".play").style.display = "none";
}

function resumeTimer() {
  isPaused = false;

  document.querySelector(".pause").style.display = "flex";
  document.querySelector(".continueTime").style.display = "none";
  document.querySelector(".restart").style.display = "flex";
  document.querySelector(".play").style.display = "none";
}

function resetTimer() {
  clearInterval(interval);
  minute = 0;
  second = 0;
  milisec = 0;
  hour = 0;
  horasC.textContent = "00";
  minutosC.textContent = "00";
  segundosC.textContent = "00";
  milissegundos.textContent = "000";

  document.querySelector(".play").style.display = "flex";
  document.querySelector(".backClock").style.display = "flex";
  document.querySelector(".continueTime").style.display = "none";
  document.querySelector(".pause").style.display = "none";
  document.querySelector(".restart").style.display = "none";
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

cronometroButton.addEventListener("click", () => {
  isCronometroRunning = true;
  clearInterval(relogioInterval);
  document.querySelector(".relogio").style.display = "none";
  document.querySelector(".cronometroC").style.display = "flex";
  document.querySelector(".cronometro").style.display = "none";

  if (hour == 0 && minute == 0 && second == 0 && milisec == 0) {
    document.querySelector(".play").style.display = "flex";
    document.querySelector(".backClock").style.display = "flex";

  }

  if (hour > 0 || minute > 0 || second > 0 || milisec > 0 && !isPaused) {
    document.querySelector(".pause").style.display = "flex";
    document.querySelector(".restart").style.display = "flex";
    document.querySelector(".play").style.display = "none";
    document.querySelector(".continueTime").style.display = "none";
    document.querySelector(".backClock").style.display = "flex";
  }

  if (hour > 0 || minute > 0 || second > 0 || milisec > 0 && isPaused) {
    document.querySelector(".pause").style.display = "none";
    document.querySelector(".restart").style.display = "flex";
    document.querySelector(".play").style.display = "none";
    document.querySelector(".continueTime").style.display = "flex";
    document.querySelector(".backClock").style.display = "flex";
  }
  
});

backClock.addEventListener("click", () => {
  relogioInterval = setInterval(updateTime, 1000);
  document.querySelector(".relogio").style.display = "flex";
  document.querySelector(".cronometroC").style.display = "none";
  document.querySelector(".cronometro").style.display = "flex";
  document.querySelector(".play").style.display = "none";
  document.querySelector(".pause").style.display = "none";
  document.querySelector(".restart").style.display = "none";
  document.querySelector(".backClock").style.display = "none";
  document.querySelector(".continueTime").style.display = "none";
});

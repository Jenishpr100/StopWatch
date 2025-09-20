let startTime, updatedTime, difference, tInterval;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(getShowTime, 10); // update every 10 ms
    running = true;
    startBtn.textContent = "Stop";
  } else {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    startBtn.textContent = "Start";
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.textContent = "00:00:00.000";
  startBtn.textContent = "Start";
}

function getShowTime() {
  updatedTime = new Date().getTime() - startTime;
  let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((updatedTime / 1000) % 60);
  let milliseconds = Math.floor(updatedTime % 1000);

  display.textContent =
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds);
}

startBtn.onclick = startTimer;
resetBtn.onclick = resetTimer;

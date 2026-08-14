let startTime = 0;
let difference = 0;
let timerInterval = null;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const currentTime = document.getElementById("currentTime");
const startedAt = document.getElementById("startedAt");

// Update the current clock
function updateCurrentTime() {
    const now = new Date();

    currentTime.textContent = now.toLocaleTimeString([], { 
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

// Update stopwatch display
function updateStopwatch() {
    const elapsed = Date.now() - startTime;

    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const milliseconds = elapsed % 1000;

    display.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0");
}

// Start / stop stopwatch
function startTimer() {
    if (!running) {

        startTime = Date.now() - difference;

        timerInterval = setInterval(updateStopwatch, 10);

        running = true;
        startBtn.textContent = "Stop";

        // Only set the start time when starting from zero
        if (difference === 0) {
            const now = new Date();

            startedAt.textContent = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
        }

    } else {

        clearInterval(timerInterval);

        difference = Date.now() - startTime;

        running = false;
        startBtn.textContent = "Start";
    }
}

// Reset stopwatch
function resetTimer() {
    clearInterval(timerInterval);

    running = false;
    difference = 0;
    startTime = 0;

    display.textContent = "00:00:00.000";

    startedAt.textContent = "Not started";

    startBtn.textContent = "Start";
}

// Buttons
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

// Current clock
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

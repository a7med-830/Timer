let timer = document.querySelector(".timer");

let hoursField = document.querySelector("#hours");
let minutesField = document.querySelector("#minutes");
let time = 0;
let countDown;
let displayedHours = "00";
let displayedMinutes = "00";
let displayedSeconds = "00";
let inactivityTimeout;

let startBtn = document.querySelector("#start");
let pauseBtn = document.querySelector("#pause");
let resetBtn = document.querySelector("#reset");
let continueBtn = document.querySelector("#continue");
let container = document.querySelector(".container");

let isRunning = false;

function hideControls() {
    container.classList.add("temp-hide");
    timer.style.cssText = "background-color: transparent;";
}

function showControls() {
    clearTimeout(inactivityTimeout);
    container.classList.remove("temp-hide");
    timer.style.cssText = "";
    if (isRunning) {
        inactivityTimeout = setTimeout(hideControls, 5000);
    }
}

startBtn.addEventListener("click", function () {
    if (!isRunning) {
        console.log("running");
        isRunning = true;
        let hours = parseInt(hoursField.value) || 0;
        let minutes = parseInt(minutesField.value) || 0;
        time = Math.max(0, hours * 60 * 60 + minutes * 60);

        displayedHours = String(Math.floor((time / (60 * 60)) % 60)).padStart(
            2,
            "0"
        );
        displayedMinutes = String(Math.floor((time / 60) % 60)).padStart(
            2,
            "0"
        );
        displayedSeconds = String(Math.floor(time % 60)).padStart(2, "0");
        timer.innerHTML = `${displayedHours} : ${displayedMinutes} : ${displayedSeconds}`;

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        continueBtn.classList.add("hidden");

        clearInterval(countDown);
        showControls();

        countDown = setInterval(() => {
            if (time <= 0) {
                clearInterval(countDown);
                isRunning = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                timer.innerHTML = "00 : 00 : 00";
                showControls();
                return;
            }

            time -= 1;

            displayedHours = String(
                Math.floor((time / (60 * 60)) % 60)
            ).padStart(2, "0");
            displayedMinutes = String(Math.floor((time / 60) % 60)).padStart(
                2,
                "0"
            );
            displayedSeconds = String(Math.floor(time % 60)).padStart(2, "0");

            timer.innerHTML = `${displayedHours} : ${displayedMinutes} : ${displayedSeconds}`;
        }, 1000);
    }
});

pauseBtn.addEventListener("click", function () {
    if (isRunning) {
        clearInterval(countDown);
        isRunning = false;
        console.log("Timer Paused");
        startBtn.classList.add("hidden");
        continueBtn.classList.remove("hidden");
        startBtn.disabled = true;
        pauseBtn.disabled = true;
        continueBtn.disabled = false;
        showControls();
    } else {
        console.log("Timer is already paused or finished");
    }
});

resetBtn.addEventListener("click", function () {
    isRunning = false;
    clearInterval(countDown);
    console.log("Timer reset");
    time = 0;
    hoursField.value = "00";
    minutesField.value = "00";
    timer.innerHTML = "00 : 00 : 00";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    continueBtn.disabled = true;
    continueBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    showControls();
});

continueBtn.addEventListener("click", function () {
    if (!isRunning && time > 0) {
        console.log("Timer is running again");
        isRunning = true;
        startBtn.classList.remove("hidden");
        continueBtn.classList.add("hidden");
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;

        clearInterval(countDown);
        showControls();

        countDown = setInterval(() => {
            if (time <= 0) {
                clearInterval(countDown);
                isRunning = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                timer.innerHTML = "00 : 00 : 00";
                showControls();
                return;
            }

            time -= 1;

            displayedHours = String(
                Math.floor((time / (60 * 60)) % 60)
            ).padStart(2, "0");
            displayedMinutes = String(Math.floor((time / 60) % 60)).padStart(
                2,
                "0"
            );
            displayedSeconds = String(Math.floor(time % 60)).padStart(2, "0");

            timer.innerHTML = `${displayedHours} : ${displayedMinutes} : ${displayedSeconds}`;
        }, 1000);
    } else {
        console.log("Timer cannot continue (already running or time is zero).");
    }
});

function initializeTimer() {
    timer.innerHTML = "00 : 00 : 00";
    hoursField.value = "00";
    minutesField.value = "00";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    continueBtn.disabled = true;
    continueBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    showControls();
}

initializeTimer();

document.body.addEventListener("mouseenter", showControls);

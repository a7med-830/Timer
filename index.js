let timer = document.querySelector(".timer");
let h = document.querySelector("#h");
let m = document.querySelector("#m");
let s = document.querySelector("#s");

let hoursField = document.querySelector("#hours");
let minutesField = document.querySelector("#minutes");
let time = 0;
let countDown;

let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let resetBtn = document.querySelector("#reset");

let isRunning = false;


startBtn.addEventListener("click", function () {
    if (!isRunning) {
        console.log("running");
        isRunning = true;
        let hours = hoursField.value;
        let minutes = minutesField.value;
        time = (hours * 60 * 60) + (minutes * 60);
        countDown = setInterval(() => {
            time -= 1;
            timer.innerHTML = time;
        }, 1000);
    }

});

stopBtn.addEventListener("click", function () {
    isRunning ?  clearInterval(countDown) : console.log("Timer is already running"); 
})
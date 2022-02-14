// Bind HTML stuff
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startButton");
const resetBtn = document.getElementById("resetButton");
const toast = document.getElementById("toast");

const themesBtn = document.getElementById("themes");
const themesWindow = document.getElementById("themes-window");
const themesExit = document.getElementById("themes-exit");

// JS stuff
let userSettings = {
  focusMinutes: 0,
  restMinutes: 0,
};

let minutes = userSettings["focusMinutes"];
let seconds = 0;

let on = false;
let isFocusSession = true;
let interval = null;

function update() {
  if (minutes <= 0 && seconds <= 0) { 
      switchSession();
    }

  if (seconds == 0) {
    minutes--;
    seconds = 60;
  }
  seconds--;

  showTime();
}

function showTime() {
    let displayMinutes = minutes.toString().length == 2 ? minutes : "0" + minutes;
  let displaySeconds = seconds.toString().length == 2 ? seconds : "0" + seconds;
  timer.innerText = displayMinutes + " : " + displaySeconds;
}

function switchSession() {
    // If there's no time left, change the session
    // Is it focus session? if yes then rest, if no then back to focus
    if (isFocusSession) {
      toast.innerText = "Focus Ended, Starting Rest"
      reset(userSettings["restMinutes"]);
      timer.classList.add("rest");
      
    } else {
      toast.innerText = "Rest Ended, Starting Focus"
      reset(userSettings["focusMinutes"]);
      timer.classList.remove("rest");

    } 

    // Change the session
    isFocusSession = !isFocusSession;

    // Show the toast (notification), hide it again after 3 seconds
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 3300);
}

function start() {
  on = !on;

  if (on) {
    interval = setInterval(update, 1000);
    startBtn.innerText = "Pause"

  } else {
    clearInterval(interval);
    interval = null;
    startBtn.innerText = "Start"
  }

}

function reset(mins) {
  minutes = mins;
  seconds = 0;

  clearInterval(interval);
  interval = null;
  on = false;

  startBtn.innerText = "Start"
  showTime();
}

showTime();
startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", function () {
    timer.classList.remove("rest");
    isFocusSession = true;

  reset([userSettings["focusMinutes"]]);
});

themesBtn.addEventListener("click", function () {
    themesWindow.classList.add("show");
})

themesExit.addEventListener("click", function () {
    themesWindow.classList.remove("show");
})
const countdown = document.querySelector(".countdown");
const countdownEventStatus = document.querySelector(".countdown__event-status");
const countdownDays = document.querySelector(".countdown__days");
const countdownDaysText = document.querySelector(".countdown__days-text");
const countdownHours = document.querySelector(".countdown__hours");
const countdownMinutes = document.querySelector(".countdown__minutes");
const countdownSeconds = document.querySelector(".countdown__seconds");
const countdownSecondsText = document.querySelector(".countdown__secs-text");

const OpeningDay = new Date(2022, 06, 22, 10); // 22nd July 2022 at 10 am
// console.log(OpeningDay);
const ClosingDay = new Date(2022, 06, 30); // 29th to 30th July 2022 at midnight
// console.log(ClosingDay);

function calculateTime() {
  const timeDifference = OpeningDay - new Date();

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((timeDifference / 1000 / 60) % 60);
  const secondsLeft = Math.floor((timeDifference / 1000) % 60);

  return {
    daysLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
  };
}

let calculatedTime = calculateTime();

if (new Date() > ClosingDay) {
  // event has ended
  countdown.innerText = "";
  countdown.appendChild(countdownEventStatus);
  countdownEventStatus.innerText = "EVENT ENDED";
} else if (new Date() > OpeningDay) {
  // event has started
  countdown.innerText = "";
  countdown.appendChild(countdownEventStatus);
  countdownEventStatus.innerText = "EVENT LIVE";
  countdownEventStatus.style.fontSize = "3em";
} else if (calculatedTime.daysLeft < 1) {
  // last day
  countdownDays.classList.add("hidden");
  countdownDaysText.classList.add("hidden");

  countdownHours.innerText = ("0" + calculatedTime.hoursLeft).slice(-2);
  countdownMinutes.innerText = ("0" + calculatedTime.minutesLeft).slice(-2);
  countdownSeconds.innerText = ("0" + calculatedTime.secondsLeft).slice(-2);

  // set interval to update element every second
  setInterval(function () {
    calculatedTime = calculateTime();

    // could be optimized by checking if the values differ, then update
    countdownHours.innerText = ("0" + calculatedTime.hoursLeft).slice(-2);
    countdownMinutes.innerText = ("0" + calculatedTime.minutesLeft).slice(-2);
    countdownSeconds.innerText = ("0" + calculatedTime.secondsLeft).slice(-2);
  }, 1000);
} else {
  countdownSeconds.classList.add("hidden");
  countdownSecondsText.classList.add("hidden");

  if (calculatedTime.daysLeft !== 1) countdownDaysText.innerText += "S";

  countdownDays.innerText = calculatedTime.daysLeft;
  countdownHours.innerText = ("0" + calculatedTime.hoursLeft).slice(-2);
  countdownMinutes.innerText = ("0" + calculatedTime.minutesLeft).slice(-2);

  // set interval to update element every 30 seconds
  setInterval(function () {
    calculatedTime = calculateTime();

    // could be optimized by checking if the values differ, then update
    countdownDays.innerText = calculatedTime.daysLeft;
    countdownHours.innerText = ("0" + calculatedTime.hoursLeft).slice(-2);
    countdownMinutes.innerText = ("0" + calculatedTime.minutesLeft).slice(-2);
  }, 1000 * 30);
}

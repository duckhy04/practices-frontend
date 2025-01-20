const dayDisplay = document.querySelector(".days span");
const monthDisplay = document.querySelector(".months span");
const yearDisplay = document.querySelector(".years span");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10) - 1;
  const year = parseInt(yearInput.value, 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    dayInput.style.backgroundColor = "red";
    return;
  }

  const today = new Date();
  const birthDate = new Date(year, month, day);

  if (birthDate > today) {
    return;
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  yearDisplay.textContent = ageYears;
  monthDisplay.textContent = ageMonths;
  dayDisplay.textContent = ageDays;
});
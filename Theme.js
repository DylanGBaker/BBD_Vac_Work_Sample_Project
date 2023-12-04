const page_background = document.querySelector("body");
const calculator_buttons = document.getElementsByClassName("calculator-btn");
const calculator_colour = document.querySelector(".calculator-layout");
const theme_button = document.querySelector(".theme-button");

let current_theme = "dark";

if (localStorage.getItem("theme") != "")
{
  current_theme = localStorage.getItem("theme");
}

function changeToDarkMode() {
  page_background.style.backgroundColor = "black";
  for (let i = 0; i < calculator_buttons.length; i++) {
    calculator_buttons[i].style.color = "white";
    calculator_buttons[i].style.background = "none";
    calculator_buttons[i].style.backgroundColor = "black";
    calculator_buttons[i].style.border = "solid";
    calculator_buttons[i].style.borderColor = "orange";
  }
  localStorage.setItem("theme", "dark");
  current_theme = "light";
}

function changeToLightTheme() {
  page_background.style.backgroundColor = "white";
  for (let i = 0; i < calculator_buttons.length; i++) {
    calculator_buttons[i].style.color = "white";
    calculator_buttons[i].style.backgroundImage =
      "linear-gradient(160deg, rgba(41, 185, 214, 0.6) 80%, #ffffff 100%)";
      calculator_buttons[i].style.border = "none";
  }
  localStorage.setItem("theme", "light");
  current_theme = "dark";
}

if (current_theme == "dark") {
  changeToDarkMode();
} else {
  changeToLightTheme();
}

theme_button.addEventListener("click", function (e) {
  if (current_theme == "dark") {
    changeToDarkMode();
  } else {
    changeToLightTheme();
  }
});

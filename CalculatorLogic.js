const calc_layout = document.querySelector(".calculator-layout");
const calc_display = document.querySelector(".calculator-display");

let infix_expression = "";

function detectButtonClicks() {
  calc_layout.addEventListener("click", function (e) {
    switch (e.target.id) {
      case "plus":
        infix_expression += " + ";
        calc_display.innerHTML = infix_expression;
        break;

      case "minus":
        infix_expression += " - ";
        calc_display.innerHTML = infix_expression;
        break;

      case "divide":
        infix_expression += " / ";
        calc_display.innerHTML = infix_expression;
        break;

      case "multiply":
        infix_expression += " * ";
        calc_display.innerHTML = infix_expression;
        break;

      case "exponent":
        infix_expression = "^";
        calc_display.innerHTML = infix_expression;
        break;

      case "decimal":
        infix_expression += ".";
        calc_display.innerHTML = infix_expression;
        break;

      case "sin":
        infix_expression += "Sin(";
        calc_display.innerHTML = infix_expression;
        break;

      case "cos":
        infix_expression += "Cos(";
        calc_display.innerHTML = infix_expression;
        break;

      case "tan":
        infix_expression += "Tan(";
        calc_display.innerHTML = infix_expression;
        break;

      case "opening-bracket":
        infix_expression += "(";
        calc_display.innerHTML = infix_expression;
        break;

      case "closing-bracket":
        infix_expression += ")";
        calc_display.innerHTML = infix_expression;
        break;

      case "equal":
        calculateExpression();
        infix_expression = "";
        break;

      case "clear":
        infix_expression = "";
        calc_display.innerHTML = 0;
        break;

      //Using default case to handle all the number buttons.
      default:
        infix_expression += e.target.id;
        calc_display.innerHTML = infix_expression;
        break;
    }
  });
}

detectButtonClicks();

const calc_layout = document.querySelector(".calculator-layout");
const calc_display = document.querySelector(".calculator-display");

let infix_expression = "";

/*
Start with seperating each term in the infix expression. For example, if the expression is 7 + (6 * 7) - (37) will become:
                                                                                          ["7", "+", "(", "6", "*", "7", ")", "-", "(", "3", "7", ")"].
Removes spaces and places the expression in an array that allows me to easily chnage it into a postfix expression.
*/

function removeSpaces() {
  let infix_arr_no_spaces = [];
  let current_number = "";

  for (let i = 0; i < infix_expression.length; i++) {
    if (
      (!isNaN(infix_expression[i]) || infix_expression[i] == ".") &&
      infix_expression[i] != " "
    ) {
      current_number += infix_expression[i];
    } else if (infix_expression[i] == "s") {
      infix_arr_no_spaces.push("s");
      i += 2;
    } else if (infix_expression[i] == "c") {
      infix_arr_no_spaces.push("c");
      i += 2;
    } else if (infix_expression[i] == "t") {
      infix_arr_no_spaces.push("t");
      i += 2;
    } else if (infix_expression[i] != " ") {
      if (current_number != "") {
        infix_arr_no_spaces.push(current_number);
        current_number = "";
      }
      infix_arr_no_spaces.push(infix_expression[i]);
    }
  }

  //Check to see if the current number
  if (current_number != "") {
    infix_arr_no_spaces.push(current_number);
  }

  return infix_arr_no_spaces;
}

function getOperatorPrecedence(symbol) {
  switch (symbol) {
    case "^":
      return 4;

    case "s":
    case "c":
    case "t":
      return 3;

    case "*":
    case "/":
      return 2;

    case "+":
    case "-":
      return 1;

    default:
      return 0;
  }
}
//Using the infix to postfix algorithm so that BODMAS can be taken into account from the typed expression.
function convertToPostFix(infix_expression_no_spaces) {
  let postfix_expression = [];
  let operator_stack = [];
  let current_number = "";
  let symbol = "";
  let precedence = 0;
  let j = 0;

  for (let i = 0; i < infix_expression_no_spaces.length; i++) {
    symbol = infix_expression_no_spaces[i];
    if (!isNaN(symbol) || symbol == ".") {
      current_number += symbol;
    } else {
      if (current_number != "") {
        postfix_expression.push(current_number);
        current_number = "";
      }

      switch (symbol) {
        case "(":
          operator_stack.push(symbol);
          break;

        case ")":
          j = operator_stack.length - 1;
          while (operator_stack.length > 0) {
            if (operator_stack[j] != "(") {
              postfix_expression.push(operator_stack[j]);
              operator_stack.pop();
              j--;
            } else {
              operator_stack.pop();
              j = 0;
              break;
            }
          }
          break;

        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
        case "c":
        case "s":
        case "t":
          precedence = getOperatorPrecedence(symbol);
          j = operator_stack.length - 1;

          while (
            operator_stack.length > 0 &&
            precedence <= getOperatorPrecedence(operator_stack[j])
          ) {
            postfix_expression.push(operator_stack[j]);
            operator_stack.pop();
            j--;
          }

          operator_stack.push(symbol);
          j = 0;
          break;

        default:
          break;
      }
    }
  }

  if (current_number != "") {
    postfix_expression.push(current_number);
  }

  while (operator_stack.length > 0) {
    symbol = operator_stack.pop();
    postfix_expression.push(symbol);
  }

  return postfix_expression;
}

function evaluateExpression(postfix_expression) {
  let operand_stack = [];
  let j = 0;
  let k = 0;
  let first_operand = 0;
  let second_operand = 0;
  let final_answer = 0;

  for (let i = 0; i < postfix_expression.length; i++) {
    if (!isNaN(postfix_expression[i])) {
      operand_stack[j] = parseFloat(postfix_expression[i]);
      j++;
    } else {
      k = operand_stack.length - 1;

      switch (postfix_expression[i]) {
        case "+":
          first_operand = operand_stack[k];
          second_operand = operand_stack[k - 1];
          operand_stack.pop();
          operand_stack.pop();
          final_answer = second_operand + first_operand;
          operand_stack.push(final_answer);
          j--;
          break;

        case "-":
          first_operand = operand_stack[k];
          second_operand = operand_stack[k - 1];
          operand_stack.pop();
          operand_stack.pop();
          final_answer = second_operand - first_operand;
          operand_stack.push(final_answer);
          j--;
          break;

        case "*":
          first_operand = operand_stack[k];
          second_operand = operand_stack[k - 1];
          operand_stack.pop();
          operand_stack.pop();
          final_answer = second_operand * first_operand;
          operand_stack.push(final_answer);
          j--;
          break;

        case "/":
          first_operand = operand_stack[k];
          second_operand = operand_stack[k - 1];
          operand_stack.pop();
          operand_stack.pop();
          final_answer = second_operand / first_operand;
          operand_stack.push(final_answer);
          j--;
          break;

        case "^":
          first_operand = operand_stack[k];
          second_operand = operand_stack[k - 1];
          operand_stack.pop();
          operand_stack.pop();
          final_answer = Math.pow(second_operand, first_operand);
          operand_stack.push(final_answer);
          j--;
          break;

        case "c":
          first_operand = operand_stack[k];
          operand_stack.pop();
          final_answer = Math.cos(first_operand);
          operand_stack.push(final_answer);
          break;

        case "s":
          first_operand = operand_stack[k];
          operand_stack.pop();
          final_answer = Math.sin(first_operand);
          operand_stack.push(final_answer);
          break;

        case "t":
          first_operand = operand_stack[k];
          operand_stack.pop();
          final_answer = Math.tan(first_operand);
          operand_stack.push(final_answer);
          break;
      }
    }
  }
  return final_answer;
}

function calculateExpression() {
  let infix_expression_no_spaces = removeSpaces();
  let postfix_expression = convertToPostFix(infix_expression_no_spaces);
  calc_display.innerHTML = evaluateExpression(postfix_expression);
}

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
        infix_expression += "^";
        calc_display.innerHTML = infix_expression;
        break;

      case "decimal":
        infix_expression += ".";
        calc_display.innerHTML = infix_expression;
        break;

      case "sin":
        infix_expression += "sin(";
        calc_display.innerHTML = infix_expression;
        break;

      case "cos":
        infix_expression += "cos(";
        calc_display.innerHTML = infix_expression;
        break;

      case "tan":
        infix_expression += "tan(";
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

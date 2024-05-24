// Defaults in preparation for keeping track of the values being entered by the user:
const Calculator = {
    Display_Value: '0',
    First_Operand: null,
    Wait_Second_Operand: false,
    operator: null,
};


// Keep track of what numerals were inputted by the user:
function Input_Digit(digit) {
    const {Display_Value, Wait_Second_Operand} = Calculator;
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    }
    else {
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}


// Allow for decimal points while preventing accidental additional clicking of the dot:
function Input_Decimal(dot) {
    if (Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        Calculator.Display_Value += dot;
    }
}




// Add functionality to the operator buttons:
const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
}

function Handle_Operator(Next_Operator) {
    // Store the currently displayed number in First_Operand:
    const {First_Operand, Display_Value, operator} = Calculator;
    const Value_of_Input = parseFloat(Display_Value);

    // Check whether an operator already exists, and update the operator
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    }
    else if (operator) {
        const Value_New = First_Operand || 0;
        let result = Perform_Calculation[operator](Value_New, Value_of_Input);
        // Limit the amount of numerals after the decimal to 9 and remove any trailing zeros:
        result = Number(result).toFixed(9);
        result = (result *1).toString();
        Calculator.Display_Value = parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}


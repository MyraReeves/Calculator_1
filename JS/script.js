// Defaults in preparation for keeping track of the values being entered by the user:
const Calculator = {
    Display_Value: '0',
    First_Operand: null,
    Wait_Second_Operand: false,
    operator: null,
};


// Keep track of what was inputted by the user:
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


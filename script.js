class MathGenius {
    constructor(prevEntry, currEntry) {
        this.prevEntry = prevEntry;
        this.currEntry = currEntry;
        this.initialize();
    }

    initialize() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    removeLastDigit() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    addDigit(digit) {
        if (digit === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + digit.toString();
    }

    selectOperation(operator) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.performCalculation();
        }
        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    performCalculation() {
        let result;
        const prevVal = parseFloat(this.previousOperand);
        const currentVal = parseFloat(this.currentOperand);
        if (isNaN(prevVal) || isNaN(currentVal)) {
            return;
        }
        switch (this.operation) {
            case '+':
                result = prevVal + currentVal;
                break;

            case '-':
                result = prevVal - currentVal;
                break;

            case '*':
                result = prevVal * currentVal;
                break;

            case '÷':
                result = prevVal / currentVal;
                break;

            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    formatDisplayedNumber(digit) {
        const strDigit = digit.toString();
        const intPart = parseFloat(strDigit.split('.')[0]);
        const decimalPart = strDigit.split('.')[1];
        let intDisplay;
        if (isNaN(intPart)) {
            intDisplay = '';
        } else {
            intDisplay = intPart.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }
        if (decimalPart !== null) {
            return `${intDisplay}.${decimalPart}`;
        } else {
            return intDisplay;
        }
    }

    updateDisplay() {
        this.currEntry.innerText = this.formatDisplayedNumber(
            this.currentOperand
        );
        if (this.operation !== null) {
            this.prevEntry.innerText = `${this.formatDisplayedNumber(
                this.previousOperand
            )} ${this.operation}`;
        } else {
            this.prevEntry.innerText = '';
        }
    }
}

const digitButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevEntry = document.querySelector('[data-previous-entry]');
const currEntry = document.querySelector('[data-current-entry]');

const mathGenius = new MathGenius(prevEntry, currEntry);

digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        mathGenius.addDigit(button.innerText);
        mathGenius.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        mathGenius.selectOperation(button.innerText);
        mathGenius.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    mathGenius.performCalculation();
    mathGenius.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    mathGenius.initialize();
    mathGenius.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    mathGenius.removeLastDigit();
    mathGenius.updateDisplay();
});

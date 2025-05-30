class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) {
        if (b === 0) throw new Error("Деление на ноль");
        return a / b;
    }

    calculate(operation, a, b) {
        switch (operation) {
            case '+': return this.add(a, b);
            case '-': return this.subtract(a, b);
            case '*': return this.multiply(a, b);
            case '/': return this.divide(a, b);
            default: throw new Error("Неизвестная операция");
        }
    }
}

const calc = new Calculator();
const display = document.getElementById("display");
let currentInput = "";

function updateDisplay() {
    display.value = currentInput;
}

function appendValue(value) {
    if (value === '=') {
        evaluateExpression();
        return;
    }
    currentInput += value;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

function tokenize(input) {
    const tokens = [];
    let number = "";
    for (let char of input) {
        if (!isNaN(char) || char === '.') {
            number += char;
        } else {
            if (number) {
                tokens.push({ type: 'number', value: parseFloat(number) });
                number = "";
            }
            tokens.push({ type: 'operator', value: char });
        }
    }
    if (number) tokens.push({ type: 'number', value: parseFloat(number) });
    return tokens;
}

function evaluateExpression() {
    try {
        const tokens = tokenize(currentInput);
        if (tokens.length === 0) return;

        let result = tokens[0].value;
        for (let i = 1; i < tokens.length; i++) {
            if (tokens[i].type === 'operator') {
                const op = tokens[i].value;
                const nextNum = tokens[++i]?.value;
                if (nextNum === undefined) throw new Error("Некорректное выражение");
                result = calc.calculate(op, result, nextNum);
            }
        }
        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        alert(error.message);
        clearDisplay();
    }
}

const buttonContainer = document.getElementById("buttonContainer");

const buttons = [
    ['C', '/', '*', '-'],
    ['7', '8', '9', '+'],
    ['4', '5', '6', '='],
    ['1', '2', '3', ''],
    ['0', '.', '', '']
];

buttons.forEach(row => {
    row.forEach(label => {
        if (!label) return;

        const button = document.createElement("button");
        button.textContent = label;

        if (label === '+' || label === '-' || label === '*' || label === '/') {
            button.classList.add('operator');
        } else if (label === '=') {
            button.classList.add('equal');
        } else if (label === 'C') {
            button.classList.add('clear');
        }

        button.addEventListener("click", () => {
            if (label === 'C') {
                clearDisplay();
            } else if (label === '=') {
                appendValue('=');
            } else {
                appendValue(label);
            }
        });

        buttonContainer.appendChild(button);
    });
});
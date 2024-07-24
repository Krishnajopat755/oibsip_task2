document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const resultDisplay = document.querySelector('.result');
    const buttons = document.querySelectorAll('button');
    let displayValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.innerText;

            if (buttonText === 'clear') {
                displayValue = '';
                display.value = displayValue;
                resultDisplay.textContent = '';
            } else if (buttonText === 'del') {
                displayValue = displayValue.slice(0, -1);
                display.value = displayValue;
            } else if (buttonText === 'ENTER') {
                try {
                    resultDisplay.textContent = eval(displayValue.replace('x', '*').replace('÷', '/').replace('√', 'Math.sqrt'));
                } catch {
                    resultDisplay.textContent = 'Error';
                }
            } else {
                displayValue += buttonText;
                display.value = displayValue;
            }
        });
    });
});

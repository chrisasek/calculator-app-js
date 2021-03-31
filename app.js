let screen = document.querySelector('.screen');
document.addEventListener('transitionend', function (e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('click');
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains('clear')) { // digit;
        e.target.classList.add('click');
        screen.innerText = ''; // clear screen
    }

    if (e.target.classList.contains('digit')) { // digit;
        e.target.classList.add('click');
        screen.innerText += e.target.getAttribute('data-value'); // get value and append to screen
    }

    if (e.target.classList.contains('symbol')) { // digit
        e.target.classList.add('click');

        let screen_text = screen.innerText;
        let symbol_value = e.target.getAttribute('data-value');

        if (screen_text.length > 0) {
            let last_value = screen_text.charAt(screen_text.length - 1);

            if (symbol_value == '=') {
                if (!isSymbol(last_value)) {
                    console.log('here')
                    symbol_position = screen_text.search(/[+|\-|/|*]/i);
                    let first_number = screen_text.substring(0, symbol_position);
                    let last_number = screen_text.substring(symbol_position + 1);

                    screen.innerText = calculate(first_number, last_number, screen_text[symbol_position]);
                }
                return;
            }

            if (isSymbol(last_value)) {
                if (last_value.indexOf(symbol_value) == -1) {
                    screen.innerText = screen.innerText.replace(last_value, e.target.getAttribute('data-value'));
                }
            } else {
                if (hasSymbol(screen_text)) {
                    symbol_position = screen_text.search(/[+|\-|/|*]/i);
                    let first_number = screen_text.substring(0, symbol_position);
                    let last_number = screen_text.substring(symbol_position + 1);

                    screen.innerText = calculate(first_number, last_number, screen_text[symbol_position]) + e.target.getAttribute('data-value');
                } else {
                    screen.innerText += e.target.getAttribute('data-value'); // get value and append to screen
                }
            }
        }
    }
});

function isSymbol(sym) {
    symbols = ['+', '-', '/', '*'];
    return symbols.indexOf(sym) == -1 ? false : true;
}
function hasSymbol(text) {
    return text.search(/[+|\-|/|*]/i) == -1 ? false : true;
}
function calculate(first_number, last_number, sym) {
    switch (sym) {
        case '+':
            return parseFloat(first_number) + parseFloat(last_number);
            break;
        case '-':
            return parseFloat(first_number) - parseFloat(last_number);
            break;
        case '/':
            return parseFloat(first_number) / parseFloat(last_number);
            break;
        case '*':
            return parseFloat(first_number) * parseFloat(last_number);
            break;
    }

    return 0;
}
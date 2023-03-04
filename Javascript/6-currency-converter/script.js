const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const rate = data.rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

// Event listeners

convert.addEventListener('click', () => {

    currencyEl_one.addEventListener('change', convert);
    currencyEl_two.addEventListener('change', convert);
    amountEl_one.addEventListener('input', convert);
    amountEl_one.addEventListener('input', convert);

    calculate();

    var sound = new Audio('coin.mp3');
    sound.play();
});

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();

    var sound = new Audio('coin.mp3');
    sound.play();
});

calculate();
import { getRates } from './modules/getRates';
import { validate } from './modules/validate';

const input = document.querySelector('#num');
const selectFrom = document.querySelector('#rate-num');
const selectTo = document.querySelector('#rate');
const btn = document.querySelector('#btn');
const total = document.querySelector('.total');

const textBtn = btn.textContent;

const getRateValues = ({ eurRUB, usdRUB, eurUSD }) => {
    const amount = input.value;
    const fromRate = selectFrom.value;
    const toRate = selectTo.value;
    let totalAmount = 0;

    switch (fromRate) {
        case 'RUB':
            if (toRate == 'EUR') {
                totalAmount = amount / eurRUB;
            } else if (toRate == 'USD') {
                totalAmount = amount / usdRUB;
            } else {
                totalAmount = amount;
            }
            break;
        case 'USD':
            if (toRate == 'EUR') {
                totalAmount = amount / eurUSD;
            } else if (toRate == 'RUB') {
                totalAmount = amount * usdRUB;
            } else {
                totalAmount = amount;
            }
            break;
        case 'EUR':
            if (toRate == 'USD') {
                totalAmount = amount * eurUSD;
            } else if (toRate == 'RUB') {
                totalAmount = amount * eurRUB;
            } else {
                totalAmount = amount;
            }
            break;
    }
    total.value = Math.floor(totalAmount * 100) / 100;
};

validate(input);

btn.addEventListener('click', () => {
    if (input.value) {
        btn.setAttribute('disabled', 'disabled');
        btn.textContent = 'Загрузка...';
        getRates()
            .then(data => {
                getRateValues(data);
                btn.textContent = textBtn;
                btn.removeAttribute('disabled');
            })
            .catch(error => {
                btn.textContent = 'Ошибка сервера';
            });
    }
});

// getRates().then(data => {
//     console.log(data);
// });

export const getRates = () => {
    let eurUSD;
    let eurRUB;
    let usdRUB;
    let key = '00419ec7a05ae1d6c25a25ab41ae7300';

    return fetch('http://api.exchangeratesapi.io/v1/latest?access_key=' + key + '&symbols=USD,RUB')
        .then(res => res.json())
        .then(data => {
            eurUSD = data.rates.USD;
            eurRUB = data.rates.RUB;
            usdRUB = eurRUB / eurUSD;

            return { eurRUB, usdRUB, eurUSD };
        });
};

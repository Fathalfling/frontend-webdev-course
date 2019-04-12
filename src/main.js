let baseCurrency = 'EUR'

const isLoading = document.getElementById('isLoading');
isLoading.style.display = 'none';

document.getElementById('base').onchange = (e) =>{
baseCurrency = e.target.value;
const currencyIndicator = document.getElementById('currency-indicator');
if(baseCurrency === 'EUR')
    currencyIndicator.innerHTML = '&euro;';
else if (baseCurrency === 'USD')
    currencyIndicator.innerHTML = '&dollar;';    
};

const exchangeRatesAjax = new XMLHttpRequest();
exchangeRatesAjax.addEventListener ('load', (e) => {

    const currenyList = document.getElementById('currency-list');
    currenyList.innerHTML = '';

    const sumValue = document.getElementById('sum').value;
    const exchangeRates = JSON.parse(exchangeRatesAjax.responseText);

    Object.entries(exchangeRates.rates).forEach((item) =>{
    const currencyName = item[0];
    let value = item[1] * sumValue;
    value = value.toFixed(2);
    console.log(value);

    const listItemElement = document.createElement('li');
    listItemElement.innerHTML = `<div>${currencyName}</div><div>${value}</div>`;
    currenyList.appendChild(listItemElement);
    });

    isLoading.style.display = 'none';

});

document.getElementById('currency-converter-form').onsubmit = (e)=>{
    e.preventDefault();

    isLoading.style.display = 'flex';

    exchangeRatesAjax.open('GET','https://api.exchangeratesapi.io/latest?base=' + baseCurrency);
    exchangeRatesAjax.send();
};
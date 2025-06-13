document.addEventListener("DOMContentLoaded", () => {
    const currencyContainer = document.getElementById('currency-rates');

    fetch('https://www.cbr-xml-daily.ru/daily_json.js') 
        .then(response => response.json())
        .then(data => {
            const rates = data.Valute;

            const currenciesToShow = ['USD', 'EUR', 'GBP', 'JPY'];

            currenciesToShow.forEach(code => {
                if (rates[code]) {
                    const div = document.createElement('div');
                    div.className = 'currency-item';
                    div.textContent = `${rates[code].Name}: ${rates[code].Value.toFixed(2)} руб.`;
                    currencyContainer.appendChild(div);
                }
            });
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
            currencyContainer.textContent = 'Не удалось загрузить данные о курсах валют.';
        });
});
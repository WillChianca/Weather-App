const weatherIcon = document.querySelector('.weather-icon');
const weatherTemp = document.querySelector('.weather-temp');
const weatherLocation = document.querySelector('.weather-location');
const descriptionElement = document.querySelector('.descriptions');
const htmlElement = document.documentElement;

navigator.geolocation.getCurrentPosition(OnSucess, OnError);


function OnSucess(data) {
    console.log(data);

    const lon = data.coords.longitude;
    const lat = data.coords.latitude;

    const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
    const appid = '5728f34643befa0d9cc117a200141288';
    const units = 'metric';
    const lang = 'pt';

    const url = `${endpoint}?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}&lang=${lang}`;

    // send the location data to the API

    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data);



            const IconCode = data.weather[0].icon;
            const descriptions = data.weather[0].descriptions;
            const temp = `${Math.floor(data.main.temp)}º`;



            weatherIcon.src = `images/${IconCode}.png`;
            weatherIcon.alt = descriptions;
            
            weatherLocation.innerText = data.name;
            weatherTemp.innerText = `${temp}`;


            weatherTemp.innerText = temp;
            descriptionElement.innerText = getDesc(IconCode);

            htmlElement.classList.remove('js-loading');
        });
    
}

function OnError(error) {
    console.error(error);
}

const descriptions = {
    '01d': 'Lembre-se de colocar protetor solar!',
    '01n': 'Boa Noite!',
    '02d': 'Variável...',
    '02n': 'Cuidado com os lobisomens...',
    '03d': 'Luz perfeita pra fotos!',
    '03n': 'Durma bem :)',
    '04d': 'Hoje: o caso de um céu britânico :)',
    '04n': 'Muita nuvem, nem da pra ver a lua!',
    '09d': 'You might need a brolly.',
    '09n': 'Se cubra bem hj',
    '10d': 'Você precisa de 2 guarda-chuva',
    '10n': 'Don\'t expose bare skin to the sun!',
    '11d': 'Vista botas fortes!',
    '11n': 'Deve ter 1 ou 2 brilhos no céu',
    '13d': 'Tempo bom pra fazer boneco de neve.',
    '13n': 'Noite perfeita pra estar embaixo das estrlas!',
    '50d': 'Luzes de nevoeiro precisa ta ligada!',
    '50n': 'Dirija com cuidado!',
}

function getDesc(IconCode) {
    return descriptions[IconCode];
}
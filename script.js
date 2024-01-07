const apikey = 'aff1633438a64fd194f172859230811';
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const card = document.querySelector('.card');
const day = document.querySelector('.day');
var city;

btn.addEventListener('click', function (e) {

    e.preventDefault();
    city = input.value.trim();
    console.log(city);

    //api прогноз погоди
    const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}.`;

    fetch(url).then((response) => {

        return response.json();

    }).then((data) => {

        var oclock = data.current.last_updated.substr(11, 2);
        console.log(oclock);
        var timeDay;

        switch (oclock) {
            case '00', '01', '02', '03', '04', '05':
                timeDay = 'ночь';
                break;
            case '06', '07', '08', '09', '10', '11':
                timeDay = 'утро';
                break;
            case '12', '13', '14', '15', '16', '17':
                timeDay = 'день';
                break;
            case '18', '19', '20', '21', '22', '23':
                timeDay = 'вечер';
                break;

                day.innerHTML =timeDay;
    }
    

        console.log(data);

        //функция ошибки 
        function showError() {
            var error;
            error = '<div class="error">Упс! Такого города не существует.Попробуйте ещё раз...</div>';
            card.innerHTML = error;
            setTimeout(function(){location.reload()}, 5000);
        }


        //функция успешного поиска 
        function succesfully() {
            var Cloud = data.current.cloud;
            var humidity = data.current.humidity;

            const html = `<h2 class="card-city">${data.location.name}<span class="span">${data.location.country}</span>
            <span class="time">${data.current.last_updated.substr(11, 5)}<span>
            </h2>
            <div class="card-weather">
            <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
            <img class="card-img" src="./Weather.png" alt="Weather"> 
            </div>
            <div class="card-description"><span>Облачно: ${Cloud}%</span><span>Влажность: ${humidity}%</span></div>`;
            card.innerHTML = html;
        }

        if (data.error) {
            showError();
        }
        else {
            succesfully();
        }

    });

});
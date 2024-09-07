let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");


let W_feelsLike = document.querySelector(".weather_feelslike");
let W_humidity = document.querySelector(".weather_humidity");
let W_wind = document.querySelector(".weather_wind");
let W_pressure = document.querySelector(".weather_pressure");

let city_search = document.querySelector(".weather_search");


const getCountryName = (code) =>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);

}


const getDateTime = (dt) =>{
    const curdate = new Date(dt * 1000);
    console.log(curdate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minutes: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    // console.log(formatter);
    return formatter.format(curdate);
};

let city = "pune";

city_search.addEventListener('submit',(e)=>{
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
})



const getWeatherData = async ()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=893f1face3abca21c4bf05fdec039962`;

    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const { main, name, weather, wind, sys, dt} = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = `${weather[0].main}`
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

        w_temperature.innerHTML = `${(main.temp/10).toFixed()}&#176`;
        w_minTem.innerHTML = `Min: ${(main.temp_min.toFixed()/10)}&#176`;
        w_maxTem.innerHTML = `Max: ${(main.temp_max.toFixed()/10)}&#176`;

        W_feelsLike.innerHTML = `${main.feels_like}&#176`;
        W_humidity.innerHTML = `${main.humidity}%`;
        W_wind.innerHTML = `${wind.speed} m/s`;
        W_pressure.innerHTML = `${main.pressure} hpa`;

    }catch(error){
        console.log(error);
    }
};

document.body.addEventListener('load', getWeatherData());
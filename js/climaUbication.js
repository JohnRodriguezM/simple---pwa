"use strict";
const d = document;
const containerClima = d.getElementById("reporteClima");
const $p = d.getElementById("error");
const API_KEY = "4a7462df98952a0df1e59bf3a6307cfb";
// para pintar en el DOM
const elements = {
  estadoClima: d.querySelector(".estadoClima"),
  /* p2: d.querySelector(".description"),
  p3: d.querySelector(".id"), */
  ptemMin: d.querySelector(".temMin"),
  ptemMax: d.querySelector(".temMax"),
  pSensacion: d.querySelector(".sensacionTem"),
  city: d.querySelector(".city"),
  country: d.querySelector(".country"),
};

const siHayError = (error) => {
  console.log(error);
  if (error.code === 1) {
    return ($p.innerHTML = `please give permission to access and reload the page`);
  }
  if (error.code === 3) {
    return ($p.innerHTML = `This position isn't available`);
  }
};

/* response.weather.main
- Clouds
- Clear
- Extreme
-Snow
-Rain

*/

const imagenCLima = (temperatura, estado_clima) => {
  // configuracion para la imagen del clima
  // primero para clear
  if (temperatura > 28 && estado_clima === "Clear") {
    document.getElementById("img-clima").title = `It's a little hot`;
    return (document.getElementById(
      "img-clima"
    ).src = `../assets/subeBaja.png`);
  }
  if (temperatura > 32 && estado_clima === "Clear") {
    return (document.getElementById(
      "img-clima"
    ).src = `../assets/caliente.png`);
  }
  // para clouds
  if (temperatura < 30 && estado_clima === "Clouds") {
    document.getElementById("img-clima").title = `You don't need an umbrella, yet`;
    return document.getElementById("img-clima").src = `../assets/nube.png`;
  }
  // para frio normal
  if(temperatura < 17 && estado_temperatura === "Clouds"){

    return document.getElementById("img-temperatura").src = `../assets/frio.png`
  }
  //para Rain
  if (estado_clima === "Rain") {
    return document.getElementById("img-clima").src = `../assets/rain-withoutsun.png`;
  }
  // para estado extreme
  if(temperatura > 32 && estado_clima === 'Extreme'){
    return document.getElementById("img-clima").src = `../assets/extremeHot.png`;
  }
  if(temperatura < 32 && estado_clima === 'Extreme'){
    return document.getElementById("img-clima").src = `../assets/extreme.png`;
  }
  // para snow
  if(temperatura < 0 && estado_clima === 'Snow'){
    return document.getElementById("img-clima").src = `../assets/cold-withoutsnow.png`
  }
};

const getData = async (puesto) => {
  const { latitude, longitude } = puesto.coords;
  try {
    const { city, country, ptemMin, pSensacion, estadoClima } = elements;
    let peticion = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    let response = await peticion.json();
    console.log(response);
    // para info main
    let main = [response.main];
    city.innerHTML = `${response.name}`;
    country.innerHTML = `- ${response.sys.country}`;
    ptemMin.innerHTML = `${response.main.temp.toFixed(1)} °C`;
    pSensacion.innerHTML = `${response.main.feels_like.toFixed(1)} °C -- thermal sensation`;
    estadoClima.innerHTML = response.weather[0].main;
    imagenCLima(response.main.temp, response.weather[0].main);
  } catch (error) {
    console.log(`Ha ocurrido un grave error en el manejo de la peticón`);
  }
};

// hace todo el trabajo de hallar la geolocalizacion
const locationn = () => {
  navigator.geolocation.getCurrentPosition(getData, siHayError);
};

// para la fecha y el reloj que se muestran en la card del tiempo
const fecha = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let time = setTimeout(() => {
    fecha();
  }, 900000);
  document.getElementById(
    "fecha"
  ).innerHTML = ` ----  ${day} / ${month} / ${year}`;
  console.log(day, month, year);
};
fecha();
function startTime() {
  let today = new Date();
  // para horas
  let hr = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  //Add a zero in front of numbers<10
  min = checkTime(min);
  sec = checkTime(sec);
  let time = setTimeout(function () {
    startTime();
  }, 1000);
  document.getElementById("time").innerHTML = `${hr} : ${min} : ${sec}  `;
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
    Number(i);
  }
  return i;
}
startTime();

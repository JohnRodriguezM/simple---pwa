"use strict";

export const d = document;
export const API_KEY = "4a7462df98952a0df1e59bf3a6307cfb";
const inputLatitud = d.getElementById("longitude");
const form = d.getElementById("find");
const $p = d.getElementById("error");
// para pintar en el DOM
const elements = {
  estadoClima: d.querySelector(".estadoClima"),
  ptemMin: d.querySelector(".temMin"),
  ptemMax: d.querySelector(".temMax"),
  pSensacion: d.querySelector(".sensacionTem"),
  city: d.querySelector(".city"),
  country: d.querySelector(".country"),
  visibility: d.querySelector(".visibility"),
  porcentajeNubes: d.querySelector(".cloudsporcentaje"),
  speedWind: d.querySelector(".speedWind"),
};

// para la imagen del clima
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
  if (temperatura < 0) {
    return (document.getElementById(
      "img-clima"
    ).src = `../assets/cold-withoutsnow.png`);
  }
  if (temperatura < 18) {
    return (document.getElementById("img-clima").src = `../assets/frio.png`);
  }

  if (temperatura < 30 && temperatura > 18 && estado_clima === "Clouds") {
    document.getElementById(
      "img-clima"
    ).title = `You don't need an umbrella, yet`;
    return (document.getElementById("img-clima").src = `../assets/nube.png`);
  }
  // para frio normal
  //para Rain
  if (estado_clima === "Rain") {
    return (document.getElementById(
      "img-clima"
    ).src = `../assets/rain-withoutsun.png`);
  }
  // para estado extreme
  if (temperatura > 32 && estado_clima === "Extreme") {
    return (document.getElementById(
      "img-clima"
    ).src = `../assets/extremeHot.png`);
  }
  if (temperatura < 32 && estado_clima === "Extreme") {
    return (document.getElementById("img-clima").src = `../assets/extreme.png`);
  }
  // para snow
};
// para el almacenamiento en localStorage
function guardarLocalStorage(responsee) {
  localStorage.setItem("respuesta", JSON.stringify(responsee));
}
// para obtener los datos almacenados en el local storage
function getDataLocalStorage() {
  const {
    city,
    country,
    ptemMin,
    pSensacion,
    estadoClima,
    visibility,
    porcentajeNubes,
    speedWind,
  } = elements;
  if (localStorage.getItem("respuesta")) {
    // se ejecuta porque existe
    let respuesta = JSON.parse(localStorage.getItem("respuesta"));
    speedWind.innerHTML = `${respuesta.wind.speed} Km`;
    porcentajeNubes.innerHTML = `${respuesta.clouds.all} %`;
    city.innerHTML = `${respuesta.name}`;
    country.innerHTML = `- ${respuesta.sys.country}`;
    ptemMin.innerHTML = `${respuesta.main.temp.toFixed(1)} °C`;
    pSensacion.innerHTML = `${respuesta.main.feels_like.toFixed(
      1
    )} °C -- thermal sensation`;
    estadoClima.innerHTML = respuesta.weather[0].main;
    visibility.innerHTML = ` ${respuesta.visibility / 1000} Km`;
    imagenCLima(respuesta.main.temp, respuesta.weather[0].main);
    console.log(respuesta);
  } else {
    console.error("No hay entradas en local storage");
  }
}
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
-Haze

*/
const getData = async (puesto) => {
  const { latitude, longitude } = puesto.coords;
  try {
    const {
      city,
      country,
      ptemMin,
      pSensacion,
      estadoClima,
      visibility,
      porcentajeNubes,
      speedWind,
    } = elements;
    let peticion = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputLatitud.value}&appid=${API_KEY}&units=metric`
    );
    let response = await peticion.json();
    guardarLocalStorage(response);
    // me permite guardar el objeto que viene en la respuesta dentro del local storage
    // insercion de elementos en el DOM
    speedWind.innerHTML = `${response.wind.speed} Km`;
    porcentajeNubes.innerHTML = `${response.clouds.all} %`;
    city.innerHTML = `${response.name}`;
    country.innerHTML = `- ${response.sys.country}`;
    ptemMin.innerHTML = `${response.main.temp.toFixed(1)} °C`;
    pSensacion.innerHTML = `${response.main.feels_like.toFixed(1)} °C -- thermal sensation`;
    estadoClima.innerHTML = response.weather[0].main;
    visibility.innerHTML = `${response.visibility / 1000} Km `;
    imagenCLima(response.main.temp, response.weather[0].main);
  } catch (error) {
    alert(`Please try again, maybe this city isn't exist`);
  }
};

// hace todo el trabajo de hallar la geolocalizacion
export const locationn = (e) => {
  if (e.target === form) e.preventDefault();
  navigator.geolocation.getCurrentPosition(getData, siHayError);
};

// se manda a llamar la funcion de activacion
form.addEventListener("submit", locationn, true);
document.addEventListener("DOMContentLoaded", getDataLocalStorage);

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

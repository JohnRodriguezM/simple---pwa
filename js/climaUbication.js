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


const imagenCLima = (temperatura,estado_clima) => {

}


const getData = async (puesto) => {
  const { latitude, longitude } = puesto.coords;
  try {
    const { city, country, ptemMin, pSensacion, estadoClima, p2, p3 } = elements;
    let peticion = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    let response = await peticion.json();
    console.log(response);
    // para info main
    let main = [response.main];
    city.innerHTML = `${response.name}`;
    country.innerHTML = `- ${response.sys.country}`;
    main.forEach((el) => {
      ptemMin.innerHTML = `${el.temp.toFixed(1)} °C`;
      pSensacion.innerHTML = `${el.feels_like.toFixed(
        1
      )} °C - sensacion térmica`;
    });
    response.weather.forEach((el) => {
      estadoClima.innerHTML = el.main;
      /* p2.innerHTML = el.description;
      p3.innerHTML = el.id; */
    });
  } catch (error) {
    console.log(`Ha ocurrido un grave error en el manejo de la peticón`);
  }
};

// hace todo el trabajo de hallar la geolocalizacion
const locationn = () => {
  navigator.geolocation.getCurrentPosition(getData, siHayError);
};




/* setInterval(()=>{
  console.log(`${date.getDate()} ---- ${date.getMonth() + 1} --- ${date.getFullYear()}`)
},1000) */
/* 
setInterval(()=>{
  console.log(`${date.getHours()} ---- ${date.getMinutes()} ---- ${date.getSeconds() + 1}`);
},1000) */

const fecha = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let time = setTimeout(() => {fecha();},900000);
  document.getElementById('fecha').innerHTML = ` ----  ${day} / ${month} / ${year}`
  console.log(day,month,year);
}
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
  let time = setTimeout(function(){ startTime() }, 1000);
  document.getElementById("time").innerHTML = `${hr} : ${min} : ${sec}  `;
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
      Number(i)
  }
  return i;
}
startTime()
"use strict";
const d = document;
const containerClima = d.getElementById("reporteClima");
console.log(containerClima);
// para pintar en el DOM
let elements = {
  p1: d.querySelector(".clouds"),
  p2: d.querySelector(".description"),
  p3: d.querySelector(".id"),
  ptemMin: d.querySelector('.temMin'),
  ptemMax: d.querySelector('.temMax'),
  pSensacion: d.querySelector('.sensacionTem')
};
let fragment = d.createDocumentFragment();
const API_KEY = "4a7462df98952a0df1e59bf3a6307cfb";
let $p = d.getElementById("error");


function conversion(element,K){
    let i = K - 273.15;
    return element.i

}

conversion(297)

const siHayError = (error) => {
  console.log(error);
  if (error.code === 1) {
    return ($p.innerHTML = `please give permission to access and reload the page`);
  }
  if (error.code === 3) {
    return ($p.innerHTML = `This position isn't available`);
  }
};

const getData = async (puesto) => {
  const { latitude, longitude } = puesto.coords;
  try {
    let peticion = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    let response = await peticion.json();
    console.log(response);
    // para info main
    let main = [response.main];
    console.log(main);
    main.forEach((el) => {
        let kel = 273.15;
        elements.ptemMin.innerHTML = `${(el.temp_min - kel).toFixed(1)} °C`;
        elements.ptemMax.innerHTML = `${(el.temp_max - kel).toFixed(1)} °C`;
        elements.pSensacion.innerHTML = `${(el.feels_like - kel).toFixed(1)} °C`;
    });
    response.weather.forEach((el) => {
      elements.p1.innerHTML = el.main;
      elements.p2.innerHTML = el.description;
      elements.p3.innerHTML = el.id;
    });
  } catch (error) {
    console.log(`errorfffffff`);
  }
};

const locationn = async () => {
  navigator.geolocation.getCurrentPosition(getData, siHayError);
};

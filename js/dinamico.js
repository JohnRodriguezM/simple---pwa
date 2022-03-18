"use strict";
const d = document;
const containerClima = d.getElementById('reporteClima')
console.log(containerClima)
// para pintar en el DOM

const necesarios = {
    fragment: d.createDocumentFragment(),
    template: d.getElementById('template').content,
}


const API_KEY = "4a7462df98952a0df1e59bf3a6307cfb";
let $p = d.getElementById("error");

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
  const { latitude, longitude } = puesto.coords
  try {
    let peticion = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    let response = await peticion.json();
    let weather = await response.weather;
    weather.forEach(el => {
        /* const {template,fragment} = necesarios; */
        console.log(el.main)
        necesarios.template.querySelector('#temperatura').textContent = el.main;
        necesarios.template.querySelector('#sensacionTermica').textContent = el.description;

        let node = d.importNode(template,true);
        necesarios.fragment.appendChild(node)
    })
    containerClima.appendChild(necesarios.fragment);
  } catch (error) {}
};

const locationn = async () => {
  navigator.geolocation.getCurrentPosition(getData, siHayError);
};

d.addEventListener('DOMContentLoaded',getData)

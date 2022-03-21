"use strict";
/* if(e.which === 13){
      alert("this option isn't available yet")} */
/* let form = document.getElementById('find')
const findCity = async (position) => {
  const { latitude, longitude } = position.coords;
  try {
    let peticion = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    let response = await peticion.json();
    console.log(peticion)
  } catch (err) {}
};
const ubicacion = (e) => {
  navigator.geolocation.getCurrentPosition(findCity);
  if(e.target === form) e.preventDefault();
};
document.getElementById("find").addEventListener("submit", ubicacion); */

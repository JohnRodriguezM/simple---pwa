/* console.log('------------------ llamado a otra api') */

import {locationn,d,API_KEY} from './climaUbication.mjs'






const getDataDays = async position => {
  const {latitude,longitude} = position.coords;
  try {
    let peticion = await fetch(`https://api.openweathermap.org/data/2.5/roadrisk?appid={API_KEY}`)
    let response = await peticion.json()
    console.log(response)
  }
  catch (err) {}
  finally {console.log(`yo siemppre salgo`)}
}

// se creo la funcion basica again para no generar confuncion
const locacion = () => {
  navigator.geolocation.getCurrentPosition(getDataDays);
};
d.addEventListener('DOMContentLoaded',locacion)

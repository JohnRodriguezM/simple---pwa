'use strict';


const posistion = puesto => {
    console.log(puesto)
}

const geoLocation = () => {
    console.log(navigator.geolocation.getCurrentPosition(posistion))
    
}

document.body.addEventListener('onload',geoLocation)
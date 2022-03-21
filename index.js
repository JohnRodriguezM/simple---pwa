/* 'use strict'; */

//se condiciona la existencia o la capacidad del uso del service worker dentro del navegador
// entonces se hace el condicional
// luego de eso se hace el 'registro del service worker que en este caso va a estar en el archivo sw.js'
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(res => console.log(`registro ${res}`))
    .catch(err => console.error(`haz tenido un error: ${err}`))
}







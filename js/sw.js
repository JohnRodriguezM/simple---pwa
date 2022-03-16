"use strict";

/*
1. asignar un nombre a la version de nuestro cache y una de las caracteristicas que tienen las pwa es que nos permiten guardar en cache todos los recurso estáticos que a lo mejor no van a cambiar en nuestra app y que los podemos guardar directamente en el disco duro del usuario

adicionalmente la pwa tiene una caracteristicas un poco mas avanzadas
como:
    - API DE SINCRONIZACION EN SEGUNDO PLANO
    - LANZAR NOTIFICACIONES PUS
*/

// entonces creo mi nombre de cache

const CACHE_NAME = "v1_cache_aprende_web";


const urlToCache = [
    "./",
    "../html/index.html",
    "https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
    "../css/styles.css",
    "../js/index.js",
    "../js/navBar.js",
    "../assets/logo.webp",
    "../assets/images.png",
  ];

  

// ahora, los serviceWorker van a tener 3 eventos muy importantes
// el self es para hacer referencia a si mismo
/*
1.
durante la fase de instalacion, generalmente se alamacena en cache los archivos estáticos
*/
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlToCache)
        })
        .then(() => {
            self.skipWaiting()
        })
        .catch((err) => {
            console.error(err)
        })
    )
});

/*
2.
una vez se instala el service Worker, se activa y busca los recursos para hacer que funcione sin conexión
*/

// le vamos a programar eventos que incluso se ejecuten sin conexion
self.addEventListener("activate", (e) => {
    const cacheWhiteList = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            cacheNames.map((cacheName) => {
                //eliminamos lo que ya no se necesita en cache
                if(cacheName.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName)
                }
            })
        })
        // le indica al serviceWorker activar la cache actual
        .then(() => self.clients.claim())
        .catch(err => console.log(err))
    )
});

/*
3. se va a encargar de recuperar todos los recursos del navegador, cuando si tenga conexion a internet, ya actualizar si hay algun cambio
*/
self.addEventListener("fetch", (e) => {
    // responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then((res) => {
            if(res){
                // recuperamos del caché
                return res;
            }else{
                // solicta nuevamente a la url
                return fetch(e.request)
            }
        })
    )
});

/* const cache = [CACHE_NAME] */ //guardo eso en un array

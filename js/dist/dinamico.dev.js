"use strict";

var d = document;
var containerClima = d.getElementById("reporteClima");
console.log(containerClima); // para pintar en el DOM

var elements = {
  p1: d.querySelector(".clouds"),
  p2: d.querySelector(".description"),
  p3: d.querySelector(".id"),
  ptemMin: d.querySelector('.temMin'),
  ptemMax: d.querySelector('.temMax'),
  pSensacion: d.querySelector('.sensacionTem')
};
var fragment = d.createDocumentFragment();
var API_KEY = "4a7462df98952a0df1e59bf3a6307cfb";
var $p = d.getElementById("error");

function conversion(K) {
  console.log(K - 273.15);
}

conversion(45);

var siHayError = function siHayError(error) {
  console.log(error);

  if (error.code === 1) {
    return $p.innerHTML = "please give permission to access and reload the page";
  }

  if (error.code === 3) {
    return $p.innerHTML = "This position isn't available";
  }
};

var getData = function getData(puesto) {
  var _puesto$coords, latitude, longitude, peticion, response, main;

  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _puesto$coords = puesto.coords, latitude = _puesto$coords.latitude, longitude = _puesto$coords.longitude;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&appid=").concat(API_KEY)));

        case 4:
          peticion = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(peticion.json());

        case 7:
          response = _context.sent;
          console.log(response); // para info main

          main = [response.main];
          console.log(main);
          main.forEach(function (el) {
            elements.ptemMin.innerHTML = el.temp_min;
            elements.ptemMax.innerHTML = el.temp_max;
            elements.pSensacion.innerHTML = el.feels_like;
          });
          response.weather.forEach(function (el) {
            elements.p1.innerHTML = el.main;
            elements.p2.innerHTML = el.description;
            elements.p3.innerHTML = el.id;
          });
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          console.log("error");

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

var locationn = function locationn() {
  return regeneratorRuntime.async(function locationn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          navigator.geolocation.getCurrentPosition(getData, siHayError);

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};
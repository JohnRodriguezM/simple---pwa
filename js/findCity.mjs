'use strict';
const input = e => {
    if(e.which === 13){
        alert("this option isn't available yet")
    }
}
document.getElementById('find-city').addEventListener('keydown',input)
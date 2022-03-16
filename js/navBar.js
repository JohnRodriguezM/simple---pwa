// navbar


const navbar = document.getElementById('navbarBasicExample')
const hamburger = document.getElementById('hamburger')





  document.addEventListener('click', (e)=> {
    if(e.target.matches('.link')){
        navbar.classList.toggle('is-active')
        hamburger.classList.toggle('is-active')
        navbar.style.transform = 'transition all 2s ease'
    }
})
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          console.log(target)
          const $target = document.getElementById(target);
          console.log($target)
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });



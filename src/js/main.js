var scene = document.getElementById('scene');

var parallax = new Parallax(scene);

var toggleButton = document.getElementsByClassName('menu-toggle')[0];
var body = document.querySelector('body');

console.log(toggleButton);
console.log(body);

body.addEventListener('click', function(event) {
  if( event.target.classList.contains('menu-toggle')) {
    event.preventDefault();
    if(this.classList.contains('contact-container-in')) {
      this.classList.remove('contact-container-in');
    } else {
      this.classList.add('contact-container-in');
    }
  }
});

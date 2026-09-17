/* In2Lab Academic — main.js */
(function () {
  /* Mobile nav toggle */
  var toggle = document.querySelector('.navbar-toggle');
  var nav    = document.querySelector('.navbar-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
})();

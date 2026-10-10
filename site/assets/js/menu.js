// Menu: op een telefoon een knop met drie streepjes in plaats van alle menukopjes;
// op de artikelpagina's staat het menu boven de foto in plaats van erover.
// Eén regel in de <head> van elke pagina is genoeg:
//   <script src="/assets/js/menu.js"></script>
(function () {
  'use strict';

  // Stijlen meteen laden, zodat het menu niet eerst op de verkeerde plek springt
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/assets/css/menu.css';
  document.head.appendChild(link);

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    var nav = header && header.querySelector('nav.main-nav');
    if (!nav) { return; }

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(btn);

    function set(open) {
      header.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function () {
      set(!header.classList.contains('nav-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { set(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { set(false); }
    });
  });
})();

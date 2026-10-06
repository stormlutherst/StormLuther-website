// Pijltjes voor de fotocarrousel (.carousel). Zonder dit script blijft zijwaarts scrollen/vegen gewoon werken.
(function () {
  'use strict';

  Array.prototype.forEach.call(document.querySelectorAll('.carousel'), function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var prev = carousel.querySelector('.carousel-prev');
    var next = carousel.querySelector('.carousel-next');
    if (!track || !prev || !next) { return; }

    function update() {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    }

    prev.addEventListener('click', function () {
      track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    });

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();

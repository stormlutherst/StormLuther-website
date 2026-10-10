// Carrousel in een blogpost: met de pijltjes één "scherm" opschuiven; vegen werkt ook.
(function () {
  'use strict';

  document.querySelectorAll('.carousel').forEach(function (box) {
    var track = box.querySelector('.carousel-track');
    var prev = box.querySelector('.carousel-prev');
    var next = box.querySelector('.carousel-next');
    if (!track || !prev || !next) { return; }

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      box.classList.toggle('no-scroll', max <= 2);
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    }

    prev.addEventListener('click', function () {
      track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  });
})();

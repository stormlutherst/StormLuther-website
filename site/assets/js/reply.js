// Onder elk artikel: één blokje met (op Japan-posts) inschrijven, een knop om per mail te reageren
// en een doorverwijzing naar alle verhalen. Eén regel onderaan de pagina is genoeg:
//   <script src="/assets/js/reply.js"></script>
// Het mailadres staat hieronder; verander het hier om het overal tegelijk aan te passen.
(function () {
  'use strict';

  var EMAIL = 'storm.stavenuiter@hotmail.com';
  var JAPAN_URL = 'https://stormluther.com/japan-26/index.html';

  var article = document.querySelector('article.post-body');
  if (!article) { return; }

  var isJapan = location.pathname.indexOf('/japan-26/') !== -1;

  var h1 = document.querySelector('h1');
  var title = h1 ? h1.textContent.trim() : document.title;

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/assets/css/reply.css';
  document.head.appendChild(link);

  var box = document.createElement('aside');
  box.className = 'post-end';

  // Inschrijfformulier (alleen Japan-posts): het blokje dat subscribe.js al heeft gevuld
  var subscribe = document.querySelector('[data-subscribe]');
  if (subscribe) { box.appendChild(subscribe); }

  // Eén rij: een korte vraag met een knop eronder
  function row(label, text, href) {
    var r = document.createElement('div');
    r.className = 'post-end-row';
    var l = document.createElement('p');
    l.className = 'post-end-label';
    l.textContent = label;
    var b = document.createElement('a');
    b.className = 'reply-button';
    b.href = href;
    b.textContent = text;
    r.appendChild(l);
    r.appendChild(b);
    box.appendChild(r);
  }

  row('Reageren?', 'Stuur me een bericht',
    'mailto:' + EMAIL +
    '?subject=' + encodeURIComponent('Reactie op: ' + title) +
    '&body=' + encodeURIComponent('Hoi Storm,\n\n'));

  if (isJapan) {
    row('Meer lezen?', 'Klik hier voor de reis door Japan', JAPAN_URL);
  }

  article.insertAdjacentElement('afterend', box);
})();

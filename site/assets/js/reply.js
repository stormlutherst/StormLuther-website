// Onder elk artikel: een knop waarmee lezers me per mail een reactie sturen.
// Eén regel onderaan de pagina is genoeg:
//   <script src="/assets/js/reply.js"></script>
// Het mailadres staat hieronder; verander het hier om het overal tegelijk aan te passen.
(function () {
  'use strict';

  var EMAIL = 'storm.stavenuiter@hotmail.com';

  var article = document.querySelector('article.post-body');
  if (!article) { return; }

  var h1 = document.querySelector('h1');
  var title = h1 ? h1.textContent.trim() : document.title;

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/assets/css/reply.css';
  document.head.appendChild(link);

  var box = document.createElement('section');
  box.className = 'reply-box';
  box.innerHTML =
    '<h2 class="reply-title">Reageren?</h2>' +
    '<p class="reply-text">Laat me weten wat je ervan vindt. Je reactie komt rechtstreeks in mijn mailbox.</p>';

  var a = document.createElement('a');
  a.className = 'reply-button';
  a.href = 'mailto:' + EMAIL +
    '?subject=' + encodeURIComponent('Reactie op: ' + title) +
    '&body=' + encodeURIComponent('Hoi Storm,\n\n');
  a.textContent = 'Stuur me een reactie';
  box.appendChild(a);

  article.insertAdjacentElement('afterend', box);
})();

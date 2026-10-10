// Inschrijven op updates van de Japan-reis, via MailerLite.
//
// Invullen na het aanmaken van je gratis MailerLite-account:
//   MailerLite > Forms > Embedded forms > maak een formulier > "Copy"
//   In de code die je krijgt staan twee waarden:
//     ml('account', '1234567');                   <- dit nummer is ACCOUNT
//     <div class="ml-embedded" data-form="abc1D2"> <- dit is FORM
//
// Zolang beide leeg zijn, blijft het blok onzichtbaar.
(function () {
  'use strict';

  var ACCOUNT = '2700383';
  var FORM = 'HBSS4x';

  var blokken = document.querySelectorAll('[data-subscribe]');
  if (!blokken.length || !ACCOUNT || !FORM) { return; }

  blokken.forEach(function (blok) {
    blok.classList.add('subscribe');

    var form = document.createElement('div');
    form.className = 'ml-embedded';
    form.setAttribute('data-form', FORM);

    blok.appendChild(form);
  });

  // Standaard MailerLite-code
  (function (w, d, e, u, f, l, n) {
    w[f] = w[f] || function () { (w[f].q = w[f].q || []).push(arguments); };
    l = d.createElement(e); l.async = 1; l.src = u;
    n = d.getElementsByTagName(e)[0]; n.parentNode.insertBefore(l, n);
  })(window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');
  window.ml('account', ACCOUNT);
})();

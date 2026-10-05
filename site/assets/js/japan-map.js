// Toont de reisroute (assets/js/japan-route.js) op een OpenStreetMap-kaart.
(function () {
  'use strict';

  var el = document.getElementById('japan-map');
  if (!el || !window.L) { return; }

  var stops = (window.JAPAN_ROUTE || []).filter(function (s) {
    return typeof s.lat === 'number' && typeof s.lon === 'number';
  });
  if (!stops.length) { el.style.display = 'none'; return; }

  var map = L.map(el, {
    scrollWheelZoom: false,       // scrollen over de kaart blijft de pagina scrollen
    dragging: !L.Browser.mobile   // op telefoon: vegen scrolt de pagina, zoomen kan met + en -
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  var points = stops.map(function (s) { return [s.lat, s.lon]; });

  if (points.length > 1) {
    L.polyline(points, { color: '#111', weight: 2, opacity: 0.7, dashArray: '6 6' }).addTo(map);
  }

  stops.forEach(function (s, i) {
    var isLast = i === stops.length - 1;

    var marker = L.circleMarker([s.lat, s.lon], {
      radius: isLast ? 9 : 6,
      color: '#111',
      weight: 2,
      fillColor: isLast ? '#111' : '#fff',
      fillOpacity: 1
    }).addTo(map);

    var content = document.createElement('div');
    if (s.post) {
      var link = document.createElement('a');
      link.href = s.post;
      link.textContent = s.name;
      content.appendChild(link);
    } else {
      content.textContent = s.name;
    }
    marker.bindPopup(content);

    if (isLast) {
      marker.bindTooltip(s.name, {
        permanent: true,
        direction: 'right',
        offset: [12, 0],
        className: 'japan-map-label'
      });
    }
  });

  if (points.length === 1) {
    map.setView(points[0], 9);
  } else {
    map.fitBounds(points, { padding: [40, 40], maxZoom: 9 });
  }

  window.addEventListener('load', function () { map.invalidateSize(); });
})();

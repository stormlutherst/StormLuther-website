// Toont de reisroute (assets/js/japan-route.js) op een OpenStreetMap-kaart.
// Hoofdstops (Tokyo, Fuji, Takayama, ...) zijn verbonden met een lijn.
// Wijken of plekken binnen een stop ("places") verschijnen pas als je inzoomt.
(function () {
  'use strict';

  var PLACES_ZOOM = 11;   // vanaf dit zoomniveau worden de wijken getoond
  var LABEL_ZOOM = 11;    // vanaf hier staan de namen van de wijken er permanent bij
  var OFFSETS = { right: [8, 0], left: [-8, 0], top: [0, -8], bottom: [0, 8] };

  var el = document.getElementById('japan-map');
  if (!el || !window.L) { return; }

  function valid(s) {
    return s && typeof s.lat === 'number' && typeof s.lon === 'number';
  }

  var stops = (window.JAPAN_ROUTE || []).filter(valid);
  if (!stops.length) { el.style.display = 'none'; return; }

  var map = L.map(el, {
    scrollWheelZoom: false,       // scrollen over de kaart blijft de pagina scrollen
    dragging: !L.Browser.mobile   // op telefoon scrolt vegen de pagina (tot je inzoomt)
  });
  window.JAPAN_MAP = map;

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  var points = stops.map(function (s) { return [s.lat, s.lon]; });
  var placesLayer = L.layerGroup();
  var hasPlaces = false;
  var cityMarkers = [];   // stops met wijken: hun stip verdwijnt bij het inzoomen

  // Inhoud van een popup: naam (of link naar de post) en eventueel een knop om op de wijken in te zoomen
  function popupContent(item, onZoom) {
    var box = document.createElement('div');
    var title;
    if (item.post) {
      title = document.createElement('a');
      title.href = item.post;
    } else {
      title = document.createElement('span');
    }
    title.textContent = item.name;
    box.appendChild(title);

    if (onZoom) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'japan-map-zoom';
      btn.textContent = 'Bekijk de wijken';
      btn.addEventListener('click', function () { map.closePopup(); onZoom(); });
      box.appendChild(document.createElement('br'));
      box.appendChild(btn);
    }
    return box;
  }

  if (points.length > 1) {
    L.polyline(points, { color: '#111', weight: 2, opacity: 0.7, dashArray: '6 6' }).addTo(map);
  }

  stops.forEach(function (s, i) {
    var isLast = i === stops.length - 1;
    var places = (s.places || []).filter(valid);

    var zoomToPlaces = null;
    if (places.length) {
      hasPlaces = true;
      zoomToPlaces = function () {
        var pts = [[s.lat, s.lon]].concat(places.map(function (p) { return [p.lat, p.lon]; }));
        map.fitBounds(pts, { padding: [30, 30], maxZoom: 13 });
      };
    }

    var marker = L.circleMarker([s.lat, s.lon], {
      radius: isLast ? 9 : 6,
      color: '#111',
      weight: 2,
      fillColor: isLast ? '#111' : '#fff',
      fillOpacity: 1
    }).addTo(map);
    marker.bindPopup(popupContent(s, zoomToPlaces));
    if (places.length) { cityMarkers.push(marker); }

    if (isLast) {
      marker.bindTooltip(s.name, {
        permanent: true,
        direction: 'right',
        offset: [12, 0],
        className: 'japan-map-label'
      });
    }

    places.forEach(function (p) {
      var dot = L.circleMarker([p.lat, p.lon], {
        radius: 5,
        color: '#111',
        weight: 2,
        fillColor: '#fff',
        fillOpacity: 1
      });
      dot.bindPopup(popupContent(p, null));
      var dir = OFFSETS[p.label] ? p.label : 'right';
      dot.bindTooltip(p.name, {
        permanent: true,
        direction: dir,
        offset: OFFSETS[dir],
        className: 'japan-map-place'
      });
      placesLayer.addLayer(dot);
    });
  });

  // Overzicht: alle hoofdstops in beeld
  function overview() {
    if (points.length === 1) {
      map.setView(points[0], 9);
    } else {
      map.fitBounds(points, { padding: [40, 40], maxZoom: 9 });
    }
  }

  // Wijken tonen/verbergen afhankelijk van het zoomniveau
  function update() {
    var z = map.getZoom();
    var zoomedIn = z >= PLACES_ZOOM;

    if (zoomedIn && !map.hasLayer(placesLayer)) { placesLayer.addTo(map); }
    if (!zoomedIn && map.hasLayer(placesLayer)) { map.removeLayer(placesLayer); }

    cityMarkers.forEach(function (m) {
      if (zoomedIn && map.hasLayer(m)) { map.removeLayer(m); }
      if (!zoomedIn && !map.hasLayer(m)) { m.addTo(map); }
    });

    el.classList.toggle('show-place-labels', z >= LABEL_ZOOM);

    // Op een telefoon kun je pas slepen als je bewust bent ingezoomd
    if (L.Browser.mobile) {
      if (zoomedIn) { map.dragging.enable(); } else { map.dragging.disable(); }
    }
  }

  if (stops.length > 1 || hasPlaces) {
    var Reset = L.Control.extend({
      options: { position: 'topright' },
      onAdd: function () {
        var btn = L.DomUtil.create('button', 'japan-map-reset');
        btn.type = 'button';
        btn.textContent = 'Hele route';
        L.DomEvent.disableClickPropagation(btn);
        L.DomEvent.on(btn, 'click', function () { overview(); });
        return btn;
      }
    });
    new Reset().addTo(map);
  }

  map.on('zoomend', update);
  overview();
  update();

  window.addEventListener('load', function () { map.invalidateSize(); });
})();

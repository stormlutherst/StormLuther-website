// Toont de reisroute (assets/js/japan-route.js) op een OpenStreetMap-kaart.
// Hoofdstops (Tokyo, Fuji, Takayama, ...) zijn verbonden met een lijn.
// Wijken of plekken binnen een stop ("places") verschijnen pas als je inzoomt.
(function () {
  'use strict';

  var PLACES_ZOOM = 11;   // vanaf dit zoomniveau worden de wijken getoond
  var LABEL_ZOOM = 11;    // vanaf hier staan de namen van de wijken er permanent bij
  var STOP_OFFSETS = { right: [16, 0], left: [-16, 0], top: [0, -15], bottom: [0, 15] };
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
  var cityMarkers = [];
  var captions = [];      // per stop met wijken: positie en bijschrift ("Tokyo \u00b7 8 wijken")   // stops met wijken: hun stip verdwijnt bij het inzoomen

  // Inhoud van een popup: naam, of een link naar de post als die er is
  function popupContent(item) {
    var title;
    if (item.post) {
      title = document.createElement('a');
      title.href = item.post;
    } else {
      title = document.createElement('span');
    }
    title.textContent = item.name;
    return title;
  }

  // Genummerde stip voor een hoofdstop; met een "+N"-badge als er wijken in zitten
  function stopIcon(number, isLast, count) {
    return L.divIcon({
      className: 'japan-map-city',
      html: '<span class="japan-map-city-dot' + (isLast ? ' is-last' : '') + '">' + number + '</span>' +
            (count ? '<span class="japan-map-city-badge">' + count + '</span>' : ''),
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -14],
      tooltipAnchor: [0, 0]
    });
  }

  if (points.length > 1) {
    L.polyline(points, { color: '#111', weight: 2, opacity: 0.7, dashArray: '6 6' }).addTo(map);
  }

  stops.forEach(function (s, i) {
    var isLast = i === stops.length - 1;
    var places = (s.places || []).filter(valid);
    var count = places.length;
    var unit = s.placesLabel || 'wijken';
    var caption = count ? s.name + ' · ' + count + ' ' + unit : s.name;

    var marker = L.marker([s.lat, s.lon], {
      icon: stopIcon(i + 1, isLast, count),
      title: caption
    }).addTo(map);

    if (count) {
      hasPlaces = true;
      // Klik op een stop met wijken: meteen inzoomen op die wijken
      marker.on('click', function () {
        var pts = [[s.lat, s.lon]].concat(places.map(function (p) { return [p.lat, p.lon]; }));
        map.fitBounds(pts, { padding: [30, 30], maxZoom: 13 });
      });
      cityMarkers.push(marker);
      captions.push({ lat: s.lat, lon: s.lon, text: caption });
    } else {
      marker.bindPopup(popupContent(s));
    }

    // Naam bij elke stop; heeft de stop een post, dan is de naam een link naar dat verhaal
    var tip;
    if (s.post) {
      tip = document.createElement('a');
      tip.href = s.post;
      tip.textContent = s.name;
    } else {
      tip = s.name;
    }
    var side = STOP_OFFSETS[s.label] ? s.label : 'top';
    var off = STOP_OFFSETS[side].slice();
    if (side === 'top' && count) { off[1] -= 8; }   // ruimte voor de badge
    marker.bindTooltip(tip, {
      permanent: true,
      interactive: !!s.post,
      direction: side,
      offset: off,
      className: 'japan-map-label'
    });

    places.forEach(function (p) {
      var dot = L.circleMarker([p.lat, p.lon], {
        radius: 5,
        color: '#111',
        weight: 2,
        fillColor: '#fff',
        fillOpacity: 1
      });
      dot.bindPopup(popupContent(p));
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

  // Bijschrift linksonder als je ingezoomd bent: bij welke stop hoort wat je ziet (bijv. "Fuji · 2 beklimmingen")
  var captionBox = null;
  if (captions.length) {
    var Caption = L.Control.extend({
      options: { position: 'bottomleft' },
      onAdd: function () {
        captionBox = L.DomUtil.create('div', 'japan-map-caption');
        captionBox.style.display = 'none';
        return captionBox;
      }
    });
    new Caption().addTo(map);
  }

  function updateCaption(zoomedIn) {
    if (!captionBox) { return; }
    if (!zoomedIn) { captionBox.style.display = 'none'; return; }
    var c = map.getCenter();
    var best = null, bestD = Infinity;
    captions.forEach(function (x) {
      var d = map.distance(c, [x.lat, x.lon]);
      if (d < bestD) { bestD = d; best = x; }
    });
    captionBox.textContent = best ? best.text : '';
    captionBox.style.display = best ? 'block' : 'none';
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
    updateCaption(zoomedIn);

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
  map.on('moveend', function () { updateCaption(map.getZoom() >= PLACES_ZOOM); });
  overview();
  update();

  window.addEventListener('load', function () { map.invalidateSize(); });
})();

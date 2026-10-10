// Route door Japan '26.
// Voeg nieuwe stops onderaan toe, in de volgorde van de reis.
// De laatste stop is je huidige locatie (wordt groter getoond met naam erbij).
//
// De stops krijgen automatisch een nummer in de volgorde van de reis (Tokyo = 1).
//
// Optioneel per stop:
//   post: "naam-van-de-post.html"   link naar de blogpost bij die stop
//   placesLabel: "plekken"          wat het cijfer bij de stop telt (standaard: "wijken")
//   label: "top" | "right" | "left" | "bottom"   aan welke kant de naam staat (standaard: boven)
//   places: [ ... ]                 wijken of plekken binnen die stop, in de volgorde van je bezoek.
//                                   Ze verschijnen pas als je inzoomt en tellen niet mee in de routelijn.
//
// Optioneel per wijk:
//   label: "left" | "right" | "top" | "bottom"   aan welke kant de naam staat (standaard: rechts)
window.JAPAN_ROUTE = [
  { name: "Tokyo", lat: 35.6812, lon: 139.7671, post: "alles-drijft-in-de-soep.html",
    places: [
      { name: "Taito",         lat: 35.7250, lon: 139.7925, label: "top" },
      { name: "Asakusa",       lat: 35.7148, lon: 139.7967 },
      { name: "Yanaka",        lat: 35.7270, lon: 139.7665, label: "left" },
      { name: "Ueno",          lat: 35.7138, lon: 139.7774, label: "left" },
      { name: "Shinjuku",      lat: 35.6896, lon: 139.7006 },
      { name: "Shibuya",       lat: 35.6595, lon: 139.7005 },
      { name: "Akihabara",     lat: 35.6984, lon: 139.7731 },
      { name: "Shimokitazawa", lat: 35.6613, lon: 139.6681, label: "left" }
    ] },
  { name: "Fuji", lat: 35.5164, lon: 138.7656, post: "dankbaar-voor-voeten-naast-de-meesteres.html",
    placesLabel: "beklimmingen",
    places: [
      { name: "Haha-no-Shirataki", lat: 35.535437, lon: 138.7826077, label: "left" },
      { name: "Top Shimoyama",     lat: 35.532490, lon: 138.806595 }
    ] }
];

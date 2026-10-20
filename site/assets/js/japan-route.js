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
    ] },
  { name: "Takayama", lat: 36.1461, lon: 137.2522, post: "mijn-praalwagen-mag-shinen.html",
    placesLabel: "wandelingen", placesLabelOne: "wandeling", connect: true,
    places: [ { name: "Kamikōchi", lat: 36.2490, lon: 137.6370 } ] },
  { name: "Osaka", lat: 34.6937, lon: 135.5023, post: "blauwe-draak-gouden-baby-shaki-shaki.html",
    placesLabel: "highlights", placesLabelOne: "highlight", label: "top",
    places: [
      { name: "Keitakuen Garden", lat: 34.6513, lon: 135.5131, label: "right" },
      { name: "Dōtonbori",        lat: 34.6687, lon: 135.5013, label: "right" },
      { name: "Kuromon Ichiba",   lat: 34.6627, lon: 135.5064, label: "right" },
      { name: "Orange Street",    lat: 34.6712, lon: 135.4935, label: "left" }
    ] },
  { name: "Kyoto", lat: 35.0116, lon: 135.7681, post: "blauwe-draak-gouden-baby-shaki-shaki.html",
    placesLabel: "highlights", placesLabelOne: "highlight", label: "right",
    places: [
      { name: "Kyoto National Museum",       lat: 34.9900, lon: 135.7727, label: "bottom" },
      { name: "Kiyomizu-dera",               lat: 34.9949, lon: 135.7850 },
      { name: "Hanamikōji",                  lat: 35.0033, lon: 135.7755 },
      { name: "Nishiki Market",              lat: 35.0050, lon: 135.7649, label: "bottom" },
      { name: "Kyoto Gyoen National Garden", lat: 35.0254, lon: 135.7621, label: "top" },
      { name: "Hachimonjiya",                lat: 35.0066, lon: 135.7708, label: "top" }
    ] },
  { name: "Okayama", lat: 34.6551, lon: 133.9195, post: "karel-appel-was-here.html",
    placesLabel: "highlights", placesLabelOne: "highlight", label: "left",
    places: [ { name: "Kōraku-en", lat: 34.6667, lon: 133.9360 } ] },
  { name: "Uno", lat: 34.4960, lon: 133.9450, post: "karel-appel-was-here.html",
    placesLabel: "uitstapjes", placesLabelOne: "uitstapje", connect: true, label: "left",
    places: [ { name: "Naoshima", lat: 34.4510, lon: 134.0590 } ] }
];

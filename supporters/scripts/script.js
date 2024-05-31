const light_colors = ["#34A853", "#FBBC05", "#4285F4", "#7FBC00"];
const dark_colors = ["#239742", "#815e00", "#3174E4", "#6EAD00"];
//All these are css changes that can take place
//before the body finish loading
(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("theme")) {
    const theme = urlParams.get("theme");
    if (theme === "light") {
      document.documentElement.dataset["theme"] = theme;
    } else if (theme === "dark") {
      document.documentElement.dataset["theme"] = theme;
    } else if (theme === "auto") {
      // Default
    } else {
      console.log("Unknown source param " + urlParams);
    }
  }
  if (urlParams.has("colorLight")) {
    document.documentElement.style.setProperty(
      "--accentColorLight",
      "#" + urlParams.get("colorLight")
    );
  }
  if (urlParams.has("colorDark")) {
    document.documentElement.style.setProperty(
      "--accentColorDark",
      "#" + urlParams.get("colorDark")
    );
  }
  setAccentColor();
})();

let tagCloud;
const names = [
  "Malik Harris",
  "Elijah Rampa",
  "Samuel Vachet",
  "Pinkydbzboys King",
  "Daniel Whitaker",
  "A Atack",
  "Lars Larsen",
  "Jonas Myniotas",
  "paun Paunsen",
  "༄ɪɴd᭄Gᴀᴍᴇ kotelett",
  "elizabeth white",
  "Nekoyoubi",
  "eric sydow",
  "jonathan",
  "Steve Piepho",
  "Ryan Breese",
  "Harriett",
  "Eli",
  "Abdur-Rahman Dania",
  "jeff Arnold",
  "Jen Dyrka",
  "Nicholas Perez",
  "Phil Lassalle",
  "ELIJAH",
  "Burnens",
  "Eric Hansen",
  "Aden",
  "Usiel Graniel",
  "TuX",
  "Johnathan Vasquez",
  "Daniel Welcher",
  "Brodie Kay",
  "xr SECRET",
  "Christian Howard",
  "Frank alexis cruz Marmolejos",
  "John T Howard",
  "April Bednar",
  "Bisketties",
  "Rémy DG",
  "فمكر FMQR",
  "Nicolas GroÃŸ",
  "Yander Polo",
  "Dylan Harwood",
  "Johannes Ribeiro",
  "Tom Haight",
  "Northbayjoe",
  "Vazer",
  "ollando",
  "Shane Mane",
  "Joseph DeFelix",
  "Pamela Clark-Gordon",
  "jocelyn crum",
  "Abdullah AlFayez",
  "Ceferino Arrue",
  "KingVass",
  "نايف ياسر الغامدي",
  "Latrell Morgan",
  "su",
  "Hansel Lopez Madrigal",
  "Koby Mutton",
  "miran temur",
  "Gustavo Trevizan",
  "Lipov",
  "Mustafa",
  "freezerua",
  "Will devitt",
  "Eric Geiger",
  "79",
  "BoBtastic",
  "Christian Davis",
  "Andrew Cloward",
  "Erick",
  "Jeremiah Etnel",
  "Silvian Hiemesch",
  "AJ Holmes",
  "Nathan Renderos",
  "Donovan Contreras",
  "Nathan Draper",
  "Kristopher DeBolt",
  "llLuvDiorCxmpll",
  "بدر الحربي",
  "Linda Descheda",
  "David Dominguez",
  "Mark Rugen",
  "Roopull",
  "isaiah roman",
  "michael jolly",
  "Evan mousa",
  "Mosies Miyar",
  "Moss Doerksen",
  "Hamzak1",
  "Nik Page",
  "Ingo Horst Eck",
  "Dennis Van Metre",
  "Alex Salisbury",
  "Benjamin Kilpatrick",
  "Joadm",
  "Big Ugly",
  "Yousuf Hassan",
  "peteybuilt",
  "Jeff Weisberg",
  "Tyler Hand",
  "Diego Rodrigues",
  "Hakan ÖZER",
  "Clark King",
  "Mark Ryan",
  "jason hart",
  "Matt Olgiati",
  "Stephen Smith",
  "Andy Baker",
  "David Sydow",
  "Andy Vieraz Gonzalez",
  "Moshe Tanach",
  "Emma Barnhoorn",
  "Dennis Herrick",
  "RICHARD KRAKANA",
  "Richard Christenson",
  "t b",
  "Gerald Holland",
  "ZioMike Positano",
  "Nada ahmed",
  "rimpe boss",
  "Mete Sozer",
  "JOYCE Johnson",
  "Katie Miller",
  "esmercer",
  "david j pagett",
  "jason storey",
  "Martyn Roberts",
  "Alex Tessler",
  "y0himba",
  "J C",
  "Mike Spence",
  "LOLOF13R",
  "Ronald Cagle",
  "mohammed",
  "BusinessTime",
  "AK",
  "Newlee CK.",
  "Jonathan Mota"
];

function updateCloud() {
  tagCloud?.destroy();
  tagCloud = TagCloud(".content", names, {
    radius: window.innerWidth < 768 ? 275 : 400,
    maxSpeed: "normal",
    initSpeed: "normal",
    direction: 135,
    keep: true,
  });
}
window.addEventListener("resize", updateCloud);
window.addEventListener("load", updateCloud);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!document.documentElement.dataset["theme"]) setAccentColor();
  });

function setAccentColor() {
  const forcedTheme = document.documentElement.dataset["theme"];
  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let colors;

  if (forcedTheme) {
    if (forcedTheme === "light") colors = dark_colors;
    else colors = light_colors;
  } else {
    if (!darkTheme) colors = dark_colors;
    else colors = light_colors;
  }

  document.documentElement.style.setProperty(
    "--pColor",
    colors[Math.floor(Math.random() * colors.length)]
  );
}

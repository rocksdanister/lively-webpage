let tagCloud;
let accentColor = null;
const names = [
  "jesse grima",
  "Frank alexis cruz Marmolejos",
  "John T Howard",
  "April Bednar",
  "Jonathan Youngson",
  "Christopher adorno",
  "Abdulmelik DEMİR",
  "Bisketties",
  "Rémy DG",
  "فرح رضوان FMQR",
  "Nicolas Groß",
  "Yander Polo",
  "OTR",
  "Dylan Harwood",
  "Johannes Ribeiro",
  "Tito Villalpando",
  "Tom Haight",
  "Northbayjoe",
  "Vazer",
  "ollando",
  "Robert Deutsch",
  "Shane Mane",
  "aidan aichele",
  "khaled bin yousef",
  "Joseph DeFelix",
  "Pamela Clark-Gordon",
  "Steven Smith",
  "Robert Allen Dextra",
  "jocelyn crum",
  "Abdullah AlFayez",
  "Ceferino Arrue",
  "KingVass",
  "ناصر ياسر الزامل",
  "Latrell Morgan",
  "Arabs Gaming Tube",
  "su",
  "Hansel Lopez Madrigal",
  "Koby Mutton",
  "nguyen j",
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
  "بردي الحربي",
  "Linda Descheda",
  "David Dominguez",
  "Jasmine Vasquez",
  "Mark Rugen",
  "Roopull",
  "michael jolly",
  "Evan mousa",
  "Mosies Miyar",
  "Markus Mertens",
  "Moss Doerksen",
  "Hamzak1",
  "Nik Page",
  "Ingo Horst Eck",
  "Dennis Van Metre",
  "Alex Salisbury",
  "Benjamin Kilpatrick",
  "Joadm",
  "Piyapan Thongkampleo",
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
  "Eiki",
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
  "rimpe boss",
  "Mete Sozer",
  "Afaq Khan",
  "JOYCE Johnson",
  "Katie Miller",
  "esmercer",
  "AlexTuPlay",
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
  "สัญญา ปิ่นวันนา",
  "BusinessTime",
  "AK",
  "Newlee CK.",
  "Jonathan Mota",
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

window.onload = () => {
  handleSourceParameter();
};

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!document.documentElement.dataset["theme"]) setAccentColor();
});

function handleSourceParameter() {
  const urlParams = new URLSearchParams(window.location.search);

  // sets the theme if a param exists
  if (urlParams.has("theme")) {
    const theme = urlParams.get("theme");
    if (theme === "light") {
      document.documentElement.dataset["theme"] = theme;
    } else if (theme === "dark") {
      document.documentElement.dataset["theme"] = theme;
    } else {
      console.log("Unknown source param " + urlParams);
    }
  }
  // sets accent color
  if (urlParams.has("color")) {
    setAccentColor("#" + urlParams.get("color"));
  }
}

function setAccentColor(color =  accentColor) {
  if (color == null) return;

  accentColor = color;
  var factor = getCurrentTheme() == "light" ? -25 : 25;
  var tempColor = changeBrightness(color, factor);
  document.querySelector(".content").style.color = tempColor;
}

// ref: https://stackoverflow.com/questions/6443990/javascript-calculate-brighter-colour
function changeBrightness(hex, percent) {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length == 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  var r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);

  if (percent > 0) {
    return (
      "#" +
      (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
      (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
      (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
    );
  } else {
    percent *= -1;
    return (
      "#" +
      (0 | ((1 << 8) + (r * (100 - percent)) / 100)).toString(16).substr(1) +
      (0 | ((1 << 8) + (g * (100 - percent)) / 100)).toString(16).substr(1) +
      (0 | ((1 << 8) + (b * (100 - percent)) / 100)).toString(16).substr(1)
    );
  }
}

function getCurrentTheme() {
  const forcedTheme = document.documentElement.dataset["theme"];
  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (forcedTheme) {
    if (forcedTheme == "light") return "light";
    else "dark";
  } else {
    if (!darkTheme) return "light";
    else "dark";
  }
}

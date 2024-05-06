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

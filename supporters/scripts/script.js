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
    const color = urlParams.get("color");
    document.querySelector(".content").style.color = "#" + color;
  }
}

window.onload = () => {
  handleSourceParameter();
};

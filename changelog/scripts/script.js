let accentColor = null;

let videos = document.getElementsByClassName("video");
function callbackFunc(entries, observer) {
  entries.forEach((entry) => {
    for (let i = 0; i < videos.length; i++) {
      if (entry.target.id != videos[i].id) continue;

      // If more than half of video visible, play
      if (entry.intersectionRatio >= 0.75) {
        videos[i].play();
        videos[i].style.filter = "";
      } else {
        videos[i].pause();
        videos[i].style.filter = "brightness(50%)";
      }
    }
  });
}

let observer = new IntersectionObserver(
  callbackFunc,
  (options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.25, 0.5, 0.75],
  })
);
[...videos].forEach((x) => observer.observe(x));


function handleSourceParameter() {
  // Get the URL of the current page
  const urlParams = new URLSearchParams(window.location.search);

  // Get source (browser/app)
  if (urlParams.has("source")) {
    const source = urlParams.get("source");
    if (source === "app") {
      hideContent("footer");
      document.body.style.userSelect = "none";
      document.getElementById("theme-picker").parentElement.style.display = "none";
    } else {
      console.log("Unknown source param " + urlParams);
    }
  }
  // Get accent color
  if (urlParams.has("color")) {
    setAccentColor("#" + urlParams.get("color"));
  }
}

window.onload = () => {
  handleThemes(); // located themeHandler.js
  handleSourceParameter();
};

function setAccentColor(color = accentColor) {
  if (color == null) return;

  accentColor = color;
  var factor = getCurrentTheme() == "light" ? -25 : 25;
  var tempColor = changeBrightness(color, factor);

  var menuLinks = document.querySelectorAll(".menu__link");
  menuLinks.forEach(function (link) {
    link.style.color = tempColor;
  });
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

// Hide the contents while keeping its space reserved
function hideContent(className) {
  const targetElement = document.querySelector("." + className);

  if (targetElement) {
    const children = targetElement.children;
    for (let i = 0; i < children.length; i++) {
      children[i].style.visibility = "hidden";
    }
  } else {
    console.log("Element with class " + className + " not found.");
  }
}

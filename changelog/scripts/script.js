//#region Video effects

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

//#endregion

//#region Url params

function handleSourceParameter() {
  // Get the URL of the current page
  const urlParams = new URLSearchParams(window.location.search);

  // Check if the "source" parameter exists
  if (urlParams.has("source")) {
    const source = urlParams.get("source");
    if (source === "app") {
      hideContent("footer");
      document.body.style.userSelect = "none";
      document.getElementById("theme-picker").parentElement.style.display =
        "none";
    } else {
      console.log("Unknown source param " + urlParams);
    }
  }

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

//#endregion

const cachedTheme = localStorage.getItem("theme");
if (cachedTheme) {
  document.documentElement.dataset["theme"] = cachedTheme;
}
function handleThemes() {
  const themePicker = document.getElementById("theme-picker");
  if (!themePicker) return;

  const initialTheme = cachedTheme ?? "dark";
  themePicker.checked = initialTheme == "dark" ? true : false;

  themePicker.addEventListener("change", (e) => {
    const theme = e.target.checked == true ? "dark" : "light";
    if (theme === "auto") {
      delete document.documentElement.dataset["theme"];
      localStorage.removeItem("theme");
    } else {
      document.documentElement.dataset["theme"] = theme;
      localStorage.setItem("theme", theme);
    }
  });
}

window.onload = () => {
  handleThemes();
  handleSourceParameter();
};

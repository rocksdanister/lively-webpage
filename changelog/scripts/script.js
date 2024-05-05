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
}

window.onload = () => {
  handleThemes(); // located themeHandler.js
  handleSourceParameter();
};

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

// sets the theme if a param exists
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
// Get accent color
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

// sets the theme if a cached one exists
// and it wasn't set by the params
const cachedTheme = localStorage.getItem("theme");
if (cachedTheme && !document.documentElement.dataset["theme"]) {
  document.documentElement.dataset["theme"] = cachedTheme;
}
function handleThemes() {
  //either this or have the html on each page
  //loads the button html into the page when the page loads
  //minified html should be fine in most browsers
  //Uses Svgs provided by Material Design Icons Apache 2.0 License
  document.querySelector(
    ".header"
  ).innerHTML += `<div><label class=switch for=theme-picker><input class=circle id=theme-picker type=checkbox><svg class="svg moon"height=24 viewBox="0 -960 960 960"width=24 xmlns=http://www.w3.org/2000/svg><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg> <svg class="svg sun"height=24 viewBox="0 -960 960 960"width=24 xmlns=http://www.w3.org/2000/svg><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg></label></div>`;

  const themePicker = document.getElementById("theme-picker");
  if (!themePicker) return;

  // gets the initial theme from the theme set by the param or the cache
  // if theme is light the toggle should be unchecked,
  // if the theme is dark then the toggle should be checked
  // if the theme wasn't set by either use prefer color
  const initialTheme = document.documentElement.dataset["theme"] ?? "auto";

  themePicker.checked =
    initialTheme !== "auto"
      ? initialTheme == "dark"
        ? true
        : false
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

  themePicker.addEventListener("change", (e) => {
    const theme = e.target.checked == true ? "dark" : "light";
    document.documentElement.dataset["theme"] = theme;
    localStorage.setItem("theme", theme);
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (document.documentElement.dataset["theme"]) return;

      themePicker.checked = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    });
}

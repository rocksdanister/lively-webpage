//app ui
var ul = document.getElementById("wallpapers");
ul.onclick = function (event) {
  let lis = ul.getElementsByTagName("IMG");
  for (let i = 0; i <= lis.length - 1; i++) {
    lis[i].style.outline = "";
  }

  var img = event.target;
  //console.log(img.tagName);
  if (img.tagName != "IMG") {
    if (img.parentElement.tagName == "DIV" && !hasClass(img, "desc")) return;

    img = img.parentElement.querySelector("img");
    if (img == null) return;
  }

  //update customise controls
  img.style.outline = "2.5px solid #a425a0";
  $("#ui-app-customise-controls-rain").css("display", "none");
  $("#ui-app-customise-controls-test").css("display", "none");
  $("#ui-app-customise-controls-snow").css("display", "none");
  switch (img.parentElement.id) {
    case "rain":
      setScene("rain");
      $("#ui-app-customise-controls-rain").css("display", "inline");
      break;
    case "clouds":
      setScene("clouds");
      $("#ui-app-customise-controls-test").css("display", "inline");
      break;
    case "snow":
      setScene("snow");
      $("#ui-app-customise-controls-snow").css("display", "inline");
      break;
  }
};

//app ui (scrolling)
$(window).scroll(function () {
  var requiredOffset = 100;

  // Between 0 and 1 (inclusive)
  var percentage = Math.min(1, $(window).scrollTop() / requiredOffset);

  // Starts at requiredOffset and goes down to 0
  var marginTop = requiredOffset * (1 - percentage);

  // Opacity of frame
  var alpha = 1 - percentage;

  $(".heading").css("opacity", alpha);
  $(".ui-app").css("margin-top", marginTop);
  $("#ui-app-library").css("filter", `brightness(${1 - (1 - alpha) / 4})`);
  $("#ui-app-customize-heading").css("opacity", 1 - alpha);
  $("#ui-app-customise").css("opacity", 1 - alpha);

  if (alpha == 0) {
    $("#ui-app-library").css("pointer-events", "none");
    $("#ui-app-customise").css("pointer-events", "auto");
  } else {
    $("#ui-app-library").css("pointer-events", "auto");
    $("#ui-app-customise").css("pointer-events", "none");
  }
});

//helpers
function hasClass(element, className) {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

function scrollToElement(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

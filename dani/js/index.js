var ul = document.getElementById("wallpapers");
ul.onclick = function (event) {
  let lis = document.getElementById("wallpapers").getElementsByTagName("IMG");
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

  img.style.outline = "2.5px solid #a425a0";
  $("#ui_app_customise_controls_rain").css("display", "none");
  $("#ui_app_customise_controls_test").css("display", "none");
  if (img.parentElement.id == "rain") {
    setScene("rain");
    $("#ui_app_customise_controls_rain").css("display", "inline");
  } else if (img.parentElement.id == "clouds") {
    setScene("clouds");
    $("#ui_app_customise_controls_test").css("display", "inline");
  }
};

$(window).scroll(function () {
  var requiredOffset = 100;

  // Between 0 and 1 (inclusive)
  var percentage = Math.min(1, $(window).scrollTop() / requiredOffset);

  // Starts at requiredOffset and goes down to 0
  var marginTop = requiredOffset * (1 - percentage);

  // Opacity of frame
  var alpha = 1 - percentage;

  $(".ui_app").css("margin-top", marginTop);
  $("#ui_app_customize_heading").css("opacity", 1 - alpha);
  $("#ui_app_library").css("opacity", alpha);
  $("#ui_app_customise").css("opacity", 1 - alpha);
  $(".heading").css("opacity", alpha);

  if(alpha == 0)
  {
    $("#ui_app_library").css("visibility", "collapse");
  }
  else
  {
    $("#ui_app_library").css("visibility", "visible");
  }

});

const rangeInputs = document.querySelectorAll('input[type="range"]');

function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

function hasClass(element, className) {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

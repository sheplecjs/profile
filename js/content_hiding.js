function bring_to_front(div_name) {
  var allContent = document.querySelectorAll(".content-page");
  var allCrumbs = document.querySelectorAll(".breads");

  allContent.forEach(function (content) {
    content.style.visibility = "hidden";
    content.style.position = "absolute";
  });

  allCrumbs.forEach(function (crumb) {
    if (!crumb.classList.contains("breads-hidden")) {
      crumb.classList.add("breads-hidden");
    }
  });

  let targetContent = document.getElementById(div_name + "-div");
  targetContent.style.position = "static";
  targetContent.style.visibility = "visible";

  document
    .getElementById(div_name + "-bread")
    .classList.remove("breads-hidden");
}

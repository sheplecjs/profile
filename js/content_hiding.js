function bring_to_front(div_name, max_width) {
  // select all content pages
  var allContent = document.querySelectorAll(".content-page");
  var allCrumbs = document.querySelectorAll(".breads");

  // hide and shift all content up
  allContent.forEach(function (content) {
    content.style.visibility = "hidden";
    content.style.position = "absolute";
  });

  // hide any active crumbs
  allCrumbs.forEach(function (crumb) {
    if (!crumb.classList.contains("breads-hidden")) {
      crumb.classList.add("breads-hidden");
    }
  });

  // set our target content fixed and visible, then ensure the image is correctly sized and add breadcrumb
  let targetContent = document.getElementById(div_name + "-div");
  targetContent.style.position = "static";
  targetContent.style.visibility = "visible";

  // remove breadcrumb hiding
  document
    .getElementById(div_name + "-bread")
    .classList.remove("breads-hidden");

  // configure content image
  document.getElementById("main-img").style.objectFit = "cover";
  document.getElementById("main-img").style.maxWidth = max_width;
}

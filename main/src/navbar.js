export function navbar() {
  var documentElement = document.querySelector("html");
  var menuIsClose = navb.classList.contains("h-0");
  var svgIcon = burger.getElementsByTagName("svg");

  documentElement.addEventListener("click", function (event) {
    if ((menuIsClose && burger.contains(event.target)) || (!menuIsClose && !navb.contains(event.target))) {
      svgIcon[0].classList.toggle("hidden");
      svgIcon[1].classList.toggle("hidden");

      if (menuIsClose) {
        navb.classList.remove("h-0");
        navb.classList.add("h-40");
      } else {
        navb.classList.remove("h-40");
        navb.classList.add("h-0");
      }
      menuIsClose = !menuIsClose;
    }
  });

  // Browser resize listener
  window.addEventListener("resize", function () {
    // Rezise menu if user changing the width with responsive menu opened
    const window_size = window.innerWidth || document.body.clientWidth;
    if (window_size > 768) {
      navb.classList.remove("h-64");
    }
  });
}
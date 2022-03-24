// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// load svg sprite on page
(function (window, document) {
  "use strict";
  var file = "../img/svg.html",
    revision = 1;
  if (
    !document.createElementNS ||
    !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
  )
    return true;

  var isLocalStorage =
      "localStorage" in window && window["localStorage"] !== null,
    request,
    data,
    insertIT = function () {
      document.body.insertAdjacentHTML("afterbegin", data);
    },
    insert = function () {
      if (document.body) insertIT();
      else document.addEventListener("DOMContentLoaded", insertIT);
    };

  if (isLocalStorage && localStorage.getItem("inlineSVGrev") == revision) {
    data = localStorage.getItem("inlineSVGdata");
    if (data) {
      insert();
      return true;
    }
  }

  try {
    request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();
        if (isLocalStorage) {
          localStorage.setItem("inlineSVGdata", data);
          localStorage.setItem("inlineSVGrev", revision);
        }
      }
    };
    request.send();
  } catch (e) {}
})(window, document);

window.onload = function () {
  let div = document.getElementsByClassName("main__home_view")[0];
  let img = document.createElement("img");
  img.id = "jsshowimg";
  div.appendChild(img);
  document
    .querySelectorAll(".main__home_companies-list a")
    .forEach(function (el) {
      let src = el.dataset.src;
      if (src) {
        el.addEventListener("mouseleave", function () {
          div.classList.remove("show");
        });
        el.addEventListener("mouseenter", function () {
          img.src = src;
          div.classList.add("show");
        });
      }
    });
};

$(document).ready(function () {
  // onload images
  let iswebp = $("html").hasClass("webp");
  let cont = document.createElement("div");
  cont.id = "swiper";
  cont.className = "swiper-container";
  let wrap = document.createElement("div");
  wrap.className = "swiper-wrapper";
  let pagin = document.createElement("div");
  pagin.className = "swiper-pagination";
  $("[data-src]").each(function (ix, el) {
    let filepath = $(el).data("src");
    if (iswebp) {
      // load webp
      filepath = filepath.replace(/(png|jpg)/, "webp");
      $(el).data("src", filepath);
    }
    let tag_a = document.createElement("a");
    tag_a.href = $(el).attr("href");
    let img = document.createElement("img");
    img.className = "swiper-slide";
    img.src = filepath;
    tag_a.appendChild(img);
    wrap.appendChild(tag_a);
  });

  cont.appendChild(wrap);
  cont.appendChild(pagin);
  if (
    window.innerWidth < 768 &&
    document.getElementsByClassName("main__home_view").length
  ) {
    document.getElementsByClassName("main__home_view")[0].replaceWith(cont);
    $("#swiper .swiper-wrapper").slick({
      // infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
    });
  }
  $(".hamburger-lines").click(function () {
    $(".header__home").toggleClass("show");
  });
});

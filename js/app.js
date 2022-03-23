(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    (function(window, document) {
        "use strict";
        var file = "../img/svg.html", revision = 1;
        if (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) return true;
        var request, data, isLocalStorage = "localStorage" in window && null !== window["localStorage"], insertIT = function() {
            document.body.insertAdjacentHTML("afterbegin", data);
        }, insert = function() {
            if (document.body) insertIT(); else document.addEventListener("DOMContentLoaded", insertIT);
        };
        if (isLocalStorage && localStorage.getItem("inlineSVGrev") == revision) {
            data = localStorage.getItem("inlineSVGdata");
            if (data) {
                insert();
                return true;
            }
        }
        try {
            request = new XMLHttpRequest;
            request.open("GET", file, true);
            request.onload = function() {
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
    $((function() {
        var div = $(".main__home_view");
        var img = $("img", div)[0];
        $(".main__home_companies-list a").each((function(i, el) {
            var src = $(el).data("src");
            if ($(el).data("src")) $(el).mouseleave((function() {
                div.removeClass("show");
            })).mouseenter((function() {
                img.src = src;
                div.addClass("show");
            }));
        }));
    }));
    $(document).ready((function() {
        let iswebp = $("html").hasClass("webp");
        let cont = document.createElement("div");
        cont.id = "swiper";
        cont.className = "swiper-container";
        let wrap = document.createElement("div");
        wrap.className = "swiper-wrapper";
        let pagin = document.createElement("div");
        pagin.className = "swiper-pagination";
        $("[data-src]").each((function(ix, el) {
            let filepath = $(el).data("src");
            if (iswebp) {
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
        }));
        cont.appendChild(wrap);
        cont.appendChild(pagin);
        if (window.innerWidth < 768) {
            document.getElementsByClassName("main__home_view")[0].replaceWith(cont);
            $("#swiper .swiper-wrapper").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2e3,
                dots: true
            });
        }
        $(".hamburger-lines").click((function() {
            $(".header__home").toggleClass("show");
        }));
    }));
    window["FLS"] = true;
    isWebp();
})();
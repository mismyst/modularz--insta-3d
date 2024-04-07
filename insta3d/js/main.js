// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        "assert",
        "clear",
        "count",
        "debug",
        "dir",
        "dirxml",
        "error",
        "exception",
        "group",
        "groupCollapsed",
        "groupEnd",
        "info",
        "log",
        "markTimeline",
        "profile",
        "profileEnd",
        "table",
        "time",
        "timeEnd",
        "timeStamp",
        "trace",
        "warn"
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
})();

// Place any jQuery/helper plugins in here.

/*
===============================
###   TOP BAR
###   CHANGE BACKGROND
===============================
*/

if (typeof topBarClass == "undefined") {
    topBarClass = "top-bar-light";
}

function getScrollTop() {
    if (typeof pageYOffset != "undefined") {
        return pageYOffset;
    } else {
        var b = document.body; //IE 'quirks'
        var d = document.documentElement; //IE with doctype
        d = d.clientHeight ? d : b;
        return d.scrollTop;
    }
}

function setClassTopBar(topBarClass) {
    if (typeof topBarClass === "undefined") {
        topBarClass = "top-bar-dark";
    }
    if (typeof heightChange != "undefined") {
        if (getScrollTop() >= heightChange) {
            $(".top-bar").removeClass(topBarClass); // top-bar-light sau top-bar-dark
            $(".top-bar").addClass("smaller_bar");
        } else if (getScrollTop() <= heightChange) {
            $(".top-bar").addClass(topBarClass);
            $(".top-bar").removeClass("smaller_bar");
        }
    }
}

//remove item from array
function removeItem(array, item) {
    for (var i in array) {
        if (array[i] == item) {
            array.splice(i, 1);
            break;
        }
    }
}

/*
===============================
###   Open Sign UP OVERLAY
###   
===============================
*/
function openSignupOverlay(e) {
    e.preventDefault();
    var overlay = $("#signup-overlay");
    overlay.fadeIn(200);

    overlay.find(".pick_username_form").addClass("hidden");
    overlay.find(".social_login_label").removeClass("hidden");
    overlay.find(".regular-signup").removeClass("hidden");
    overlay.css("background-color", "rgba(42, 48, 58, 0.95)");
    overlay
        .find(".title")
        .html('<span class="highlight">Step 1:</span> Create an account or login');
    overlay
        .find("#signup")
        .append('<input type="hidden" value="true" name="skip-ver">');
    addBodyScrollLock("product-overlay-open");
}

function submitSearchForm() {
    // var searchform = $("form#searchForm");
    var q = $("form#searchForm")
        .find('input[name="q"]')
        .val();
    var type = $("form#searchForm")
        .find('input[name="type"]')
        .val();
    var search = $("form#searchForm")
        .find('input[name="search"]')
        .val();
    var maxPrice = $("form#searchForm")
        .find('input[name="maxPrice"]')
        .val();
    var minPrice = $("form#searchForm")
        .find('input[name="minPrice"]')
        .val();
    var page_language = $("form#searchForm")
        .find('input[name="page_language"]')
        .val();

    var section = '3d-models';

    q = q.split(" ").join("-");
    q = encodeURIComponent(q);

    var free = "";
    var premium = ""
    if (minPrice == 1) {
        section = "premium-" + section;
    }

    if (page_language == 'es') {
        section = 'modelos-3d';
        if (minPrice == 1) {
            section = section + "-premium";
        }
    }

    window.location = pl_url + "/" + section + "/" + q;
}
/*
===============================
###   Model_entry
###   Generate Tooltip Image
===============================
*/
//tooltip image products
function generateTooltip() {
    $("div.model-entry a.outer img").each(function() {
        var src = $(this).attr("src");
        src = src.replace("/s/", "/m/");

        var title = $(this).attr("title");
        var rel = JSON.parse($(this).attr("rel"));

        if (
            typeof $(this)
            .closest(".panel-bookmarks-entries")
            .prop("className") == "undefined"
        ) {
            $(this).qtip({
                // Simply use an HTML img tag within the HTML string
                content: '<img class="tooltipModel" src="' +
                    rel.imgd +
                    '"><div class="tooltipModel"><table cellspaping="0" cellpadding="0" border="0"><tr><th><span style="float:left;">' +
                    title +
                    '</span><div class="standard ' +
                    rel.standard +
                    '"></div></th><th>' +
                    rel.pret +
                    '</th></tr><tr><td colspan="2">' +
                    rel.type +
                    "</td></tr></table></div>",
                show: {
                    event: "mouseover",
                    ready: false
                },
                hide: {
                    event: "click mouseleave",
                    fixed: false
                },
                style: {
                    width: "auto",
                    background: "#FFFFFF",
                    border: {
                        width: 0,
                        radius: 0,
                        color: "#FFFFFF"
                    },
                    padding: 0
                },
                position: {
                    corner: {
                        target: "rightMiddle",
                        tooltip: "leftMiddle"
                    },
                    adjust: {
                        screen: true
                    }
                }
            });
        }
    });
}

(function($) {
    $.fn.slideIn = function(options) {

        this.each(function() {
            var element = this;
            var loggedin = $(".account-hamburger.loggedin");

            var cc = $(this).find(".content-container");

            if (loggedin.length > 0) {
                //logged in
                $(this).addClass("loggedin");
                $(this)
                    .find(".toggle-btn")
                    .append($(".avatar-container").clone());
                cc.append($("#user-panel-container").clone());
                cc.append($(".nav-search-bar").clone());
                cc.append($(".nav-links").clone());
                cc.append($(".basket_notiff").clone());
                cc.append($(".msg_notiff").clone());
                cc.append($(".comm_notiff").clone());
            } else {
                //not logged in
                cc.append($(".nav-search-bar").clone());
                cc.append($(".nav-links").clone());
                cc.append($(".login-or-register").clone());
                cc.find("#username").attr("placeholder", "email");
                cc.find("#password").attr("placeholder", "password");
            }
            $(this)
                .find(".toggle-btn")
                .removeClass("hidden");
            $(this)
                .find(".toggle-btn")
                .click(function() {
                    $(element).toggleClass("open");
                });

            // messages, MAIL ICON
            $(document).on("click", ".slidein-menu .msg_notiff", function(e) {
                //$('#user-panel-container').hide();
                if ($(e.target).closest(".slidein-menu").length == 0) {
                    $(".slidein-menu #comm-notiff-container").hide();
                    $(".slidein-menu #shopping-basket-container").hide(); //hide others
                    $(".slidein-menu #message-container").fadeIn(200);
                }
            });

            // comments, EARTH ICON
            $(document).on("click", ".slidein-menu .comm_notiff", function(e) {
                if ($(e.target).closest(".slidein-menu").length == 0) {
                    $("#user-panel-container").hide();
                    $("#message-container").hide();
                    $("#shopping-basket-container").hide(); // hide others
                    $("#comm-notiff-container").fadeIn(200);
                }
            });

            // shopping basket, BASKET ICON
            $(document).on("click", ".slidein-menu .basket_notiff", function(e) {
                if ($(e.target).closest(".slidein-menu").length == 0) {
                    $("#user-panel-container").hide();
                    $("#message-container").hide();
                    $("#comm-notiff-container").hide(); // hide others
                    $("#shopping-basket-container").fadeIn(200);
                }
            });
        });
    };
})(jQuery);

function initProductSliders() {
    // large slider on product page
    $(".main-product-slider").each(function(idx, e) {
        if (!$(e).hasClass("slick-initialized")) {
            var overlay_text = $(e).closest('.single-page-preview').length > 0 ? '_in_overlay' : '';
            $(e).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                rows: 0,
                asNavFor: "#main-product-slider-nav" + overlay_text,
                responsive: [{
                    breakpoint: 860,
                    settings: {
                        adaptiveHeight: true,
                        variableWidth: false,
                        mobileFirst: true
                    }
                }]
            });
        }
    });

    // thumb slider on product page
    $(".main-product-slider-nav").each(function(idx, e) {
        if (!$(e).hasClass("slick-initialized")) {
            var overlay_text = $(e).closest('.single-page-preview').length > 0 ? '_in_overlay' : '';
            $(e).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: "#main-product-slider" + overlay_text,
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                vertical: true,
                verticalSwiping: true,
                rows: 0,
                responsive: [{
                    breakpoint: 1080,
                    settings: {
                        vertical: false,
                        verticalSwiping: false,
                        variableWidth: true
                    }
                }]
            });
        }
    });

    // slider for similar products
    $(".product-similar-products").each(function(idx, e) {
        console.log($(e).closest('.left'));
        if (!$(e).hasClass("slick-initialized") && $(e).closest(".left").length === 0) {
            $(e).slick({
                slidesToScroll: 4,
                slidesToShow: 4,
                dots: true,
                infinite: true,
                focusOnSelect: true,
                variableWidth: true,
                fade: false,
                adaptiveHeight: true,
                responsive: [{
                        breakpoint: 860,
                        settings: {
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    });
}

// delete product
$("body").on("click", ".ss-trash.delete", function() {
    var product = this;
    $.ajax({
        type: "POST",
        url: "/post.php",
        data: {
            action: "status-product",
            product_id: product.id,
            state: "delete"
        },
        cache: false,
        dataType: "json",
        success: function(json) {
            if (json["update"] == true)
                $(product)
                .parent()
                .fadeOut(function() {
                    $(this).remove();
                });
        }
    });
});

// approve product
function approveProduct(element) {
    var elem = $(".ss-like.private");
    if (typeof element != "undefined") {
        elem = element;
    } else {
        var elem = $('.my-product .ss-like');
    }
    $(elem).click(function() {
        var product = this;
        $.ajax({
            type: "POST",
            url: "/post.php",
            data: {
                action: "status-product",
                product_id: product.id,
                state: "make-public"
            },
            cache: false,
            dataType: "json",
            success: function(json) {
                if (json["update"] == true) {
                    $(product).fadeOut();
                    $(product)
                        .parent()
                        .removeClass("review");
                    $(product).unbind();
                    lockProduct(product);
                }
            }
        });
    });
}

// unlock/make public product
function unlockProduct(element) {
    var elem = $(".ss-unlock.private");
    if (typeof element != "undefined") {
        elem = element;
    }
    $(elem).click(function() {
        var product = this;
        $.ajax({
            type: "POST",
            url: "/post.php",
            data: {
                action: "status-product",
                product_id: product.id,
                state: "make-public"
            },
            cache: false,
            dataType: "json",
            success: function(json) {
                console.log(json);
                if (json["update"] == true) {
                    $(product).toggleClass("ss-lock ss-unlock");
                    $(product)
                        .parent()
                        .removeClass("private");
                    $(product).unbind();
                    lockProduct(product);
                }
            },
            error: function(response) {
                console.log(response);
                return "error";
            }
        });
    });
}

// lock/make private product
function lockProduct(element) {
    var elem = $(".ss-lock.private");
    if (typeof element != "undefined") {
        elem = element;
    }
    $(elem).click(function() {
        var product = this;
        $.ajax({
            type: "POST",
            url: "/post.php",
            data: {
                action: "status-product",
                product_id: product.id,
                state: "make-private"
            },
            cache: false,
            dataType: "json",
            success: function(json) {
                if (json["update"] == true) {
                    $(product).toggleClass("ss-lock ss-unlock");
                    $(product)
                        .parent()
                        .addClass("private");
                    $(product).unbind();
                    unlockProduct(product);
                }
            }
        });
    });
}

function generateRandomString() {
    return (
        Math.random()
        .toString(36)
        .substring(2, 15) +
        Math.random()
        .toString(36)
        .substring(2, 15)
    );
}

function initFullScreenGallery() {
    $("body").addClass("full_screen_gallery_on");

    $("#full_screen_gallery").on("init", function(event, slick) {
        setTimeout(function() {
            $(document)
                .find("#full_screen_gallery .slick-list")
                .attr("tabindex", 0)
                .focus();
        }, 100);
    });

    // large slider on product page
    $("#full_screen_gallery").each(function(idx, e) {
        if (!$(e).hasClass("slick-initialized")) {
            $(e).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                rows: 0,
                asNavFor: "#full_screen_gallery_nav",
                responsive: [{
                    breakpoint: 860,
                    settings: {
                        adaptiveHeight: true,
                        variableWidth: false,
                        mobileFirst: true
                    }
                }]
            });
        }
    });

    // thumb slider on product page
    $("#full_screen_gallery_nav").each(function(idx, e) {
        if (!$(e).hasClass("slick-initialized")) {
            $(e).slick({
                slidesToScroll: 3,
                centerMode: true,
                asNavFor: "#full_screen_gallery",
                dots: false,
                focusOnSelect: true,
                variableHeight: true,
                vertical: true,
                verticalSwiping: true,
                rows: 0,
                infinite: false,
                responsive: [{
                    breakpoint: 860,
                    settings: {
                        variableHeight: false,
                        vertical: false,
                        verticalSwiping: false,
                        variableWidth: true
                    }
                }]
            });
        }
    });
}

function hideFlashMessage() {
    setTimeout(function() {
        $(".flash-message").addClass("closed");
    }, 1000);
}

// document ready starts here

$(document).ready(function() {
    setClassTopBar();
    generateTooltip();
    initProductSliders();

    approveProduct();
    unlockProduct();
    lockProduct();
    hideFlashMessage();

    var pageHistoryId = generateRandomString();
    var historyKeyPressLocked = false;

    $(".similar-products-container").prepend(
        "<span class='toggle-similar-products'><span class='label'>Browse similar</span></span>"
    );

    $(document).on("click", ".toggle-similar-products", function(e) {
        var container = $(e.target).closest(".similar-products-container");
        $(container).toggleClass("closed");
    });

    // search on enter
    $("#searchinput").keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            submitSearchForm();
            return false;
        }
    });

    $(document).on("click", ".toggle-fullscreen-gallery", function(e) {
        if (!$("body").hasClass("full_screen_gallery_on")) {
            if ($(".full_screen_gallery__container").length === 0) {
                $("body").append(
                    "<div class='full_screen_gallery__container'><div id='full_screen_gallery' class='full_screen_gallery'></div><div id='full_screen_gallery_nav' class='full_screen_gallery_nav'></div><span class='toggle-fullscreen-gallery'></span></div>"
                );
            }
            var full_screen_gallery = $("#full_screen_gallery");
            var full_screen_gallery_nav = $("#full_screen_gallery_nav");
            $(e.target)
                .closest(".product-slider-container")
                .find("img.large-image")
                .each(function(key, element) {

                    full_screen_gallery.append(
                        "<div class='slide'><img src='" +
                        $(element).attr("data-slide_bigimg") +
                        "'/></div>"
                    );
                    full_screen_gallery_nav.append(
                        "<div class='slide'><img src='" +
                        $(element).attr("data-slide_tmb") +
                        "'/></div>"
                    );
                });
            $("body").addClass("full-gallery-scroll-locked");
            initFullScreenGallery();
        } else {
            $(".full_screen_gallery__container").remove();
            $("body").removeClass("full_screen_gallery_on");
            $("body").removeClass("full-gallery-scroll-locked");
        }
    });

    // esc, backspace for overlay
    $("body").keyup(function(e) {
        var single_page_preview = $(".single-page-preview.active");

        if (!$("body").hasClass("full_screen_gallery_on")) {
            if (single_page_preview.length > 0) {

                switch (e.which) {
                    case 27:
                        // esc

                        var single_page_preview = $("body").find(".single-page-preview");
                        single_page_preview.removeClass("active");

                        // multiple pages could be rolled back
                        localStorage.setItem(pageHistoryId + "_rollbackOverlay", "true");
                        localStorage.setItem("rollbackOverlay", "true");
                        rollBackPreviewOverlay();

                        break;
                    case 8:
                        // backspace
                        if (!historyKeyPressLocked) {
                            historyKeyPressLocked = true;
                            window.history.go(-1);
                        }

                        setTimeout(function() {
                            historyKeyPressLocked = false;
                        }, 300);

                        break;
                }
            }
        } else {
            if (e.which === 27) {
                $(".full_screen_gallery__container").remove();
                $("body").removeClass("full_screen_gallery_on");
                $("body").removeClass("full-gallery-scroll-locked");
            }
        }
    });

    function addBodyScrollLock(overlay_type) {
        if (typeof overlay_type !== "undefined" && overlay_type !== false) {
            $("body").addClass(overlay_type);
        }

        $("body").addClass("scroll-locked");
    }

    function removeBodyScrollLock(overlay_type) {
        if (typeof overlay_type !== "undefined" && overlay_type !== false) {
            $("body").removeClass(overlay_type);
        }
        if (!$("body").hasClass("product-overlay-open")) {
            $("body").removeClass("scroll-locked");
        }
    }

    // login dropdown
    $(document).on("click", ".login-button", function(e) {
        $(e.target)
            .siblings("#login-container")
            .fadeIn(200);
        $("#username").focus();
        return false;
    });

    //hide opened dropdowns
    $(document).on("click", function(e) {
        if ($(e.target).closest("#login-container").length == 0) {
            $("#login-container").hide();
        }

        if (!$(e.target).hasClass("msg_notiff") &&
            $(e.target).closest("#message-container").length == 0
        ) {
            $("#message-container").hide();
        }

        if (!$(e.target).hasClass("comm_notiff") &&
            $(e.target).closest("#comm-notiff-container").length == 0
        ) {
            $("#comm-notiff-container").hide();
        }

        if (!$(e.target).hasClass("basket_notiff") &&
            $(e.target).closest("#shopping-basket-container").length == 0
        ) {
            $("#shopping-basket-container").hide();
        }

        if ($(e.target).closest(".account-hamburger.loggedin").length == 0) {
            $("#user-panel-container").hide();
        }
    });

    $("#signup-overlay").click(function(e) {
        if ($(e.target).closest(".signup-container").length == 0) {
            $("#signup-overlay").fadeOut(200);
            removeBodyScrollLock();
        }
    });

    $("#close-dim").click(function(event) {
        $("#signup-overlay").fadeOut(200);
        removeBodyScrollLock();
    });

    // optiune login la inregistrare
    $(".su-option-login").click(function(event) {
        $("#signup-overlay").fadeOut(200);
        removeBodyScrollLock();
        $("#login-container").fadeIn(200);
        $("#username").focus();
        return false;
    });

    $("#signin").submit(function(e) {
        $(this).fadeOut(0);
        $(this).before(
            '<center><img src="/img/preloaders/91.svg" class="p20"></center>'
        ); //ajax-loader-1.gif
    });

    ////// Top bar dropdowns

    // messages, MAIL ICON
    $(".msg_notiff").click(function(e) {
        if ($(e.target).closest(".slidein-menu").length == 0) {
            $("#user-panel-container").hide();
            $("#comm-notiff-container").hide();
            $("#shopping-basket-container").hide(); //hide others
            $("#message-container").fadeIn(200);
        }
    });

    // comments, EARTH ICON
    $(".comm_notiff").click(function(e) {
        if ($(e.target).closest(".slidein-menu").length == 0) {
            $("#user-panel-container").hide();
            $("#message-container").hide();
            $("#shopping-basket-container").hide(); // hide others
            $("#comm-notiff-container").fadeIn(200);
        }
    });

    // shopping basket, BASKET ICON
    $(".basket_notiff").click(function(e) {
        if ($(e.target).closest(".slidein-menu").length == 0) {
            $("#user-panel-container").hide();
            $("#message-container").hide();
            $("#comm-notiff-container").hide(); // hide others
            $("#shopping-basket-container").fadeIn(200);
        }
    });

    // user panel
    // dropdown
    $(".account-hamburger.loggedin").click(function(e) {
        $("#message-container").hide();
        $("#comm-notiff-container").hide();
        $("#shopping-basket-container").hide(); // hide others
        $("#user-panel-container").fadeIn(200);
    });

    // open signup on comments login button click
    $(document).on("click", ".comments-login-button", function(e) {
        $("#login-container").hide();
        overlay = $("#signup-overlay");
        overlay.find(".pick_username_form").addClass("hidden");
        overlay.find(".social_login_label").removeClass("hidden");
        overlay.find(".regular-signup").removeClass("hidden");
        overlay.fadeIn(200);
        addBodyScrollLock();
        $("#su_email").focus();
    });

    // register overlay
    $(document).on("click", ".signup-button", function(e) {
        $("#login-container").hide();
        overlay = $("#signup-overlay");
        overlay.find(".pick_username_form").addClass("hidden");
        overlay.find(".social_login_label").removeClass("hidden");
        overlay.find(".regular-signup").removeClass("hidden");
        overlay.fadeIn(200);
        addBodyScrollLock();
        $("#su_email").focus();
        //return false;
    });

    $("#top_bar_slidein").slideIn({});

    // hide hide-side-notf top notification
    $(document).on("click", "#hide-side-notf", function(e) {
        $("#hide-side-notf").parent().fadeOut(300);
        document.cookie = 'hide-side-notf=1; expires=Fri, 1 Jan 2030 00:00:00 UTC; path=/';
    });

    // report broken link
    $(document).on("click", ".report-broken-link__open-btn", function(e) {
        $(this)
            .parent()
            .addClass("open");

        var broken_link_form = $(this)
            .parent()
            .find(".report-broken-link__form");

        var first_issue_type = $(broken_link_form).find(
            ".report-broken-link__issue_type"
        )[0];
        $(first_issue_type)
            .find("input")
            .attr("checked", true);
        var response_container = $(broken_link_form).siblings(
            ".broken-link-response"
        );

        $(response_container).html("");
        $(broken_link_form).removeClass("hidden");
    });

    // close overlay for report broken link
    $(document).on("click", ".report-broken-link__close", function(e) {
        $(this)
            .closest(".report-broken-link")
            .removeClass("open")
            .removeClass("processing");
    });

    // send broken link form
    $(document).on("click", ".broken-link-form-item__send-btn", function(e) {
        var container = $(this).closest(".report-broken-link");

        var broken_link_form = $(this).closest(".report-broken-link__form");
        var response_container = $(broken_link_form).siblings(
            ".broken-link-response"
        );

        if (!container.hasClass("processing")) {
            $(this)
                .closest(".report-broken-link")
                .addClass("processing");

            var product_id = $(broken_link_form)
                .find(".broken-link-form-item__product-id")
                .val();
            var seo_url = $(broken_link_form)
                .find(".broken-link-form-item__seo-url")
                .val();
            var details = $(broken_link_form).find(".broken-link-form-item__details");
            var file_link = $(broken_link_form).find(
                ".broken-link-form-item__file-link"
            );

            var issue_type = $(broken_link_form)
                .find("input[name=broken_issue_type]:checked")
                .val();

            var data = {
                product_id: product_id,
                seo_url: seo_url,
                details: details.val(),
                file_link: file_link.val(),
                issue_type: issue_type,
                action: "notifyBrokenLink"
            };

            $.ajax({
                type: "POST",
                url: "/post.php",
                data: data,
                async: true,
                dataType: "json",
                success: function(response) {
                    if (
                        typeof response["mongo_response"] != "undefined" &&
                        response["mongo_response"]["ok"] === 1
                    ) {
                        $(broken_link_form).addClass("hidden");
                        $(response_container).html(
                            "<span class='success'>Your message was sent succesfully. Thank you for your feedback!</span>"
                        );
                        $(details).val("");
                        $(file_link).val("");
                    }
                    container.removeClass("processing");
                },
                error: function(response) {
                    return "error";
                }
            });
        }
    });

    // init slider for recommended products on search page
    $("#search-recommended-products").slick({
        slidesToShow: 1,
        slidesPerRow: 2,
        variableWidth: true,
        slidesToScroll: 1,
        infinite: false,
        rows: 12,
        arrows: true,
        fade: false,
        adaptiveHeight: true,
        responsive: [{
                breakpoint: 1081,
                //unslick
                settings: {
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false
                }
            },
            {
                breakpoint: 480,
                settings: "unslick"
            }
        ]
    });

    // init top slider for recommended products on search page
    $("#top-search-recommended-products").slick({
        slidesToShow: 5,
        slidesPerRow: 1,
        variableWidth: true,
        slidesToScroll: 4,
        infinite: false,
        rows: 1,
        arrows: true,
        fade: false,
        adaptiveHeight: true,
        responsive: [{
                breakpoint: 1081,
                //unslick
                settings: {
                    slidesPerRow: 4,
                    slidesToShow: 1,
                    slidesToScroll: 4,
                    variableWidth: false
                }
            },
            {
                breakpoint: 920,
                //unslick
                settings: {
                    slidesPerRow: 3,
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    variableWidth: false
                }
            },
            {
                breakpoint: 745,
                //unslick
                settings: {
                    slidesPerRow: 2,
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    variableWidth: false
                }
            },
            {
                breakpoint: 480,
                settings: "unslick"
            }
        ]
    });

    $(window).on("resize orientationchange", function() {
        $(".main-product-slider, .main-product-slider-nav").slick("resize");
    });

    $(".product-tool__zoom").each(function() {
        var content_wrapper = $(this).closest(".search-result__content-wrapper");
        var product_thumb = $(content_wrapper).find(".search-result__thumb");
        var src = $(product_thumb).attr("src");
        src = src.replace("/s/", "/m/");
        var title = $(product_thumb).attr("title");
        var rel = JSON.parse($(product_thumb).attr("rel"));
        $(this).qtip({
            // Simply use an HTML img tag within the HTML string
            content: '<img class="tooltipModel" src="' +
                rel.imgd +
                '"><div class="tooltipModel"><table cellspaping="0" cellpadding="0" border="0"><tr><th><span style="float:left;">' +
                title +
                '</span><div class="standard ' +
                rel.standard +
                '"></div></th><th>' +
                rel.pret +
                '</th></tr><tr><td colspan="2">' +
                rel.type +
                "</td></tr></table></div>",
            show: {
                event: "mouseover",
                ready: false
            },
            hide: {
                event: "click mouseleave",
                fixed: false
            },
            style: {
                width: "auto",
                background: "#FFFFFF",
                border: {
                    width: 0,
                    radius: 0,
                    color: "#FFFFFF"
                },
                padding: 0
            },
            position: {
                corner: {
                    target: "rightMiddle",
                    tooltip: "leftMiddle"
                },
                adjust: {
                    screen: true
                }
            }
        });
    });

    $(document).on(
        "click",
        "#add-to-basket, .product-tool__add-to-cart, .search-result__add-to-cart-btn",
        function(e) {
            e.stopPropagation();
            e.preventDefault();
            var add_btn = this;

            if (!$(add_btn).hasClass("loading")) {
                $(add_btn).addClass("loading");

                if (!$("body").hasClass("logged-in")) {
                    $("#signup-overlay").fadeIn(200);
                    addBodyScrollLock();
                } else {
                    data = {
                        seo_url: $(add_btn).attr("data-seo_url"),
                        action: "addToCart",
                        pl_url: pl_url
                    };
                    $.ajax({
                        type: "POST",
                        url: "/post.php",
                        data: data,
                        async: true,
                        dataType: "json",
                        success: function(response) {
                            if (typeof response["items_html"] !== "undefined") {
                                $("#shopping-basket-container .items-container").html(
                                    response["items_html"]
                                );
                                var sb_products_wrapper = $(
                                    "#shopping-basket-container .sb-products-wrapper"
                                );
                                sb_products_wrapper
                                    .find(".sb-product-dropdown")
                                    .first()
                                    .addClass("highlight");
                                sb_products_wrapper.animate({
                                    scrollTop: 0
                                }, "fast");

                                var shopping_basket_container = $("#shopping-basket-container");
                                $(shopping_basket_container)
                                    .find(".alert.m10")
                                    .remove();
                                $(shopping_basket_container)
                                    .siblings(".notification-counter")
                                    .html(response["cart_nr_items"])
                                    .removeClass("hidden");
                            }

                            $("#shopping-basket-container").fadeIn();
                            //sb_products_wrapper.find(".highlight").removeClass("highlight");

                            $(add_btn).removeClass("loading");
                            $(add_btn).replaceWith(response["see_cart_btn"]);
                        },
                        error: function(response) {
                            $(add_btn).removeClass("loading");
                            return "error";
                        }
                    });
                }
            }
        }
    );

    /*$(".product-tool__zoom").click(function(e) {
      e.preventDefault();
      e.stopPropagation();
    });*/

    // $(".search-result__price").each(function(idx, value) {
    //   var price = $(value).attr("data-price");
    //   $(value).html(price);
    // });

    function getSeoUrl(pathname) {
        var seo_url = pathname.substring(location.pathname.lastIndexOf("/") + 1);
        seo_url = seo_url.substring(0, seo_url.lastIndexOf("."));

        return seo_url;
    }

    function rollBackPreviewOverlay() {
        //var initial_pathname = localStorage.getItem("overlay_initial_path");
        var initial_pathname = localStorage.getItem(
            pageHistoryId + "_overlay_initial_path"
        );

        // is rolling back and has yes to find the initial page
        if (window.location.pathname !== initial_pathname) {
            window.history.go(-1);
            $(".similar-products-container.in-preview").remove();
        } else {
            $(".similar-products-container.in-preview").remove();
            $(".similar-products-container").removeClass("hidden");
            localStorage.removeItem(pageHistoryId + "_rollbackOverlay");
            localStorage.removeItem(pageHistoryId + "_overlay_initial_path");
        }

        removeBodyScrollLock("product-overlay-open");
        homepagePOSTpareTopBar();
    }

    $(document).on("click", ".single-page-preview.active", function(e) {
        if (
            $(e.target).hasClass("single-page-preview") === true &&
            $(e.target).hasClass("active") === true
        ) {
            $(e.target).removeClass("active");

            // multiple pages could be rolled back
            localStorage.setItem(pageHistoryId + "_rollbackOverlay", "true");
            localStorage.setItem("rollbackOverlay", "true");
            rollBackPreviewOverlay();
        }
    });

    $(document).on("click", ".single-page-preview__close", function(e) {
        var single_page_preview = $("body").find(".single-page-preview");
        single_page_preview.removeClass("active");

        // multiple pages could be rolled back
        localStorage.setItem(pageHistoryId + "_rollbackOverlay", "true");
        localStorage.setItem("rollbackOverlay", "true");
        rollBackPreviewOverlay();
    });

    window.onpopstate = function(event) {
        //location.reload();

        //var rollbackOverlay = localStorage.getItem("rollbackOverlay");
        //var initial_pathname = localStorage.getItem("overlay_initial_path");

        var section = '3d-models';

        if (page_language == 'es') {
            section = 'modelos-3d';
            if (minPrice == 1) {
                section = section + "-premium";
            }
        }

        var rollbackOverlay = localStorage.getItem(
            pageHistoryId + "_rollbackOverlay"
        );
        var initial_pathname = localStorage.getItem(
            pageHistoryId + "_overlay_initial_path"
        );

        // back button
        if (rollbackOverlay !== "true") {
            // back to listing page
            if (
                window.location.pathname.includes("3d-models/") === true ||
                window.location.pathname === initial_pathname
            ) {
                var single_page_preview = $("body").find(".single-page-preview");
                single_page_preview.removeClass("active");

                $(".similar-products-container.in-preview").remove();
                $(".similar-products-container").removeClass("hidden");

                localStorage.removeItem(pageHistoryId + "_overlay_initial_path");
                removeBodyScrollLock("product-overlay-open");
            } else {
                // back to previous page
                var seo_url = getSeoUrl(location.pathname);
                showProductPageOverlay(seo_url, true);
            }
        } else {
            // part of a rollback

            //has reached initial pathname
            if (window.location.pathname === initial_pathname) {
                var single_page_preview = $("body").find(".single-page-preview");
                single_page_preview.removeClass("active");
                $(".similar-products-container.in-preview").remove();
                $(".similar-products-container").removeClass("hidden");

                localStorage.removeItem(pageHistoryId + "_rollbackOverlay");
                localStorage.removeItem(pageHistoryId + "_overlay_initial_path");
                removeBodyScrollLock("product-overlay-open");
            } else {
                // try one step back
                rollBackPreviewOverlay();
            }
        }
    };

    $(document).on("click", "#download-prod", function(e) {
        var link_url = $(e.target).attr("href");
        if (link_url === "#") {
            $(".vault-overlay").fadeIn(100);
            return false;
        }
    });

    $(document).on("click", ".vault-overlay", function(event) {
        $(".vault-overlay").hide();
    });
    $(document).on("click", ".close-dim", function(event) {
        $(".vault-overlay").hide();
    });
    $(document).on("click", ".vault-cont", function(e) {
        e.stopPropagation();
    });

    function reloadCarbonAds() {
        // If the ad hasn't loaded yet, don't refresh it while it's still loading, or it will return two (or more) ads
        if (!$("#carbonads")[0]) return;
        // If the script hasn't loaded, don't try calling it
        if (typeof _carbonads !== 'undefined') _carbonads.refresh();
    }

    function showProductPageOverlay(seo_url, returning) {
        if (typeof returning === "undefined") {
            returning = false;
        }
        var data = {
            action: "productPageOverlay",
            seo_url: seo_url,
            language: page_language
        };
        $.ajax({
            type: "POST",
            url: "/post.php",
            data: data,
            async: true,
            dataType: "json",
            success: function(response) {

                var active_previews = $(".single-page-preview.active");

                if (!$("body").hasClass("product-overlay-open")) {
                    localStorage.setItem(
                        pageHistoryId + "_overlay_initial_path",
                        window.location.pathname
                    );
                    localStorage.setItem(
                        "overlay_initial_path",
                        window.location.pathname
                    );
                }

                var model_page = '3d-model';
                if (page_language == 'es') {
                    model_page = 'modelo-3d';
                }

                var product_path = "/" + model_page + "/" + seo_url + ".html";

                if (pl_url != '' && pl_url != '') {
                    product_path = pl_url + product_path;
                }

                if (!returning) {
                    window.history.pushState({}, "", product_path);
                }

                $(".search-result.loading").removeClass("loading");

                $("body").append("<div class='single-page-preview'></div>");
                single_page_preview = $("body").find(".single-page-preview:not(.temp)");

                single_page_preview.append(
                    "<div class='single-page-preview__content'>" +
                    response["page_html"] +
                    "<div class='single-page-preview__close'></div></div>"
                );
                if (typeof response["recommended_products_html"] !== "undefined") {
                    $(".similar-products-container").addClass("hidden");
                    $(".similar-products-container.in-preview").remove();

                    $("body").append(response["recommended_products_html"]);
                    $(".similar-products-container").prepend(
                        "<span class='toggle-similar-products'><span class='label'>Browse similar</span></span>"
                    );
                }

                setTimeout(function() {
                    single_page_preview.addClass("active");
                }, 0);

                /*var main_slider_thumbs = $(".thumbs-image-slider img");
                var thumbs_amount = main_slider_thumbs.length;

                $(main_slider_thumbs).each(function(idx, img) {
                  console.log(img);
                  $(img).load(function() {
                    console.log("loooo");
                    thumbs_amount--;
                    if (thumbs_amount === 0) {*/

                // $(".similar-products-container .search-result__price").each(function(
                //   idx,
                //   value
                // ) {
                //   var price = $(value).attr("data-price");
                //   $(value).html(price);
                // });
                initProductSliders();

                approveProduct();
                unlockProduct();
                lockProduct();

                setTimeout(function() {
                    $(".single-page-preview.temp").remove();
                    active_previews.remove();
                }, 30);

                addBodyScrollLock("product-overlay-open");

                reloadCarbonAds();
                /* }
                  });
                  img.onLoad = function() {
                    console.log("loaded");
                  };
                });*/
            },
            error: function(response) {

                $(".search-result.loading").removeClass("loading");

                var seo_url = getSeoUrl(location.pathname);

                if (!$("body").hasClass("product-overlay-open")) {
                    removeBodyScrollLock("product-overlay-open");
                    $(".single-page-preview.temp").remove();
                } else {
                    showProductPageOverlay(seo_url, true);
                }

                return "error";
            }
        });
    }

    function showProductPageTempOverlay(temp_data) {
        var temp_html = "";

        var price = temp_data["price"].replace("$", "");
        var price_comp = price.split(".");
        var digits = typeof price_comp[0] !== "undefined" ? price_comp[0] : "";
        var decimals = typeof price_comp[1] !== "undefined" ? price_comp[1] : "00";
        var product_class = price !== "0" ? "premium-product" : "free-product";

        var action_btn =
            '<a rel="nofollow" id="download-prod-temp" href="#" class="btn-action btn-download">Download</a>';
        if (price !== "0") {
            action_btn =
                '<a rel="nofollow" id="add-to-basket-temp" href="/shopping-cart?add=honda-city-3399" class="btn-action black btn-add-to-cart">Add to cart</a>';
        }

        temp_html +=
            "<div class='product-page-container " + product_class + " has-clearfix'>";
        temp_html += "<div class='product-page-header has-clearfix'>";
        temp_html += "<h1 class='product-page-header__title'>";
        temp_html += "<span class='title_text'>" + temp_data["title"] + "</span>";
        temp_html += "<span class='title_extra_info'>3d model</span>";
        temp_html += "</h1>";
        temp_html +=
            "<div class='btn-action btn-bookmark-product-temp ' title='Bookmark'>";
        temp_html += "<span class='count'>20</span>";
        temp_html += "</div>";
        temp_html += "</div>";
        temp_html += "<div class='product-main-info has-clearfix'>";
        temp_html += "<div class='product-slider-container'>";
        temp_html +=
            "<div class='large-image-slider temp-slider' id='main-product-slider-temp'>";
        temp_html += "<img src='" + temp_data["pic"] + "' />";
        temp_html += "</div>";
        temp_html +=
            "<div class='thumbs-image-slider temp-slider slick-vertical' id='main-product-slider-nav-temp'>";
        temp_html += "<img src='" + temp_data["thumb"] + "' />";
        temp_html += "</div>";
        temp_html += "</div>";
        temp_html += "<div class='product-main-details'>";
        temp_html += "<div class='product-main-details__action-container'>";
        temp_html +=
            "<div class=' product-action-bar product-main-details__action-bar'>";
        temp_html += "<div class='single-product-price-container'>";
        temp_html +=
            "<div class='single-product-price-container__digits'>" +
            digits +
            "</div>";
        temp_html +=
            "<div class='single-product-price-container__decimals'>" +
            decimals +
            "</div>";
        temp_html += "</div>";
        temp_html += "<div class='action-buttons-container'>";
        temp_html += "<!----- Add to Basket ------>";
        temp_html += action_btn;
        temp_html += "</div>";
        temp_html += "</div>";
        temp_html +=
            "<div class='product-license-container product-main-details__license-container '>";
        temp_html += "<div class='product-main-details__product-license'>";
        temp_html +=
            "<div class='product-license__content'><span class='license-text'>Personal Use License</span></div>";
        temp_html += "</div>";
        temp_html += "</div>";
        temp_html += "</div>";
        temp_html += "</div>";
        temp_html += "</div>";
        temp_html += "</div>";
        $("body").append("<div class='single-page-preview temp'></div>");

        $("body")
            .find(".single-page-preview:not(.temp)")
            .remove();

        single_page_preview = $("body").find(".single-page-preview.temp");
        single_page_preview.append(
            "<div class='single-page-preview__content'>" +
            temp_html +
            "<div class='single-page-preview__close'></div></div>"
        );
        single_page_preview.addClass("active");
    }

    $(document).on("click", ".product-page-link, .product-tool__zoom", function(
        e
    ) {
        exit();
        //e.stopPropagation();
        //e.preventDefault();
        var search_result = $(e.target).closest(".search-result");
        var seo_url = $(search_result).attr("data-seo_url");

        $(this)
            .closest(".search-result")
            .addClass("loading");

        var search_result_img = search_result.find(".search-result__thumb");
        var temp_data = {
            title: search_result.find(".search-result__title .link").html(),
            thumb: search_result_img.attr("src")
        };

        var img_rel = search_result_img.attr("rel");
        if (typeof img_rel !== "undefined") {
            img_rel = JSON.parse(img_rel);
            if (typeof img_rel["imgd"] !== "undefined") {
                temp_data["pic"] = img_rel["imgd"];
            }
            if (typeof img_rel["pret"] !== "undefined") {
                temp_data["price"] = img_rel["pret"];
            }
        }


        // hide homepage search and logo
        //homepagePREpareTopBar();
        console.log('nothing');
        //showProductPageTempOverlay(temp_data);
        //showProductPageOverlay(seo_url);
    });

    function homepagePREpareTopBar() {
        $(".homepage .awesome-logo").css('display', 'none');
        $(".homepage .top-bar").css({
            'background': '#272d39',
            'position': 'fixed'
        });
        $(".homepage .nav-search-bar").css('display', 'none');
    }

    function homepagePOSTpareTopBar() {

        $(".homepage .awesome-logo").css('display', 'block');
        $(".homepage .top-bar").css({
            'background': 'none',
            'position': 'relative'
        });
        $(".homepage .nav-search-bar").css('display', 'block');

    }

    // Bookmark product
    $(document).on("click", ".btn-bookmark-product", function(e) {
        e.preventDefault();
        var isBookmarked = $(e.target).hasClass("active");
        var seo_url = $(e.target)
            .closest(".product-page-container")
            .attr("data-seo_url");
        var requestData = {
            action: "bookmark",
            seo_url: seo_url
        };

        if (!$("body").hasClass("logged-in")) {
            $("#signup-overlay").fadeIn(200);
            addBodyScrollLock();
        } else {
            if (!$(e.target).hasClass("loading")) {
                $(e.target).addClass("loading");

                if (isBookmarked === true) {
                    // remove bookmark
                    $(".btn-bookmark-product").removeClass("active");
                    $(".btn-bookmark-product").addClass("default");
                    requestData["remove"] = 1;
                } else {
                    //add bookmark
                    $(".btn-bookmark-product").removeClass("default");
                    $(".btn-bookmark-product").addClass("active");
                }

                var loadbar_yt = $(".loading-top-yt");
                loadbar_yt.animate({
                    width: "30%"
                }, 500);

                $.ajax({
                    type: "POST",
                    url: "/post.php",
                    data: requestData,
                    cache: false,
                    success: function() {
                        if (isBookmarked === true) {
                            // has removed bookmark
                            $("#added-bookmark").fadeOut();
                            $("#removed-bookmark").fadeIn();
                            var count = parseInt($(".btn-bookmark-product .count").text());
                            $(".btn-bookmark-product .count").html(--count);
                        } else {
                            // has bookmarked model
                            $("#removed-bookmark").fadeOut();
                            $("#added-bookmark").fadeIn();
                            var count = parseInt($(".btn-bookmark-product .count").text());
                            $(".btn-bookmark-product .count").html(++count);
                        }
                        $(e.target).removeClass("loading");

                        loadbar_yt.animate({
                            width: "100%"
                        }, 500, function() {
                            $(this).css({
                                width: 0
                            });
                        });
                    }
                });
            }
        }
    });

    $(document).on("click", ".info-overlay", function(event) {
        $(".info-overlay").hide();
    });
    $(document).on("click", ".close-dim", function(event) {
        $(".info-overlay").hide();
    });
    $(document).on("click", ".info-cont", function(e) {
        e.stopPropagation();
    });


    ///////////////////////////////////////////////////////////
    ///// i18n
    // toggle desc translation
    $(document).on('click', '.description-container .switch_lang_button', function() {
        $(this).parent().find('.product-description__text').toggle();
    });

    // toggle change region
    $('.change-region-button').click(function() {
        $('.change-region .dropup').toggle();
    });

    // 

    ///////////////////////////////////////////////////////////
    // product page interactivity

    // Reviews

    // delete review - only moderators and admins
    $(document).on("click", ".product-review__delete-review", function() {
        var review = $(this);
        var reviewId = $(this).attr("data-id");
        var reply_idx = -1;

        if ($(this).hasClass("delete-reply")) {
            var reply_item = $(this).closest(".product-review__reply-item");
            reply_idx = reply_item.index();
        }

        $("body").css("cursor", "wait");

        $.ajax({
            type: "POST",
            url: "/post.php",
            data: {
                action: "removeReview",
                reviewId: reviewId,
                reply_idx: reply_idx
            },
            cache: false,
            dataType: "json",
            success: function(json) {
                $("body").css("cursor", "unset");
                if (json["status"]) {
                    if (reply_idx > -1) {
                        reply_item.remove();
                    } else {
                        review.closest(".product-review__item").remove();
                    }
                }
            }
        });
    });

    //add reply to review
    $(document).on("click", ".product-review__add-reply", function() {
        var id = $(this)
            .closest(".product-review__item")
            .attr("data-id");
        var new_reply = $(this)
            .closest(".product-review__item")
            .find(".product-review__new-reply");
        new_reply.fadeIn();
        if ($(".single-page-preview").length > 0) {
            scrollToElementObject(new_reply, ".single-page-preview");
        } else {
            scrollToElementObject(new_reply);
        }

        //$('div.new-reply[data='+id+']').fadeIn();
    });

    $(document).on("click", ".product-review__submit-reply", function() {
        var review_id = $(this)
            .closest(".product-review__item")
            .attr("data-id");
        var content = $(this)
            .closest(".product-review__new-reply")
            .find('textarea[name="contentReply"]')
            .val();

        $("body").css("cursor", "wait");

        var new_reply = $(".product-review__new-reply");
        if (!new_reply.hasClass("loading")) {
            new_reply.addClass("loading");

            if (content !== "") {
                $.ajax({
                    type: "POST",
                    url: "/post.php",
                    data: {
                        action: "insertReview",
                        review_id: review_id,
                        content: content,
                        review_reply: true
                    },
                    cache: false,
                    dataType: "json",
                    success: function(json) {
                        $("body").css("cursor", "unset");

                        if (json["status"]) {
                            $(".product-review__reviews-list").replaceWith(json["reviews"]);
                            new_reply.removeClass("loading");
                        } else {
                            if (json["errorMsg"] != "") errorMsg = json["errorMsg"];
                            else errorMsg = "* There was a problem! Please try again!";
                            $(new_reply)
                                .find(".discussion__error-msg ")
                                .html(errorMsg);
                            $(new_reply)
                                .find(".discussion__error-msg ")
                                .fadeIn(0);

                            new_reply.removeClass("loading");
                        }
                    }
                });
            } else {
                errorMsg = "* Please add a reply message before submitting.";
                $(new_reply)
                    .find(".discussion__error-msg ")
                    .html(errorMsg);
                $(new_reply)
                    .find(".discussion__error-msg ")
                    .fadeIn(0);
                new_reply.removeClass("loading");
            }
        }
    });

    //end add reply to review

    // submit review AJAX
    $(document).on("click", ".product-review__submit-review", function(e) {
        var easyToUse = $(
            ".review-rating-input__easyToUse .review-rating__input"
        ).val();
        var valueForMoney = $(
            ".review-rating-input__valueForMoney .review-rating__input"
        ).val();
        var timeSaved = $(
            ".review-rating-input__timeSaved .review-rating__input"
        ).val();

        var content_input = $(".product-review__content--input");
        var content = content_input.val();

        var add_form = $(this).closest(".product-review__add-form");

        if (!add_form.hasClass("loading")) {
            add_form.addClass("loading");

            var seo_url = $(e.target)
                .closest(".product-review__add-form")
                .attr("data-seo_url");

            if (
                easyToUse != "" &&
                valueForMoney != "" &&
                timeSaved != "" &&
                seo_url != ""
            ) {
                $("body").css("cursor", "wait");

                $.ajax({
                    type: "POST",
                    url: "/post.php",
                    data: {
                        action: "insertReview",
                        easyToUse: easyToUse,
                        valueForMoney: valueForMoney,
                        timeSaved: timeSaved,
                        content: content,
                        seo_url: seo_url
                    },
                    cache: false,
                    dataType: "json",
                    success: function(json) {
                        $("body").css("cursor", "unset");
                        if (json["status"]) {
                            //location.reload();
                            $(".product-review__reviews-list").replaceWith(json["reviews"]);
                        } else {
                            if (json["errorMsg"] != "") errorMsg = json["errorMsg"];
                            else errorMsg = "* There was a problem! Please try again!";
                            $(".product-reviews__container")
                                .find(".product-review__error-msg")
                                .html(errorMsg);
                            $(".product-reviews__container")
                                .find(".product-review__error-msg")
                                .fadeIn(0);
                        }
                        add_form.removeClass("loading");
                    }
                });
            } else {
                add_form.removeClass("loading");
                errorMsg = "* Review is necessary!";
                $(".product-reviews__container")
                    .find(".product-review__error-msg")
                    .html(errorMsg);
                $(".product-reviews__container")
                    .find(".product-review__error-msg")
                    .fadeIn(0);
            }
        }
    });

    // update starts when adding review
    $("body").on("click", ".review-rating-input .review-rating__star", function(
        e
    ) {
        var parentOffset = $(this)
            .parent()
            .offset();
        var relativeXPosition = e.pageX - parentOffset.left; //offset -> method allows you to retrieve the current position of an element 'relative' to the document
        //var relativeYPosition = (e.pageY - parentOffset.top);

        var propertyName = $(this)
            .find(".review-rating__input")
            .attr("name");
        var changeValue = parseInt(relativeXPosition / 10) + 1;
        changeRate(changeValue, propertyName);
    });

    // type
    // easyToUse
    // valueForMoney
    // timeSaved
    function changeRate(lvl, type) {
        var x = $(".review-rating-input__" + type + " .review-rating__star");
        for (var i = 1; i <= 10; i++) $(x).removeClass("rate" + i);

        $(x).addClass("rate" + lvl);
        $('input[name="' + type + '"]').val(lvl);
    }

    // Comments

    // reply to comment
    $(document).on("click", ".product-comment__add-reply", function(e) {
        var reply_to_user = $(this).attr("title");
        var reply_to_id = $(this).attr("data-reply_id");

        scrollToElement("add_your_comment");

        $(".product-comment__add-form")
            .find('input[name="commentParentId"]')
            .val(reply_to_id);
        $(".reply-to").html("Reply to <b>" + reply_to_user + "</b>");
        $(".reply-to").css("display", "block");
        $(".product-comment_add-form .product-comment__content--input").focus();
    });

    // submit comment AJAX
    $(document).on("click", ".product-comment__submit-comment", function() {
        var content_input = $(
            ".product-comment__add-form--body .product-comment__content--input"
        );
        content = content_input.val();
        var parentId = $('input[name="commentParentId"]').val();
        var seo_url = $(".product-page-container").attr("data-seo_url");

        var add_form = $(this).closest(".product-comment__add-form");
        if (!add_form.hasClass("loading")) {
            add_form.addClass("loading");

            if (content != "" && seo_url != "") {
                $("body").css("cursor", "wait");

                $.ajax({
                    type: "POST",
                    url: "/post.php",
                    data: {
                        action: "insertComment",
                        content: content,
                        parentId: parentId,
                        seo_url: seo_url
                    },
                    cache: false,
                    dataType: "json",
                    success: function(json) {
                        $("body").css("cursor", "unset");
                        if (json["status"]) {
                            //location.reload();
                            $(".product-comment__comments-list").replaceWith(
                                json["comments"]
                            );
                        } else {
                            errorMsg = "* There was a problem! Please try again!";
                            $(".product-comments__container")
                                .find(".product-comment__error-msg")
                                .html(errorMsg);
                            $(".product-comments__container")
                                .find(".product-comment__error-msg")
                                .fadeIn(0);
                        }
                        content_input.val("");
                        add_form.removeClass("loading");
                    }
                });
            } else {
                add_form.removeClass("loading");
                errorMsg = "* Hey, you forgot the comment!";
                $(".product-comments__container")
                    .find(".product-comment__error-msg")
                    .html(errorMsg);
                $(".product-comments__container")
                    .find(".product-comment__error-msg")
                    .fadeIn(0);
            }
        }
    });

    // delete comment
    $(document).on("click", ".product-comment__delete-comment", function(e) {
        var comment = $(this);
        var commentId = $(this).attr("data-id");

        $("body").css("cursor", "wait");
        $.ajax({
            type: "POST",
            url: "/post.php",
            data: {
                action: "removeComment",
                commentId: commentId
            },
            cache: false,
            dataType: "json",
            success: function(json) {
                $("body").css("cursor", "unset");

                if (json["status"]) {
                    comment.closest(".product-comment__item").remove();
                    $.find(".product-comment__item." + commentId).remove();
                }
            }
        });
    });

    // get HasTag from URL
    // goto the replay comm

    function scrollToAnchor(aid, container) {
        if (typeof container === "undefined") {
            container = "html, body";
        }
        var aTag = $('div[name="' + aid + '"');
        $(container).animate({
            scrollTop: aTag.offset().top - 100
        }, "fast");
    }

    // scroll using element id
    function scrollToElement(id, container) {
        if (typeof container === "undefined") {
            container = "html, body";
        }
        var element = $("#" + id);
        $(container).animate({
            scrollTop: element.offset().top - 100
        }, "fast");
    }

    // scroll to element
    function scrollToElementObject(element, container) {
        if (typeof container === "undefined") {
            container = "html, body";
        }
        $(container).scrollTop(0);
        $(container).animate({
            scrollTop: element.offset().top - 100
        }, "fast");
    }

    /*
    ===============================
    ###     TOP BAR
    ###   CHANGE BACKGROND
    ===============================
    */
    //inaltimea in pixeli pentru care sa se schimbe top-bar-ul
    var topBarClass = "top-bar-dark";
    heightChange = 100;

    $(window).on("scroll", function() {
        setClassTopBar();
    });

    $(".reason-input").change(function(e) {

        if ($(e.target).val() === "other") {
            $(".reasons-other").removeClass("hidden");
        } else {
            $(".reasons-other").addClass("hidden");
        }

    });

    //document ready ends here
});
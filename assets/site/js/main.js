function stickyHeader() { $(".globalHeader").height(), $("nav").height(); if ($("html").hasClass("no-touch") && $(".sticky").sticky({ topSpacing: 0 }), $("body").hasClass("home")) { $("html").hasClass("no-touch") && $("#promoLink").sticky({ topSpacing: 53 }), $(".promotionalLinks").on("click", "ul li", function (e) { var i = $("#promoLink-sticky-wrapper").attr("class"), t = $(this).children("a").attr("href"), n = $(this); $("html").hasClass("no-touch") ? "sticky-wrapper" == i ? $("html, body").animate({ scrollTop: $(t).offset().top - 180 }, 2e3) : "sticky-wrapper is-sticky" == i && $("html, body").animate({ scrollTop: $(t).offset().top - 140 }, 2e3) : $("html, body").animate({ scrollTop: $(t).offset().top }, 2e3), $(".promotionalLinks ul li").removeClass("active"), $(n).addClass("active"), e.preventDefault() }); var e = parseInt($("#buildingthefuture").offset().top), i = parseInt($("#csr").offset().top) + 360, t = parseInt($("#investors").offset().top) + 360, n = parseInt($("#news").offset().top) + 360; $("html").hasClass("no-touch") && $(window).on("scroll", function () { var a = $(this).scrollTop(); a < e && $(".promotionalLinks ul li").removeClass("active"), a >= e && ($(".promotionalLinks ul li").removeClass("active"), $(".promotionalLinks ul li").eq(0).addClass("active")), a >= i && ($(".promotionalLinks ul li").removeClass("active"), $(".promotionalLinks ul li").eq(1).addClass("active")), a >= t && ($(".promotionalLinks ul li").removeClass("active"), $(".promotionalLinks ul li").eq(2).addClass("active")), a >= n && $(".promotionalLinks ul li").removeClass("active") }) } } function focusAreaLoad() { var e = $(".globalHeader").innerHeight(), i = $("header").innerHeight(), t = $(".mainNavigation").innerHeight(), n = $("#promoLink-sticky-wrapper").innerHeight(); tlHeight = screenHeight - (e + i + t + n), $(".largeBanner .bxslider li").height(tlHeight) } function adjustfullPanel() { if (screenWidth > tabletMedia) { var e = $(".fullPanel img").height(), i = -$(".fullPanel img").width() / 2; $(".fullPanel").css({ height: e }), $(".fullPanel img").css({ marginLeft: i }) } } function showSearch() { $(".mainNavigation").on("click", ".showSearch", function () { $("a.showSearch").addClass("close"), $(".menu-icon a").removeClass("close"), $(".inputDiv").slideDown(), $(window).width() <= 960 ? $(".navigationList").hide() : ($(".navigationList > li > h2 > a").data("oneclick", "false"), $(".navigationList > li > h2 > a").removeClass("hover active"), $(".navigationList > li .dropBlock").slideUp()) }), $(".mainNavigation").on("click", ".showSearch.close", function () { $("a.showSearch").removeClass("close"), $(".inputDiv").slideUp() }), $(".mainNavigation").on("click", ".menu-icon a", function () { $("a.showSearch").removeClass("close"), $(".inputDiv").hide(), $(".navigationList").slideDown(), $(this).addClass("close") }), $(".mainNavigation").on("click", ".menu-icon a.close", function (e) { $(".navigationList").slideUp(), $(this).removeClass("close") }) } function resetNavigation() { $(".mainNavigation").find("*").each(function () { $(this).removeAttr("style") }), $(".mainNavigation .showSearch").removeClass("close"), $(".mainNavigation .menu-icon a").removeClass("close"), $(".navigationList > li > h2 > a").data("oneclick", "false"), $(".navigationList > li > h2 > a").removeClass("hover active") } function orientationChg() { setTimeout(function () { resetNavigation(), $(".mainNavigation").data("navigation") && $(".mainNavigation").data("navigation").setMenuPosition(), screenWidth = $(window).width(), screenHeight = $(window).height(), menuScroll(), $(".panelOpen").each(function () { panelAdjust($(this)) }), $(".overlay .popup").animate({ width: screenWidth, height: screenHeight }, 1e3), $(".lightboxOverlay").length > 0 && $(".lightboxOverlay").css("display", "none"), $(".lightbox").length > 0 && $(".lightbox").css("display", "none"), adjustfullPanel() }, 500) } function overlayVideo() { $(".videoLink").on("click", function (e) { if (e.preventDefault(), videoId = $(this).attr("href"), "undefined" == typeof YT) { var i = document.createElement("script"); i.src = "https://www.youtube.com/iframe_api"; var t = document.getElementsByTagName("script")[0]; t.parentNode.insertBefore(i, t) } else onYouTubeIframeAPIReady() }), $(".overlay ").on("click", ".close", function (e) { $(".overlay .popup").html(""), $(".overlay").fadeOut(), e.preventDefault() }) } function onYouTubeIframeAPIReady() { $("body, html").animate({ scrollTop: 0 }, { duration: 500, complete: function () { $(".overlay").fadeIn(1e3) } }), $(".overlay .popup").html(""), $(".overlay .popup").append("<div class='iframedContent'><div id='player'></div></div>"), $(".overlay .popup").append('<img class="loaderImg absolute-center" src="assets/site/images/ajax-loader.gif" alt="" />'), $(".overlay .popup").animate({ width: screenWidth, height: screenHeight }, 1e3), player = new YT.Player("player", { height: "80%", width: "100%", videoId: videoId, autoplay: 1, events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange }, playerVars: { rel: 0, wmode: "opaque" } }) } function onPlayerReady(e) { $(".loaderImg").hide() } function onPlayerStateChange(e) { e.data != YT.PlayerState.PLAYING || done || (done = !0) } function stopVideo() { player.stopVideo() } function panelAdjust(e) { e.find(".heading").innerHeight() } function menuScroll() { var e = $(window).width(), i = $(window).height(); e > 960 && $("html").hasClass("no-touch") ? $(".dropBlock").each(function () { var e = $(this), t = $(".globalHeader").outerHeight() + $("header").outerHeight() + $(".mainNavigation").outerHeight(), n = i - t - 50; e.height() > n ? (e.css({ height: n }).bind("jsp-initialised", function (e, i) { $(this).css({ visibility: "visible", display: "none" }) }).jScrollPane({ horizontalGutter: 0, verticalGutter: 0, showArrows: !1, maintainPosition: !0 }), e.find(".jspPane").css("padding-right", "0px"), $("html").hasClass("webkit") && e.find(".menuContent > ul > li:first-child").css("width", "214px")) : e.css({ height: "auto", visibility: "visible", display: "none", "padding-right": "0" }) }) : $(".dropBlock").css({ height: "auto", display: "none", visibility: "visible", "padding-right": "0" }), $(".navigationList").css("visibility", "visible") } function txtSelect() { $(".redirectionBox input:text, .threeColumn input").each(function () { var e = $(this).val(); $(this).focus(function () { $.trim(this.value) == e && $(this).val("") }), $(this).blur(function () { "" === $(this).val() && $(this).val(e) }) }) } function expandContent() { $(".expandContent").hide(), $(".expandLink").click(function () { curState = $(this).prev(".expandContent").css("display"), "none" == curState ? ($(this).addClass("collapse"), $(this).prev(".expandContent").slideDown("slow")) : ($(this).removeClass("collapse"), $(this).prev(".expandContent").slideUp()) }) } function anchoringContinents() { $(".anchorBand a").on("click", function (e) { e.preventDefault(), _thisAnchor = $(this).attr("href"), $("html").hasClass("no-touch") ? $("html, body").animate({ scrollTop: $(_thisAnchor).offset().top - 53 }, 1e3) : $("html, body").animate({ scrollTop: $(_thisAnchor).offset().top }, 1e3) }), $("a.top").on("click", function (e) { $("html").hasClass("no-touch") ? $("html, body").animate({ scrollTop: $("#anchorLinks").offset().top - 60 }, 1e3) : $("html, body").animate({ scrollTop: $("#anchorLinks").offset().top }, 1e3), e.preventDefault() }) } function otherwebsiteOpen() { $(".siteListings").height(""); var e = $(window).height(), i = $(".siteListings .rowContent").height(), t = $(".wrapper").height(), n = Math.max(e, t, i); $(".siteListings").height(n), $(".otherWebsites").click(function () { $(this).addClass("active"); var t = $(".wrapper").height(), n = Math.max(e, t, i); $(".siteListings").height(n), $(".mainNavigation").hide(), $(".siteListings").addClass("active").stop().slideDown(1e3) }), $(".closeMe").click(function () { $(".mainNavigation").show(), $(".siteListings").removeClass("active").stop().slideUp(1e3, function () { $(".otherWebsites").removeClass("active") }) }), $(".otherWebsitesIcon a").on("click", function (e) { resetNavigation(), $(".otherWebsites").triggerHandler("click"), $("html, body").animate({ scrollTop: 0 }) }) } function accordion() { $(".accordion h3.title a").click(function () { "none" == $(this).parent().next().css("display") ? ($(this).closest(".accordion").find("li.active .accContent").slideUp("slow"), $(this).closest(".accordion").find("li.active").removeClass("active"), $(this).closest("li").addClass("active"), $(this).parent().next().slideDown("slow")) : ($(this).closest("li").removeClass("active"), $(this).parent().next().slideUp("slow")) }) } function setDataTable() { var e = $(".contentDetails table, .plainContent table"); e.length > 0 && e.each(function () { if (_this = $(this), _this.addClass("dataTable"), !_this.parent().hasClass("dataTableWrapper")) { var e = $("<div/>"); e.addClass("dataTableWrapper"), e.insertBefore(_this), _this.remove().appendTo(e) } }) } function resizeCall(e) { var t = e.find("li"), n = t.length, a = e.find("a.expand"), o = 0, s = 0; e.find(".blockgrid").innerHeight(); for (screenWidth > mobileMedia && $(".leftColumn").not(".noRightPanel") && (n <= (o = 3) ? $(a).hide() : $(a).show()), screenWidth > mobileMedia && $(".leftColumn").hasClass("noRightPanel") && (o = 4, t.parent().removeClass("large-block-grid-3").addClass("large-block-grid-4"), n <= o ? $(a).hide() : $(a).show()), screenWidth <= mobileMedia && (n <= (o = 2) ? $(a).hide() : $(a).show()), i = 0; i < o; i++)t.eq(i).addClass("nt"); s = -1, e.find("li.nt").each(function () { var e = $(this).height(); s = e > s ? e : s }), e.find(".productsExpand").css({ height: s + 5 }), e.find(".anchorLink").removeClass("collapse").addClass("expand") } function browserDetect() { ($("html").hasClass("windowsxp") && $("html").hasClass("ie8") || $("html").hasClass("ie7") || $("html").hasClass("ie6") || $("html").hasClass("desktop") && $("html").hasClass("safari4")) && ($("body").addClass("errorPages"), $(".browserDetect").show(), $("html").css({ overflow: "hidden" })), $(".continue").on("click", function (e) { $("body").removeClass("errorPages"), $(".browserDetect").hide(), $("html").css({ overflow: "auto" }), e.preventDefault() }) } function debouncer(e, i) { var t; return i = i || 200, function () { var n = this, a = arguments; clearTimeout(t), t = setTimeout(function () { e.apply(n, Array.prototype.slice.call(a)) }, i) } } var screenWidth = $(window).width(), screenHeight = $(window).height(), mobileMedia = 641, tabletMedia = 960, smallMobileMedia = 481, videoId = "", player, posPanel, property = null, done = !1, panelOpen = function (e) { var i = $(e); i.find(".heading").on("click", function () { i.find(".heading").toggleClass("active"), $(this).is(".active") ? (i.find(".expandPanel").stop().slideDown(), i.addClass("active"), i.find(".expandPanel").css({ top: posPanel })) : (i.find(".expandPanel").stop().hide(), i.removeClass("active")) }) }; !function (e) { e.fn.tabPlugIn = function (i) { this.each(function () { var t = e(this).find(".tabsDiv li"), n = e(this).find(".tabContent"); e(n).hide(), e(n).eq(0).show(), e(t).eq(0).addClass("active"), e(t).click(function (a) { var o = e(this).index(); e(t).removeClass("active"), e(this).addClass("active"), e(n).fadeOut(), e(n).eq(o).delay(400).fadeIn({ complete: function () { e(window).width() < mobileMedia && e("html, body").animate({ scrollTop: e(this).offset().top - e(".mainNavigation").height() }) } }), a.preventDefault(), i && i(this) }) }) } }(jQuery); var showMoreProducts = function (e) { var i = $(e), t = (i.find("li"), i); $(i).on("click", ".expand", function (e) { var t = i.find(".blockgrid").innerHeight(); $(this).removeClass("expand").addClass("collapse"), $(this).prev().animate({ height: t }), e.preventDefault() }), $(i).on("click", ".collapse", function (e) { var n = -1; i.find("li.nt").each(function () { var e = $(this).height(); n = e > n ? e : n }), $(this).removeClass("collapse").addClass("expand"), $(this).prev().stop().animate({ height: n }), $("html, body").animate({ scrollTop: $(t).offset().top - 140 }), e.preventDefault() }) }; $(document).ready(function () { $(".leftColumn").length > 0 && $(".leftColumn").each(function () { $(this).hasClass("noRightPanel") && ($(this).find(".productLists ul.blockgrid").removeClass("large-block-grid-3").addClass("large-block-grid-4"), $(this).find(".album ul.blockgrid").removeClass("large-block-grid-3").addClass("large-block-grid-4")) }), otherwebsiteOpen(), anchoringContinents(), txtSelect(), expandContent(), $(".tabsPlugin").tabPlugIn(), stickyHeader(), accordion(), setDataTable(), overlayVideo(), showSearch(), window.attachEvent ? window.attachEvent("orientationchange", orientationChg, !1) : window.addEventListener("orientationchange", orientationChg, !1), $(".panelOpen").each(function () { panelOpen(this) }) }), $(window).load(function () { adjustfullPanel(), menuScroll(), $(".mainNavigation").navigation({ layoutWidth: 960 }), $(".list1").each(function () { showMoreProducts(this) }), $(".list2").each(function () { showMoreProducts(this) }), $(".list1").each(function () { resizeCall($(this)) }), $(".list2").each(function () { resizeCall($(this)) }) }), $(window).resize(function () { otherwebsiteOpen() }), $("html").hasClass("no-touch") ? $(window).bind("resize", debouncer(function (e) { $("html").hasClass("ie8") || (screenWidth = $(window).width(), $(".list1").each(function () { resizeCall($(this)) }), $(".list2").each(function () { resizeCall($(this)) })) })) : $("html").hasClass("touch") && $(window).bind("orientationchange", debouncer(function (e) { screenWidth = $(window).width(), $(".list1").each(function () { resizeCall($(this)) }), $(".list2").each(function () { resizeCall($(this)) }) })), $(document).ready(function () { $("[data-popup-open]").on("click", function (e) { var i = jQuery(this).attr("data-popup-open"); $('[data-popup="' + i + '"]').fadeIn(350), e.preventDefault() }), $("[data-popup-close]").on("click", function (e) { var i = jQuery(this).attr("data-popup-close"); $('[data-popup="' + i + '"]').fadeOut(350), e.preventDefault() }) }), $(document).ready(function () { $(".scrollbox").enscroll() }), function (e) { e.fn.sameHeight = function () { var i = this, t = []; i.each(function () { var i = e(this).height(); t.push(i) }); var n = Math.max.apply(null, t); i.each(function () { e(this).height(n) }) } }(jQuery), $(window).load(function () { $(".ourBusiness .blockContent .OverBgBlue").sameHeight() }), $(window).resize(function () { $(".ourBusiness .blockContent .OverBgBlue").sameHeight() });
$(document).ready(function () {

    $(".ccdarticle-slider").slick({
        speed: 1000,
        arrows: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        dots: false,
        pauseOnHover: true
    });

});
$(document).ready(function () {
    $('.show-more').click(function () {
        if ($('.show-more-snippet').css('height') != '55px') {
            $('.show-more-snippet').stop().animate({ height: '55px' }, 400);
            $(this).text('MORE');
        } else {
            $('.show-more-snippet').css({ height: '100%' });
            var xx = $('.show-more-snippet').height();
            $('.show-more-snippet').css({ height: '55px' });
            $('.show-more-snippet').stop().animate({ height: xx }, 400);
            // ^^ The above is beacuse you can't animate css to 100% (or any percentage).  So I change it to 100%, get the value, change it back, then animate it to the value. If you don't want animation, you can ditch all of it and just leave: $('.show-more-snippet').css({height:'100%'});^^ //
            $(this).text('LESS');
        }
    });
});
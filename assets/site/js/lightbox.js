(function() {
    var t = jQuery,
        i = function() {
            function t() {
                this.fadeDuration = 500, this.fitImagesInViewport = !0, this.resizeDuration = 700, this.positionFromTop = 50, this.showImageNumberLabel = !0, this.alwaysShowNavOnTouchDevices = !1, this.wrapAround = !1
            }
            return t.prototype.albumLabel = function(t, i) {
                return "Image " + t + " of " + i
            }, t
        }(),
        e = function() {
            function i(t) {
                this.options = t, this.album = [], this.currentImageIndex = void 0, this.init()
            }
            return i.prototype.init = function() {
                this.enable(), this.build()
            }, i.prototype.enable = function() {
                var i = this;
                t("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(e) {
                    return i.start(t(e.currentTarget)), !1
                })
            }, i.prototype.build = function() {
                var i = this;
                t("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-closeContainer'><a class='lb-close' title='Close'></a></div><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' title='Previous'></a><a class='lb-next' href='' title='Next'></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div></div></div></div>").appendTo(t("body")), this.$lightbox = t("#lightbox"), this.$overlay = t("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function() {
                    return i.end(), !1
                }), this.$lightbox.hide().on("click", function(e) {
                    return "lightbox" === t(e.target).attr("id") && i.end(), !1
                }), this.$outerContainer.on("click", function(e) {
                    return "lightbox" === t(e.target).attr("id") && i.end(), !1
                }), this.$lightbox.find(".lb-prev").on("click", function() {
                    return 0 === i.currentImageIndex ? i.changeImage(i.album.length - 1) : i.changeImage(i.currentImageIndex - 1), !1
                }), this.$lightbox.find(".lb-next").on("click", function() {
                    return i.currentImageIndex === i.album.length - 1 ? i.changeImage(0) : i.changeImage(i.currentImageIndex + 1), !1
                }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function() {
                    return i.end(), !1
                })
            }, i.prototype.start = function(i) {
                function e(t) {
                    n.album.push({
                        link: t.attr("href"),
                        title: t.attr("data-title") || t.attr("title")
                    })
                }
                var n = this,
                    a = t(window);
                a.on("resize", t.proxy(this.sizeOverlay, this)), t("select, object, embed").css({
                    visibility: "hidden"
                }), this.sizeOverlay(), this.album = [];
                var o, s = 0,
                    h = i.attr("data-lightbox");
                if (h) {
                    o = t(i.prop("tagName") + '[data-lightbox="' + h + '"]');
                    for (var r = 0; r < o.length; r = ++r) e(t(o[r])), o[r] === i[0] && (s = r)
                } else if ("lightbox" === i.attr("rel")) e(i);
                else {
                    o = t(i.prop("tagName") + '[rel="' + i.attr("rel") + '"]');
                    for (var l = 0; l < o.length; l = ++l) e(t(o[l])), o[l] === i[0] && (s = l)
                }
                var d = a.scrollTop() + this.options.positionFromTop,
                    c = a.scrollLeft();
                this.$lightbox.css({
                    top: d + "px",
                    left: c + "px"
                }).fadeIn(this.options.fadeDuration), this.changeImage(s)
            }, i.prototype.changeImage = function(i) {
                var e = this;
                this.disableKeyboardNav();
                var n = this.$lightbox.find(".lb-image");
                this.$overlay.fadeIn(this.options.fadeDuration), t(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
                var a = new Image;
                a.onload = function() {
                    var o, s, h, r, l, d;
                    n.attr("src", e.album[i].link), t(a), n.width(a.width), n.height(a.height), e.options.fitImagesInViewport && (d = t(window).width(), l = t(window).height(), r = d - e.containerLeftPadding - e.containerRightPadding - 20, h = l - e.containerTopPadding - e.containerBottomPadding - 120, (a.width > r || a.height > h) && (a.width / r > a.height / h ? (s = r, o = parseInt(a.height / (a.width / s), 10), n.width(s), n.height(o)) : (o = h, s = parseInt(a.width / (a.height / o), 10), n.width(s), n.height(o)))), e.sizeContainer(n.width(), n.height())
                }, a.src = this.album[i].link, this.currentImageIndex = i
            }, i.prototype.sizeOverlay = function() {
                this.$overlay.width(t(window).width()).height(t(document).height())
            }, i.prototype.sizeContainer = function(i, e) {
                function n() {
                    a.$lightbox.find(".lb-dataContainer").width(h), a.$lightbox.find(".lb-prevLink").height(r), a.$lightbox.find(".lb-nextLink").height(r), a.showImage()
                }
                var a = this,
                    o = this.$outerContainer.outerWidth(),
                    s = this.$outerContainer.outerHeight(),
                    h = i + this.containerLeftPadding + this.containerRightPadding,
                    r = e + this.containerTopPadding + this.containerBottomPadding + t(".lb-closeContainer").outerHeight();
                o !== h || s !== r ? this.$outerContainer.animate({
                    width: h,
                    height: r
                }, this.options.resizeDuration, "swing", function() {
                    n()
                }) : n()
            }, i.prototype.showImage = function() {
                this.$lightbox.find(".lb-loader").hide(), this.$lightbox.find(".lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
            }, i.prototype.updateNav = function() {
                var t = !1;
                try {
                    document.createEvent("TouchEvent"), t = !!this.options.alwaysShowNavOnTouchDevices
                } catch (t) {}
                this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (t && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), t && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), t && this.$lightbox.find(".lb-next").css("opacity", "1"))))
            }, i.prototype.updateDetails = function() {
                var i = this;
                void 0 !== this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title && this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast").find("a").on("click", function(i) {
                    location.href = t(this).attr("href")
                }), this.album.length > 1 && this.options.showImageNumberLabel ? this.$lightbox.find(".lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast") : this.$lightbox.find(".lb-number").hide(), this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
                    return i.sizeOverlay()
                })
            }, i.prototype.preloadNeighboringImages = function() {
                this.album.length > this.currentImageIndex + 1 && ((new Image).src = this.album[this.currentImageIndex + 1].link), this.currentImageIndex > 0 && ((new Image).src = this.album[this.currentImageIndex - 1].link)
            }, i.prototype.enableKeyboardNav = function() {
                t(document).on("keyup.keyboard", t.proxy(this.keyboardAction, this))
            }, i.prototype.disableKeyboardNav = function() {
                t(document).off(".keyboard")
            }, i.prototype.keyboardAction = function(t) {
                var i = t.keyCode,
                    e = String.fromCharCode(i).toLowerCase();
                27 === i || e.match(/x|o|c/) ? this.end() : "p" === e || 37 === i ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : "n" !== e && 39 !== i || (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
            }, i.prototype.end = function() {
                this.disableKeyboardNav(), t(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), t("select, object, embed").css({
                    visibility: "visible"
                })
            }, i
        }();
    t(function() {
        var t = new i;
        new e(t)
    })
}).call(this);
!function(n){function i(i,t){this.mainNavigation=n(i),this.settings=n.extend({},t),this.init()}i.prototype.init=function(){var i=this;this.navigationList=n(i.mainNavigation).find(".navigationList"),this.mainMenu=n(this.navigationList).find(" > li"),this.mainMenuAnchor=n(this.mainMenu).find(" > h2 > a"),this.subMenuBlock=n(this.mainMenu).find(".dropBlock"),this.bindEvents(),this.setMenuPosition()},i.prototype.setMenuPosition=function(){var i=this,t=n(window).width();t>960?(n(".dropBlock").find(".menuContent > ul > li").css("float","left"),i.mainMenuAnchor.each(function(){var e=n(this),o=e.position().left,a=o+e.outerWidth(),s=e.parents("li").find(".dropBlock").outerWidth(),c=i.settings.layoutWidth?i.settings.layoutWidth:t;o+s<=c?e.parents("li").find(".dropBlock").css("left","auto"):s<=a?e.parents("li").find(".dropBlock").css("left",a-s):e.parents("li").find(".dropBlock").css("left",(c-s)/2)})):(n(".dropBlock").css("left","auto"),n(".dropBlock").find(".menuContent > ul > li").css("float","none"))},i.prototype.eventFocus=function(){var i=this;i.mainMenuAnchor.on("focus",function(t){var e=n(this);i.mainMenuAnchor.removeClass("hover"),e.addClass("hover")})},i.prototype.eventMouseenter=function(){var i=this;i.mainMenuAnchor.on("mouseenter",function(t){var e=n(this);i.mainMenuAnchor.removeClass("hover active"),e.addClass("hover active"),i.mainMenuAnchor.parents("li").find(".dropBlock").stop().hide(),e.parents("li").find(".dropBlock").stop().slideDown(),n(window).width()>960&&(n(".showSearch").removeClass("close"),n(".inputDiv").stop().hide(),e.data("oneclick","true")),i.mainMenuAnchor.blur()})},i.prototype.eventMouseleave=function(){this.mainMenu.on("mouseleave",function(i){var t=n(this);t.find(" > h2 > a").removeClass("hover active"),t.find(".dropBlock").stop().hide(),n(window).width()>960&&t.data("oneclick","false")})},i.prototype.eventClick=function(){var i=this;i.mainMenuAnchor.on("click",function(t){t.preventDefault();var e=n(this);n(window).width()>960&&(n(".showSearch").removeClass("close"),n(".inputDiv").stop().hide()),i.mainMenuAnchor.removeClass("hover active"),e.addClass("hover active"),e.parents("li").find(".dropBlock").length<1?window.location.href=e.attr("href"):"false"==e.data("oneclick")?(i.mainMenuAnchor.each(function(){n(this).hasClass("active")?(n(this).parents("li").find(".dropBlock").stop().slideDown(),n(this).data("oneclick","true")):(n(this).parents("li").find(".dropBlock").stop().hide(),n(this).data("oneclick","false"))}),n(window).width()<=960&&n("html, body").animate({scrollTop:e.offset().top})):window.location.href=e.attr("href")})},i.prototype.eventKeyup=function(){var i=this;i.mainMenuAnchor.on("keyup",function(i){if(27==(i.which?i.which:i.keyCode)){var t=n(this);t.removeClass("active"),t.parents("li").find(".dropBlock").stop().slideUp(),t.data("oneclick","false")}}),i.subMenuBlock.find("li a").on("keyup",function(i){if(27==(i.which?i.which:i.keyCode)){var t=n(this),e=t.parents(".dropBlock"),o=e.parents("li").find(" > h2 > a");t.blur(),o.focus(),o.removeClass("active"),e.stop().slideUp(),o.data("oneclick","false")}})},i.prototype.bindEvents=function(){var i=this;!0===is_touch_device||n(window).width()<=960||(i.eventFocus(),i.eventMouseenter(),i.eventMouseleave(),i.eventKeyup()),i.mainMenuAnchor.data("oneclick","false"),i.eventClick()},n.fn.navigation=function(t){return this.each(function(){var e=n(this);if(!e.data("navigation")){var o=new i(this,t);e.data("navigation",o)}})}}(jQuery),$(document).ready(function(){is_touch_device="ontouchstart"in document.documentElement});
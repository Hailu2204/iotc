(function(n){function r(t){var i=t||window.event,e=[].slice.call(arguments,1),r=0,f=0,u=0;return t=n.event.fix(i),t.type="mousewheel",i.wheelDelta&&(r=i.wheelDelta/120),i.detail&&(r=-i.detail/3),u=r,i.axis!==undefined&&i.axis===i.HORIZONTAL_AXIS&&(u=0,f=-1*r),i.wheelDeltaY!==undefined&&(u=i.wheelDeltaY/120),i.wheelDeltaX!==undefined&&(f=i.wheelDeltaX/-120),e.unshift(t,r,f,u),(n.event.dispatch||n.event.handle).apply(this,e)}var t=["DOMMouseScroll","mousewheel"],i;if(n.event.fixHooks)for(i=t.length;i;)n.event.fixHooks[t[--i]]=n.event.mouseHooks;n.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var n=t.length;n;)this.addEventListener(t[--n],r,!1);else this.onmousewheel=r},teardown:function(){if(this.removeEventListener)for(var n=t.length;n;)this.removeEventListener(t[--n],r,!1);else this.onmousewheel=null}};n.fn.extend({mousewheel:function(n){return n?this.bind("mousewheel",n):this.trigger("mousewheel")},unmousewheel:function(n){return this.unbind("mousewheel",n)}})})(jQuery)
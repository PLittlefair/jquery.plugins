/*
* dragScroll- a jQuery plugin for creating a dragging scroll action on an element with overflow hidden
* version - 0.02
* Copyright (c) 2012 Paul Littlefair
* -------------------------------------------------------
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
* -------------------------------------------------------
*/(function(c){c.fn.dragScroll=function(l){function m(a){var b=a.offset(),c=b.left,b=b.top,g=c+a.outerWidth(),a=b+a.outerHeight();return{left:c,top:b,right:g,bottom:a}}function i(a,b){a.style.cursor=b?"n-resize":"default";return b}var j=c.extend({},c.fn.dragScroll.defaults,l);return this.each(function(){var a,b,h,g=+new Date+Math.floor(1E6*Math.random()),d=this,k=c(this),f=m(k);k.wrapInner('<div id="dragScrollInner-'+g+'" />').css({"-moz-user-select":"-moz-none","-khtml-user-select":"none","-webkit-user-select":"none",
"-ms-user-select":"none","user-select":"none"});h=c("#dragScrollInner-"+g).bind("mousedown",function(e){a=e.clientY+d.scrollTop-f.top;b=i(this,!0)}).bind("mouseup",function(){b=i(this)}).bind("mousemove",function(e){b&&(e=e.clientY+d.scrollTop-f.top,d.scrollTop=e<a?d.scrollTop+(a-e):d.scrollTop-(e-a))});j.scrollWheel&&h.bind("mousewheel",function(b){d.scrollTop=0<b.wheelDelta/120?d.scrollTop-j.scrollWheelJump:d.scrollTop+j.scrollWheelJump});c(document).bind("mousemove",function(a){if(b&&(a.clientX>
f.right||a.clientX<f.left||a.clientY<f.top||a.clientY>f.bottom))b=i(h.get(0))});this.onselectstart=function(){return!1}})};c.fn.dragScroll.defaults={scrollWheel:!1,scrollWheelJump:30}})(jQuery);
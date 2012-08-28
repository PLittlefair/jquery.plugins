/*
* dragScroll- a jQuery plugin for creating a dragging scroll action on an element with overflow hidden
* version - 0.02
* Copyright (c) 2012 Paul Littlefair
* -------------------------------------------------------
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
* -------------------------------------------------------
*/
(function(d){d.fn.dragScroll=function(l){function m(b){var c=parseInt(b.css("left"),10),d=parseInt(b.css("top"),10),g=c+b.outerWidth(),b=d+b.outerHeight();return{left:c,top:d,right:g,bottom:b}}function i(b,c){b.style.cursor=c?"n-resize":"default";return c}var j=d.extend({},d.fn.dragScroll.defaults,l);return this.each(function(){var b,c,h,g=+new Date+Math.floor(1E6*Math.random()),e=this,k=d(this),f=m(k);k.wrapInner('<div id="dragScrollInner-'+g+'" />').css({"-moz-user-select":"-moz-none","-khtml-user-select":"none",
"-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"});h=d("#dragScrollInner-"+g).bind("mousedown",function(a){b=a.clientY+e.scrollTop-f.top;c=i(this,!0)}).bind("mouseup",function(){c=i(this)}).bind("mousemove",function(a){c&&(a=a.clientY+e.scrollTop-f.top,e.scrollTop=a<b?e.scrollTop+(b-a):e.scrollTop-(a-b))});j.scrollWheel&&h.bind("mousewheel",function(a){e.scrollTop=0<a.wheelDelta/120?e.scrollTop-j.scrollWheelJump:e.scrollTop+j.scrollWheelJump});d(document).bind("mousemove",
function(a){if(c&&(a.clientX>f.right||a.clientX<f.left||a.clientY<f.top||a.clientY>f.bottom))c=i(h.get(0))});this.onselectstart=function(){return!1}})};d.fn.dragScroll.defaults={scrollWheel:!1,scrollWheelJump:30}})(jQuery);
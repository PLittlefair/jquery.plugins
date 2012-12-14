/*
* lightArea - a jQuery plugin for creating a lightbox over a certain element on the page
* Copyright (c) 2012 Paul Littlefair
* ------------------------------------------------------- 
* Dual licensed under the MIT and GPL licenses. 
*    - http://www.opensource.org/licenses/mit-license.php 
*    - http://www.gnu.org/copyleft/gpl.html 
* ------------------------------------------------------- 
*/
(function(a){a.fn.lightArea=function(i){var b=a.isPlainObject(i)?i:{},b=a.extend(!0,{},a.fn.lightArea.defaults,b),d=b.opacity,k=a.extend({},b.spanCSS,{display:"none",position:"absolute"}),d=a.extend({},b.divCSS,{display:"none",background:b.backgroundColor,opacity:d,filter:"alpha(opacity="+100*d+")",position:"absolute"}),l=a("<div />",{css:d,"class":b.divClass+" lightAreaFix"}),j=a("<span />",{css:k,"class":b.spanClass+" lightAreaFix",text:b.spanText});b.spanHTML&&j.html(b.spanHTML);!a.fn.lightArea.resizeSet&&
(a.fn.lightArea.resizeSet=!0)&&a(window).resize(function(){a(".lightAreaFix").each(function(){var b=a.data(this,"lightAreaID"),e=a(this),b=a("#"+b),c=b.offset();e.css({top:c.top,left:c.left});"div"===this.nodeName.toLowerCase()&&e.width(b.outerWidth()).height(b.outerHeight())})});return this.each(function(){var f=this.id;if(!0!==i){var e,c=a(this),h=l.clone(),g="",d=c.offset();f?e=f.split("lightArea-")[1]||f:(e=+new Date+Math.floor(1E6*Math.random()),f=this.id="lightArea-"+e);h.attr("id","lightAreaDiv-"+
e);h.data("lightAreaID",f);b.spanShow&&(g=j.clone(),g.attr("id","lightAreaSpan-"+e),g.data("lightAreaID",f));c.data("lightAreaID",e);a(h).css({width:c.outerWidth(),height:c.outerHeight(),top:d.top,left:d.left,borderTopLeftRadius:c.css("borderTopLeftRadius"),borderTopRightRadius:c.css("borderTopRightRadius"),borderBottomLeftRadius:c.css("borderBottomLeftRadius"),borderBottomRightRadius:c.css("borderBottomRightRadius")});a(g).css({top:+d.top+ +b.spanCSS.top+"px",left:+d.left+ +b.spanCSS.left+"px"});
a("body").append(h,g);a(h).add(g).fadeIn(b.fadeIn)}else a("div.lightAreaFix, span.lightAreaFix").each(function(){var b=a(this);b.data("lightAreaID")===f&&b.remove()})})};a.fn.lightArea.resizeSet=!1;a.fn.lightArea.defaults={backgroundColor:"#000",fadeIn:"fast",opacity:"0.3",spanShow:!1,spanText:"",spanClass:"lightArea",spanCSS:{zIndex:1001},divClass:"lightArea",divCSS:{zIndex:1E3}}})(window.jQuery);
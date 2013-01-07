/*
* lightArea - a jQuery plugin for creating a lightbox over a certain element on the page
* Copyright (c) 2012 Paul Littlefair
* ------------------------------------------------------- 
* Dual licensed under the MIT and GPL licenses. 
*    - http://www.opensource.org/licenses/mit-license.php 
*    - http://www.gnu.org/copyleft/gpl.html 
* ------------------------------------------------------- 
*/
(function(b){b.fn.lightArea=function(i){var a=b.isPlainObject(i)?i:{},a=b.extend(!0,{},b.fn.lightArea.defaults,a),e=a.opacity,k=b.extend({},a.spanCSS,{display:"none",position:"absolute"}),e=b.extend({},a.divCSS,{display:"none",background:a.backgroundColor,opacity:e,filter:"alpha(opacity="+100*e+")",position:"absolute"}),l=b("<div />",{css:e,"class":a.divClass+" lightAreaFix"}),j=b("<span />",{css:k,"class":a.spanClass+" lightAreaFix",text:a.spanText});a.spanHTML&&j.html(a.spanHTML);!b.fn.lightArea.resizeSet&&
(b.fn.lightArea.resizeSet=!0)&&b(window).resize(function(){b(".lightAreaFix").each(function(){var a=b.data(this,"lightAreaID"),d=b(this),a=b("#"+a),c=a.offset();d.css({top:c.top,left:c.left});"div"===this.nodeName.toLowerCase()&&d.width(a.outerWidth()).height(a.outerHeight())})});return this.each(function(){var f=this.id;if(!0!==i){var d,c=b(this),e=l.clone(),g="",h=c.offset();f?d=f.split("lightArea-")[1]||f:(d=+new Date+Math.floor(1E6*Math.random()),f=this.id="lightArea-"+d);a.spanShow&&(g=j.clone(),
g.attr("id","lightAreaSpan-"+d).data("lightAreaID",f).css({top:+h.top+(+a.spanCSS.top||0)+"px",left:+h.left+(+a.spanCSS.left||0)+"px"}));c.data("lightAreaID",d);e.attr("id","lightAreaDiv-"+d).data("lightAreaID",f).css({width:c.outerWidth(),height:c.outerHeight(),top:h.top,left:h.left,borderTopLeftRadius:c.css("borderTopLeftRadius"),borderTopRightRadius:c.css("borderTopRightRadius"),borderBottomLeftRadius:c.css("borderBottomLeftRadius"),borderBottomRightRadius:c.css("borderBottomRightRadius")});b("body").append(e,
g);e.add(g).fadeIn(a.fadeIn)}else b("div.lightAreaFix, span.lightAreaFix").each(function(){var a=b(this);a.data("lightAreaID")===f&&a.remove()})})};b.fn.lightArea.resizeSet=!1;b.fn.lightArea.defaults={backgroundColor:"#000",fadeIn:"fast",opacity:"0.3",spanShow:!1,spanText:"",spanHTML:"",spanClass:"lightArea",spanCSS:{zIndex:1001},divClass:"lightArea",divCSS:{zIndex:1E3}}})(window.jQuery);
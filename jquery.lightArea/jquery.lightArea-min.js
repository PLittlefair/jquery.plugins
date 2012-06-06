/** 
* lightArea - a jQuery plugin for creating a lightbox over a certain element on the page
* Copyright (c) 2012 Paul Littlefair
* ------------------------------------------------------- 
* Dual licensed under the MIT and GPL licenses. 
*    - http://www.opensource.org/licenses/mit-license.php 
*    - http://www.gnu.org/copyleft/gpl.html 
* ------------------------------------------------------- 
* ------------------------------------------------------- 
*/
(function(a){a.fn.lightArea=function(g){var b=a.isPlainObject(g)?g:{},b=a.extend(!0,{},a.fn.lightArea.defaults,b),f=a.browser.msie&&8>=+a.browser.version?100*b.opacity:b.opacity,h=a.extend({},b.spanCSS,{display:"none",position:"absolute"}),f=a.extend({},b.divCSS,{display:"none",background:b.backgroundColor,opacity:f,filter:"alpha(opacity="+f+")",position:"absolute"}),i=a("<div />",{css:f,"class":b.divClass+" lightAreaFix"}),j=a("<span />",{css:h,"class":b.spanClass+" lightAreaFix",text:b.spanText});
!a.fn.lightArea.resizeSet&&(a.fn.lightArea.resizeSet=!0)&&a(window).resize(function(){a("div."+b.spanClass+", span."+b.divClass).each(function(){var b=a.data(this,"lightAreaID"),d=a(this),b=a("#"+b),c=b.offset();d.css({top:c.top,left:c.left});"div"===this.nodeName.toLowerCase()&&d.width(b.outerWidth()).height(b.outerHeight())})});return this.each(function(){var e=this.id;if(!0!==g){var d,c=a(this);divClone=i.clone();spanClone="";thisOffset=c.offset();e?d=e.split("lightArea-")[1]||e:(d=+new Date+Math.floor(1E6*
Math.random()),e=this.id="lightArea-"+d);divClone.attr("id","lightAreaDiv-"+d);divClone.data("lightAreaID",e);b.spanShow&&(spanClone=j.clone(),spanClone.attr("id","lightAreaSpan-"+d),spanClone.data("lightAreaID",e));c.data("lightAreaID",d);a(divClone).css({width:c.outerWidth(),height:c.outerHeight(),top:thisOffset.top,left:thisOffset.left,borderTopLeftRadius:c.css("borderTopLeftRadius"),borderTopRightRadius:c.css("borderTopRightRadius"),borderBottomLeftRadius:c.css("borderBottomLeftRadius"),borderBottomRightRadius:c.css("borderBottomRightRadius")});
a(spanClone).css({top:thisOffset.top+b.spanCSS.top,left:thisOffset.left+b.spanCSS.left});a("body").append(divClone,spanClone);a(divClone).add(spanClone).fadeIn(b.fadeIn)}else a("div.lightAreaFix, span.lightAreaFix").each(function(){var b=a(this);b.data("lightAreaID")===e&&b.remove()})})};a.fn.lightArea.resizeSet=!1;a.fn.lightArea.defaults={backgroundColor:"#000",fadeIn:"fast",opacity:"0.3",spanShow:!1,spanText:"",spanClass:"lightArea",spanCSS:{padding:"5px",top:0,left:0,border:"1px solid #000",background:"#fff",
fontWeight:"bold",fontSize:"14px",color:"#000","z-index":1001},divClass:"lightArea",divCSS:{"z-index":1E3}}})(window.jQuery);
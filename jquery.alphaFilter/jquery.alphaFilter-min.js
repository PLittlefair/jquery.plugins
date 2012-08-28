/*
* alphaFilter - a jQuery plugin for creating an alphabetical contents list which filters
* Copyright (c) 2010 Paul Littlefair
* ------------------------------------------------------- 
* Dual licensed under the MIT and GPL licenses. 
*    - http://www.opensource.org/licenses/mit-license.php 
*    - http://www.gnu.org/copyleft/gpl.html 
* ------------------------------------------------------- 
* -------------------------------------------------------
*/
(function(d){d.fn.alphaFilter=function(h){var i="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(","),g=d.extend({},d.fn.alphaFilter.defaults,h),e=[],k=d("<ul/>",{"class":g.listClass}),l=d("<li/>"),m=/^\d/;i.splice(0,0,"0-9");var f=function(c,a){var b=c.text().toUpperCase();return 0===b.indexOf(a)||"0-9"===a&&m.test(b)?!0:!1},n=function(c,a,b){"DL"===a?d(c).find("dd").hide().end().find("dt").hide().filter(function(){return f(d(this),b)}).show().next("dd").show():"UL"===a||"OL"===a?d(c).find("li").hide().filter(function(){return f(d(this),
b)}).show():"TABLE"===a&&d(c).find("tbody tr").hide().find("td:eq("+g.columnIndex+")").filter(function(){return f(d(this),b)}).parent().show()},o=function(c){var a,b;a=this.nodeName;if(!e.length){if("TABLE"===a){a=this.getElementsByTagName("tbody")[0];a=a.getElementsByTagName("tr");for(b=a.length;b--;)e.push(a[b].getElementsByTagName("td")[g.columnIndex])}else e="DL"===a?"dt":"li",e=this.getElementsByTagName(e);e=d(e)}for(b=e.length;b--;)if(f(e.eq(b),c))return!0;return!1};return this.each(function(){var c,
a,b,e,f=k.clone(),h=this,j=this.nodeName;for(c=g.acceptedNode.length;c--;)if(g.acceptedNode[c]===j){c=0;for(a=i.length;c<a;c++)b=i[c],e=l.clone(),e.text(b).appendTo(f),o.call(this,b)&&(e.wrapInner('<a href="#'+b+'"></a>'),function(a){e.delegate("a","click",function(b){n(h,j,a);b.preventDefault()})}(b));d(this).before(f);break}})};d.fn.alphaFilter.defaults={listClass:"alphalist",columnIndex:0,acceptedNode:["DL","UL","OL","TABLE"]}})(window.jQuery);
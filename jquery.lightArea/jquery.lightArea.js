/** 
* lightArea - a jQuery plugin for creating a lightbox over a certain element on the page
* Copyright (c) 2012 Paul Littlefair
* ------------------------------------------------------- 
* Dual licensed under the MIT and GPL licenses. 
*    - http://www.opensource.org/licenses/mit-license.php 
*    - http://www.gnu.org/copyleft/gpl.html 
* ------------------------------------------------------- 
* ------------------------------------------------------- 
OPTIONS:
options : either an options object or true if you want to remove the lightarea
*/
(function($){
	$.fn.lightArea = function(options){
		//MERGE OPTIONS WITH DEFAULTS
		var ops = $.isPlainObject(options) ? options : {};
		ops = $.extend(true, {},$.fn.lightArea.defaults, ops);
		//CHECK IF BROWSER IS IE AND LESS THAN 9, IF IT IS CHANGE OPACITY UNITS TO TENS
		var opacity = $.browser.msie && +$.browser.version <=8 ? ops.opacity * 100 : ops.opacity,
		
		//MAKE SURE spanCSS HAS POSITION SET
			spanCSS = $.extend({}, ops.spanCSS, {
				display:"none",
				position:"absolute"
			}),
			//MAKE SURE divCSS HAS OPACITY AND POSITION SET
			divCSS = $.extend({}, ops.divCSS, {
				display:"none",
				background:ops.backgroundColor,
				"opacity":opacity,
				filter:"alpha(opacity=" + opacity + ")",
				position:"absolute"
			}),
		
			//CREATE A DIV AND GIVE IT STYLE/CLASS
			div = $("<div />", {
				css : divCSS,
				"class" : ops.divClass
			}),
			//CREATE SPAN
			span = $("<span />", {
				css : spanCSS,
				"class" : ops.spanClass,
				text : ops.spanText
			});
		
		//MAKE SURE THE DIV RESIZES WITH BROWSER WINDOW
		$(window).resize(function(){
			$("div." + ops.spanClass + ", span." + ops.divClass).each(function(){
				var id = $.data(this, "lightAreaID"),
					$this = $(this),
					$holder = $("#" + id),
					thisOffset = $holder.offset();
				$this.css({"top":thisOffset.top,"left":thisOffset.left});
				if(this.nodeName.toLowerCase() === "div"){
					$this
						.width($holder.outerWidth())
						.height($holder.outerHeight());
				}
			});
		});
		
		//LOOP THROUGH EACH ITEM
		return this.each(function(){
			var id,
				eleID = this.id,
				$this = $(this);
			
			//IF ADDING THE LIGHTAREA
			if(options !== true){
				var divClone = div.clone(),
					spanClone = "",
								
					//GET THE POSITION OF THE ELEMENT TO COVER RELATIVE TO DOCUMENT
					thisOffset = $this.offset();
				
				//CREATE A RANDOM ID FOR THE LIGHTAREA AND ATTACH TO DATA OBJECT
				id = +new Date() + Math.floor(Math.random()*1e6);
				
				//GIVE THE ELEMENT THAT IS BEING COVERED AN ID IF IT HASN'T GOT ONE
				if(!eleID){
					eleID = this.id = "lightArea-" + id;
				}
				
				divClone.attr("id", "lightAreaDiv-" + id);
				divClone.data("lightAreaID", eleID);
				
				//ONLY SHOW THE SPAN IF spanShow IS TRUE
				if(ops.spanShow){
					spanClone = span.clone();
					spanClone.attr("id", "lightAreaSpan-" + id);
					spanClone.data("lightAreaID", eleID);
				}
				$this.data("lightAreaID", id);
				
				//SET HEIGHT AND WIDTH OF LIGHTAREA
				$(divClone)
					.width($this.outerWidth())
					.height($this.outerHeight())
				.add(spanClone)
					.css({"top":thisOffset.top,"left":thisOffset.left});
					
				//ADD DIV AND SPAN TO DOCUMENT AND FADE IN
				$("body").append(divClone, spanClone);
				$(divClone).add(spanClone).fadeIn(ops.fadeIn);
				
			//IF REMOVING LIGHTAREA
			}else{
				id =  this.id;
				$("div." + ops.spanClass + ", span." + ops.divClass).each(function(){
					var $$this = $(this);
					if($$this.data("lightAreaID") === id){
						$$this.remove();
					}
				});
			}
		});
	};
	$.fn.lightArea.defaults = {
		backgroundColor : "#000",
		fadeIn : "fast",
		opacity : "0.3",
		spanShow : false,
		spanText : "",
		spanClass : "lightArea",
		spanCSS : {padding:"5px",border:"1px solid #000",background:"#fff",fontWeight:"bold",fontSize:"14px",color:"#000","z-index":1001},
		divClass : "lightArea",
		divCSS : {"z-index":1000}
	};
}(window.jQuery));
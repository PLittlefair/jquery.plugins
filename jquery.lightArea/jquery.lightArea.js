/**
* lightArea - a jQuery plugin for creating a lightbox over a certain element on the page
* Copyright (c) 2012 Paul Littlefair
* -------------------------------------------------------
* Licensed under the MIT licenses.
*    - http://www.opensource.org/licenses/mit-license.php
* -------------------------------------------------------
* -------------------------------------------------------
OPTIONS:
options : either an options object or true if you want to remove the lightarea
	backgroundColor : "#000",				//BACKGROUND COLOUR OF THE COVERING DIV
	fadeIn : "fast",						//SPEED TO FADE IN THE COVERING DIV
	opacity : "0.3",						//OPACITY OF THE COVERING DIV
	spanShow : false,						//SHOW A SPAN IN THE TOP LEFT CORNER
	spanText : "",							//TEXT TO SHOW IN THE SPAN
	spanHTML : "",							//HTML TO SHOW IN THE SPAN (OVERIDES spanText)
	spanClass : "lightArea",				//CLASS GIVEN TO THE SPAN
	spanCSS : {"zIndex":1001},				//DEFAULT CSS FOR THE SPAN
	divClass : "lightArea",					//CLASS GIVEN TO THE COVERING DIV
	divCSS : {"zIndex":1000}				//DEFAULT CSS FOR THE COVERING DIV
*/
(function($){
	$.fn.lightArea = function(options){
		//MERGE OPTIONS WITH DEFAULTS
		var ops = $.isPlainObject(options) ? options : {};
		ops = $.extend(true, {},$.fn.lightArea.defaults, ops);
		var opacity = ops.opacity,
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
				filter:"alpha(opacity=" + (opacity * 100) + ")",
				position:"absolute"
			}),
			//CREATE A DIV AND GIVE IT STYLE/CLASS
			$div = $("<div />", {
				css : divCSS,
				"class" : ops.divClass + " lightAreaFix"
			}),
			//CREATE SPAN AND GIVE IT STYLE/CLASS AND TEXT
			$span = $("<span />", {
				css : spanCSS,
				"class" : ops.spanClass + " lightAreaFix",
				"role" : "dialog",
				"aria-label" : ops.spanLabel,
				"tabindex" : -1,
				text : ops.spanText
			});
			ops.spanHTML && $span.html(ops.spanHTML);

		//ONLY SET WINDOW RESIZE EVENT HANDLER THE FIRST TIME THE PLUGIN IS RUN
		if(!$.fn.lightArea.resizeSet && ($.fn.lightArea.resizeSet = true)){
			//MAKE SURE THE DIV RESIZES WITH BROWSER WINDOW
			$(window).resize(function(){
				$(".lightAreaFix").each(function(){
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
		}

		//LOOP THROUGH EACH ITEM
		return this.each(function(){
			var eleID = this.id;
			//IF ADDING THE LIGHTAREA
			if(options !== true){
				var id,
					$this = $(this),
					$divClone = $div.clone(),
					$spanClone = "",
					//GET THE POSITION OF THE ELEMENT TO COVER RELATIVE TO DOCUMENT
					thisOffset = $this.offset();

				//GIVE THE ELEMENT THAT IS BEING COVERED AN ID IF IT HASN'T GOT ONE
				if(!eleID){
					//CREATE A RANDOM ID FOR THE LIGHTAREA AND ATTACH TO DATA OBJECT
					id = +new Date() + Math.floor(Math.random()*1e6);
					eleID = this.id = "lightArea-" + id;
				//ELSE USE THE EXISTING ID OF THE ELEMENT BEING COVERED
				}else{
					id = (eleID).split("lightArea-")[1] || eleID;
				}

				//ONLY SHOW THE SPAN IF spanShow IS TRUE
				if(ops.spanShow){
					$spanClone = $span.clone();
					//SET ID, DATA AND STYLES OF LIGHTAREA SPAN
					$spanClone
						.attr("id", "lightAreaSpan-" + id)
						.data("lightAreaID", eleID)
						.css({
							"top":+thisOffset.top + (+ops.spanCSS.top || "") + "px",
							"left":+thisOffset.left + (+ops.spanCSS.left || "") + "px"
						});
				}
				$this.data("lightAreaID", id);

				//SET ID, DATA AND STYLES OF LIGHTAREA DIV
				$divClone
					.attr("id", "lightAreaDiv-" + id)
					.data("lightAreaID", eleID)
					.css({
						"width" : $this.outerWidth(),
						"height" : $this.outerHeight(),
						"top" : thisOffset.top,
						"left" : thisOffset.left,
						"borderTopLeftRadius" : $this.css("borderTopLeftRadius"),
						"borderTopRightRadius" : $this.css("borderTopRightRadius"),
						"borderBottomLeftRadius" : $this.css("borderBottomLeftRadius"),
						"borderBottomRightRadius" : $this.css("borderBottomRightRadius")
					});
				//ADD DIV AND SPAN TO DOCUMENT AND FADE IN
				$("body").append($divClone, $spanClone);
				$divClone.add($spanClone).fadeIn(ops.fadeIn);

			//IF REMOVING LIGHTAREA
			}else{
				$("div.lightAreaFix, span.lightAreaFix").each(function(){
					var $$this = $(this);
					if($$this.data("lightAreaID") === eleID){
						$$this.remove();
					}
				});
			}
		});
	};
	$.fn.lightArea.resizeSet = false;
	$.fn.lightArea.defaults = {
		backgroundColor : "#000",
		fadeIn : "fast",
		opacity : "0.3",
		spanShow : false,
		spanText : "",
		spanHTML : "",
		spanLabel : "Light Area",
		spanClass : "lightArea",
		spanCSS : {"zIndex":1001},
		divClass : "lightArea",
		divCSS : {"zIndex":1000}
	};
}(window.jQuery));
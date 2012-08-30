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
(function($){
	/*
	* @description CREATES A DRAGGABLE SCROLLING DIV (overflow:auto)
	*/
	$.fn.dragScroll = function(opts){
		//EXTEND THE DEFAULT OPTIONS
		var options = $.extend({},$.fn.dragScroll.defaults, opts);
		/*
		* @description THE POSITION OF THE MOUSE RELATIVE TO CONTENT OF THE DIV
		* @param {Object<Event>} e
		* @param {Object<jQuery} elem
		* @param {Number} topPos
		* @returns {Number}
		*/
		function getMousePosition(e, elem, topPos){
			return e.clientY + elem.scrollTop - topPos;
		}
		/*
		* @description GETS THE COORDIATES OF THE ELEMENT
		* @param {Object<jQuery>} $elem
		* @returns {Object}
		*/
		function getCoords($elem){
			var offset = $elem.offset(),
				leftPos = offset.left,
				topPos = offset.top,
				rightPos = leftPos + $elem.outerWidth(),
				bottomPos = topPos + $elem.outerHeight();

			return{
				left : leftPos,
				top : topPos,
				right : rightPos,
				bottom : bottomPos
			};
		}
		/*
		* @description ACTIONS THAT OCCUR WHEN STATE (mousedown/mouseup) CHANGES
		* @param {Object<Element>} elem
		* @param {Boolean} active
		* @returns {Boolean|Undefined}
		*/
		function changeState(elem, active){
			elem.style.cursor = active ? "n-resize" : "default";
			return active;
		}

		return this.each(function(){
			var startY, mouseDown, $holder,
				//CREATE A UNIQUE ID
				uid = +new Date() + Math.floor(Math.random()*1e6),
				drag_container = this,
				$drag_container = $(this),
				coords = getCoords($drag_container);

			//WRAP THE ELEMENT IN A DIV SO USING THE SCROLL BAR DOESN'T TRIGGER MOUSEDOWN/MOUSEUP
			$drag_container.wrapInner('<div id="dragScrollInner-' + uid + '" />')
			//STOP TEXT BEING SELECTED
				.css({"-moz-user-select":"-moz-none","-khtml-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"});

			//ADD EVENT HANDLERS TO INNER DIV
			$holder = $("#dragScrollInner-" + uid)
				.bind("mousedown", function(e){
					//GET THE ORIGINAL POSITION OF THE MOUSE WHEN DOWN
					startY = getMousePosition(e, drag_container, coords.top);
					mouseDown = changeState(this, true);
				})
				.bind("mouseup", function(){
					mouseDown = changeState(this);
				})
				.bind("mousemove", function(e){
					if(mouseDown){
						//GET THE CURRENT POSITION OF THE MOUSE
						var currentY = getMousePosition(e, drag_container, coords.top);
						//IF THE CURRENT MOUSE POS IS LESS THAN START POS (MOUSE MOVING UP/PAGE DOWN) ADD THE DIFFERENCE TO THE SCROlLTOP
						if(currentY < startY){
							drag_container.scrollTop += (startY - currentY);
							//IF THE CURRENT MOUSE POS IS GREATER THAM START POS (MOUSE MOVING DOWN/PAGE UP) MINUS THE DIFFERENCE FROM THE SCROlLTOP
						}else{
							drag_container.scrollTop -= (currentY - startY);
						}
					}
				});
			//IF SCROLL WHEEL ACTION IS REQUIRED
			if(options.scrollWheel){
				$holder.bind("mousewheel", function(e){
					//IF THE MOUSE WHEEL IS GOING UP MINUS FROM SCROLLTOP
					if(e.wheelDelta / 120 > 0){
						drag_container.scrollTop -= options.scrollWheelJump;
					//IF THE MOUSE WHEEL IS GOING DOWN ADD TO SCROLLTOP
					}else{
						drag_container.scrollTop += options.scrollWheelJump;
					}
				});
			}


			//CHANGE STATE IF MOUSE MOVES OUTSIDE OF ELEMENT
			$(document).bind("mousemove", function(e){
				if(mouseDown){
					//IF THE MOUSE MOVES OUT OF THE DIV STOP SCROLLING
					if(e.clientX > coords.right || e.clientX < coords.left || e.clientY < coords.top || e.clientY >coords.bottom){
						mouseDown = changeState($holder.get(0));
					}
				}
			});
			//STOP THE ELEMENTS TEXT BEING SELECTED
			this.onselectstart = function(){return false;};
		});
	};
	
	$.fn.dragScroll.defaults = {
		scrollWheel : false,
		scrollWheelJump : 30
	};
}(jQuery));
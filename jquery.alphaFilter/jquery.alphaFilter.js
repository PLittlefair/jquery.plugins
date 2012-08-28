/*
* alphaFilter - a jQuery plugin for creating an alphabetical contents list which filters
* Copyright (c) 2010 Paul Littlefair
* ------------------------------------------------------- 
* Dual licensed under the MIT and GPL licenses. 
*    - http://www.opensource.org/licenses/mit-license.php 
*    - http://www.gnu.org/copyleft/gpl.html 
* ------------------------------------------------------- 
*/
(function($){
	$.fn.alphaFilter = function(options){
		var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
			opts = $.extend({},
			$.fn.alphaFilter.defaults, options),
			item = [],
			listUl = $("<ul/>", {"class":opts.listClass}),
			listLi = $("<li/>"),
			digRegExp = /^\d/;
		
		//ADD 0-9 TO THE BEGINNING OF THE ARRAY
		alpha.splice(0,0,"0-9");
		
		//CHECK IF THE LETTER APPEARS IN THE TABLE/UL/DL
		var testLetter = function($this, letter){
			var text = ($this.text()).toUpperCase();
			// TEST FIRST LETTER OF TEXT
			if(text.indexOf(letter) === 0 || (letter === "0-9" && digRegExp.test(text))){
				return true;
			}
			return false;
		},
		// SHOW THE FILTERED SELECTION
		filterSelection = function(currentObj, nodeName, letter){
			if(nodeName === "DL"){
				$(currentObj).find("dd").hide().end().find("dt").hide().filter(function(){
					return testLetter($(this), letter);
				}).show().next("dd").show();
			}else if(nodeName === "UL" || nodeName === "OL"){
				$(currentObj).find("li").hide().filter(function(){
					return testLetter($(this), letter);
				}).show();
			}else if(nodeName === "TABLE"){
				$(currentObj).find("tbody tr").hide().find("td:eq(" + opts.columnIndex + ")").filter(function(){
					return testLetter($(this), letter);
				}).parent().show();
			} 
		},
		// CHECK LETTER IS PRESENT IN TABLE/UL...
		checkLetter = function(letter){
			var trArray, i,
				nodeName = this.nodeName;
			// CHECK FOR CACHED VERSION OF THE NODE ARRAY (JQUERY)
			if(!item.length){
				if(nodeName === "TABLE"){
					trArray = this.getElementsByTagName("tbody")[0];
					// CACHE TABLE ROWS
					trArray = trArray.getElementsByTagName("tr");
					for(i = trArray.length; i--;){
						//getElementsByTagName FASTER THAN jQuery FIND
						item.push(trArray[i].getElementsByTagName("td")[opts.columnIndex]);
					}
				}else{
					item = nodeName === "DL"? "dt" : "li";
					item = this.getElementsByTagName(item);
				}
				//CREATE A JQUERY COLLECTION FROM THE NODES
				item = $(item);
			}
			for(i = item.length; i--;){
				//CHECK EACH ITEMS IN THE JQUERY COLLECTION
				if(testLetter(item.eq(i), letter)){
					return true;
				}
			}
			return false;
		};
		return this.each(function(){
			var i, j, k, letter, currentLetter, listLiClone,
				listUlClone = listUl.clone(),
				currentObj = this,
				nodeName = this.nodeName;
			//CHECK IT IS AN ACCEPTABLE NODE
			for(i = opts.acceptedNode.length; i--;){
				if(opts.acceptedNode[i] === nodeName){
					for(j = 0, k = alpha.length; j < k; j++){
						currentLetter  = alpha[j];
						//CREATE NEW <li>
						listLiClone = listLi.clone();
						//SET TEXT AND APPEND TO CLONE OF <UL>
						listLiClone.text(currentLetter).appendTo(listUlClone);
						//IF LETTER IS PRESENT IN TABLE/UL..
						if(checkLetter.call(this, currentLetter)){
							//CREATE LINK
							listLiClone.wrapInner('<a href="#' + currentLetter + '"></a>');
							//CREATE A CLOSURE
							(function(l){
								listLiClone.delegate("a", "click", function(e){
									filterSelection(currentObj, nodeName, l);
									e.preventDefault();
								});
							}(currentLetter));
						}
					}
					$(this).before(listUlClone);
					break;
				}
			}
		});
	};
	$.fn.alphaFilter.defaults = {
		listClass : "alphalist",
		columnIndex : 0,
		acceptedNode : ["DL","UL","OL","TABLE"]
	};
}(window.jQuery));
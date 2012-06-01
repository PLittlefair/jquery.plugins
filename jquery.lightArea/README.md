jquery.lightArea
================

Adds a lightbox type cover to any element on the page

/* BASIC */

$(".someElement").lightArea();

/* WITH OPTIONS */

$(".someOtherElement").lightArea({
	backgroundColor : "#bada55",
	fadeIn : "slow",
	opacity : "0.6",
	spanShow : true, //ADD A SPAN ON TOP OF THE LIGHTAREA
	spanText : "Hi, I'm in a span",
	spanClass : "lightSpan",
	spanCSS : {padding:40px, border-radius:5px},
	divClass : "lightDiv",
	divCSS : {border:"5px solid #f00"}
})
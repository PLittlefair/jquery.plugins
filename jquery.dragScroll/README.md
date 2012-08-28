jquery.dragScroll
=================

Allows an element (e.g. DIV) with a style of overflow:hidden to be scrolled by dragging using the mouse or optionally with the mousewheel.

OPTIONS:
scrollWheel : Boolean. IF THE SCROLL WHEELS SHOULD SCROLL THE CONTAINER
scrollWheelJump : Number. NUMBER OF PIXELS TO MOVE THE CONTAINER UP OR DOWN WHEN MOUSE WHEEL IS USED


$(".someOverflowHiddenElement").dragScroll();

$(".someOverflowHiddenElement").dragScroll({scrollWheel:true});


You can specify how many pixels the element should scroll when the mousewheel is used with 'scrollWheelJump'. Defaults to 30.

$(".someOverflowHiddenElement").dragScroll({scrollWheel:true, scrollWheelJump:30});
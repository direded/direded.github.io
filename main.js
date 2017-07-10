var canvas = $("<canvas>")[0];
$("body")[0].append(canvas);
var context = canvas.getContext("2d");

function onResize(){
	canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}

window.onresize = onResize;

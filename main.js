var canvas = $("<canvas>")[0];
$("body")[0].append(canvas);
var context = canvas.getContext("2d");

(function(){
	let scaleCanvas = function(){
		let w = document.body.clientWidth;
		let h = document.body.clientHeight;
		if (w / 16 >= h / 9){
			canvas.width = h * 16 / 9;
			canvas.height = h;
			canvas.style.left = (w - canvas.width) / 2;
			canvas.style.top = 0;
		} else {
			canvas.width = w;
			canvas.height = w * 9 / 16;
			canvas.style.left = 0;
			canvas.style.top = (h - canvas.height) / 2;
		}
	};
	window.addEventListener("resize", scaleCanvas, false);
	scaleCanvas();
})();
game = new Game(context);

function test_func(){
}

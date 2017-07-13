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

(function(){
	let sprites = [];

	let add = function(img, name, src_rect, size){
		if (!sprites[name])
			sprites[name] = {img: img, src_rect: src_rect, size: size};
	}

	let get = function(name, size){
		if (!sprites[name]) return;
		return new Sprite(size || sprites[name].size, sprites[name].img, sprites[name].src_rect);
	}

	window.resources.sprites = {
		add: add,
		get: get,
	};
})();

let Sprite = function(size, img, src_rect){
	this.src_rect = src_rect;
	this.img = img;
	this.size = size || new Point(img.width, img.height);
	this.origin = {x: this.size.x / 2, y: this.size.y / 2};
}

Sprite.prototype.render = function(ctx, pos){
	with (this){
		let w = size.x * canvas.height / 1080;
		let h = size.y * canvas.width / 1920;
		let x = (pos.x - origin.x) * canvas.height / 1080;
		let y = (pos.y - origin.y) * canvas.width / 1920;
		if (src_rect)
			ctx.drawImage(img, src_rect.left, src_rect.top, src_rect.width, src_rect.height, x, y, w, h);
		else
			ctx.drawImage(img, x, y, w, h);
		}
}

var canvas = $("<canvas>")[0];
$("body")[0].append(canvas);
var context = canvas.getContext("2d");



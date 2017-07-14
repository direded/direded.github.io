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
};

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
};

let Animation = function(pos, size, img, src_rect, count, frameDur){
	this.pos = pos.clone();
	this.size = size.clone();
	this.img = img;
	this.src_rect = src_rect;
	this.count = count;
	this.frameDur = frameDur;
	this.current = 0;
	this.timeElapsed = 0;
	this.origin = new Point(size.x / 2, size.y / 2);
};

Animation.prototype.render = function(ctx){
	with (this){
		let w = size.x * canvas.height / 1080;
		let h = size.y * canvas.width / 1920;
		let x = (pos.x - origin.x) * canvas.height / 1080;
		let y = (pos.y - origin.y) * canvas.width / 1920;
		let currentX = Math.floor(current / (img.width / src_rect.width));
		let currentY = current - currentX * (img.width / src_rect.width);
		/*ctx.drawImage(
			img,
			src_rect.left + currentX * src_rect.width,
			src_rect.top + currentY * src_rect.height,
			src_rect.width,
			src_rect.height, x, y, w, h);*/
		ctx.drawImage(img, currentY * src_rect.height, currentX * src_rect.width, src_rect.width, src_rect.height, x, y, w, h);
		console.log(currentX * src_rect.width, currentY * src_rect.height);

	}
};

Animation.prototype.update = function(step){
	this.timeElapsed += step;
	with (this){
		if (timeElapsed > frameDur * count)
			timeElapsed = 0;
		current = Math.floor(timeElapsed / frameDur);
	}
};

(function(){
	let anims = {};
	let playing = [];

	let add = function(img, name, src_rect, count, frameDur){
		anims[name] = function(pos, size){
				return new Animation(pos.clone(), size.clone(), img, src_rect, count, frameDur);
			};
	};

	let play = function(name, pos, size, duration){
		playing.push({
				anim: anims[name](pos, size),
				duration: duration,
				time: 0,
			});
	};


	let update = function(step){
		let newArr = [];
		playing.forEach(function(animObj){
				if (animObj.time < animObj.duration){
					animObj.time += step;
					animObj.anim.update(step);
				}
				if (animObj.time < animObj.duration)
					newArr.push(animObj);
			});
		playing = newArr.slice();
	};

	let render = function(ctx){
		playing.forEach(function(animObj){
				if (animObj.time < animObj.duration){
					animObj.anim.render(ctx);
				}
			})
	};

	window.resources.anim = {
		 	add: add,
			play: play,
			update: update,
			render: render,
		};
})();

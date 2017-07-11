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
	with (this)
		if (src_rect)
			ctx.drawImage(img, src_rect.left, src_rect.top, src_rect.width, src_rect.height, pos.x - origin.x, pos.y - origin.y, size.x, size.y);
		else
			ctx.drawImage(img, pos.x - origin.x, pos.y - origin.y, size.x, size.y);
}

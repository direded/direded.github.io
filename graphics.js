let Sprite = function(size, img){  // TODO replace size with rect
	this.size = size;
	this.img = img;
	this.origin = {x: size.x / 2, y: size.y / 2};
}

Sprite.prototype.render = function(ctx, pos){
	with (this)
		ctx.drawImage(img, pos.x - origin.x, pos.y - origin.y, size.x, size.y);
}

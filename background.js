let Background = function(img) {
	this.speed = 500;
	this.offset = 0;
	this.object = document.body;
	this.src = img.src;
	this.set(img);
}

Background.prototype.set = function(img) {
	document.body.style.backgroundImage = "url('" + img.src + "')";
}

Background.prototype.update = function (step) {
	with (this) {
		offset = offset + speed*step/1000;
		if (offset > 300) offset = 0;
		object.style.backgroundPosition = "0 " + offset;
	}
}

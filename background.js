function BackgroundPlay(name) {

}

let Background = function(img) {
	this.speed = 500;
	this.offset = 0;
	this.object = eval("document.body");
	this.src = img.src;
	this.set(img);
	console.log(this.object);
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

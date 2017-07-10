var Point = function(x, y) {
	this.x = x;
	this.y = y;
} 
Point.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

Point.prototype.add = function(...arguments) {
	if (typeof arguments[0] === 'object') {
		this.x += arguments[0].x; 
		this.y += arguments[0].y;
	}
	else {
		this.x += arguments[0];
		this.y += arguments[1];
	}
	return this;
}
Point.prototype.equals = function(...arguments) {
	if (typeof arguments[0] === 'object') {
		return (this.x === arguments[0].x && this.y === arguments[0].y);
	}
	else {
		return (this.x === arguments[0] && this.y === arguments[1]);
	}
}
Point.prototype.scale = function(scaleFactor) {
	this.x = this.x * scaleFactor;
	this.y = this.y * scaleFactor;
	return this;
}
Point.prototype.subtract = function(...arguments) {
	if (typeof arguments[0] === 'object') {
		this.x = this.x -  arguments[0].x;
		this.y = this.y - arguments[0].y;
	}
	else {
		this.x = this.x - arguments[0];
		this.y = this.y - arguments[1];
	}
	return this;
} 
Point.prototype.set = function(...arguments) {
	if (typeof arguments[0] === 'object') {
		this.x = arguments[0].x;
		this.y = arguments[0].y
	}
	else {
		this.x = arguments[0];
		this.y = arguments[1];
	}
	return this;
}

Point.prototype.distance = function(...arguments) {
	var x = 0;
	var y = 0;

	if (typeof arguments[0] === 'object') {
		x = this.x - arguments[0].x;
		y = this.y - arguments[0].y;
	}
	else  {
		x = this.x - arguments[0];
		y = this.x - arguments[1];
	}
	return Math.sqrt(x * x + y * y); 
}

Point.prototype.normalize = function() {
	var length = this.length(); 
	if (length === 0)
		return this;
	this.x = this.x / length;
	this.y = this.y / length;
	return this;	
}







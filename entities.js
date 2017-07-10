// Entitiy class

let Entity = function(pos, dir, speed, health, size, sprite) {
	this.pos = pos;
	this.dir = dir; // TODO point obj?
	this.speed = speed;
	this.health = health;
	this.size = size;
	this.sprite = sprite; // TODO sprite class?
}

Entity.prototype.render = function(ctx){
	ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    this.sprite.render(ctx, this.pos);
    ctx.restore();

}

Entity.prototype.update = function(step){
	this.pos.x += this.speed * 3 * step / 1000;
}

// Player class

let Player = function(...args){
	Entity.apply(this, args);
}

Player.prototype = Object.create(Entity.prototype);

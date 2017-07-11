// Entitiy class

let Entity = function(pos, speed, health, size, sprite){
	this.pos = pos.clone();
	this.dir = new Point(0, 0);
	this.speed = speed;
	this.health = health;
	this.size = size.clone();
	this.sprite = sprite;
}

Entity.prototype.visualBounds = function() {
	return new Rect(this.pos.x - this.sprite.origin.x, this.pos.y - this.sprite.origin.y, this.sprite.size.x, this.sprite.size.y);
}

Entity.prototype.hitbox = function() {
	return new Rect(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2, this.size.x, this.size.y);
}

Entity.prototype.render = function(ctx){
	this.sprite.render(ctx, this.pos);
}

Entity.prototype.update = function(step){
	with (this){
		pos.add(dir.clone().scale(speed * step / 1000)); // FIXME change geometry lib
	}
}

Entity.prototype.checkCollision = function(e){
	if (e instanceof Bullet && e.side == "player")
		return e.hitbox().intersects(this.hitbox());
}

Entity.prototype.kill = function(e){
//	this = null;
}

// Ship class

let Ship = function(...args){
	Entity.apply(this, args);
}

Ship.prototype = Object.create(Entity.prototype);

Ship.prototype.fire = function(dir, side){
	game.bullets.push(new Bullet(dir.clone(), 2, side,
		this.pos.clone().add(dir.clone().scale(Math.min(this.sprite.size.x, this.sprite.size.y))), 250,  100, new Point(16, 32),
		resources.sprites.get("bullet")));
}

// Enemy class

let Enemy = function(...args){
	Ship.apply(this, args);
	this.moveStart = this.pos;
	this.moveFunc = null;
	this.moveTime = 0;
}

Enemy.prototype = Object.create(Ship.prototype);

Enemy.prototype.move = function(func){
	this.moveFunc = func;
	this.moveTime = 0;
	this.moveStart = this.pos.clone();
}

Enemy.prototype.update = function(step){
	if (this.moveFunc) {
		this.moveTime += step;
		this.pos.set(this.moveFunc(this.moveTime)).add(this.moveStart);
	}
}


// Player control class

let PlayerControl = function(plr){
	this.plr = plr;
	this.isAttack = false;
	this.attackDelay = 200; // TODO Move to gun class
	this.upv = this.downv = this.leftv = this.rightv = 0; // TODO NEED TO RENAME!
};

(function() {
	let updateDir = function(cntrl){
		if (cntrl.plr.state == "died") return;
		cntrl.plr.dir.set(cntrl.leftv + cntrl.rightv, cntrl.upv + cntrl.downv);
		cntrl.plr.dir.normalize();
	};

	PlayerControl.prototype.up = function(b){ // TODO make it shorter
		this.upv = b ? -1 : 0;
		updateDir(this);
	};

	PlayerControl.prototype.down = function(b){
		this.downv = b ? 1 : 0;
		updateDir(this);
	};

	PlayerControl.prototype.left = function(b){
		this.leftv = b ? -1 : 0;
		updateDir(this);
	};

	PlayerControl.prototype.right = function(b){
		this.rightv = b ? 1 : 0;
		updateDir(this);
	};
})();

PlayerControl.prototype.attack = function(b){
	if (this.plr.state == "died") return;
	this.isAttack = b;
	this.plr.fire();
	resources.sound.play("pew_1", 0.5);
}

// Player class

let Player = function(...args){
	Ship.apply(this, args);
	this.control = new PlayerControl(this);
	this.state = "alive";
}

Player.prototype = Object.create(Ship.prototype);

Player.prototype.fire = function(){
	Ship.prototype.fire.call(this, new Point(0, -1), "player");
}

Player.prototype.update = function(step) {
	if (this.state == "died") return;
	with (this)
		pos.add(dir.clone().scale(speed * step / 1000)); // FIXME change geometry lib
};

Player.prototype.render = function(step) {
	if (this.state == "died") return;
	Entity.prototype.render.call(this, step);
};

Player.prototype.checkCollision = function(e){
	if (e instanceof Bullet)
		return this.hitbox().intersects(e.hitbox()) && e.side !== "player";
	else {
		if (this.hitbox().intersects(e.hitbox())) console.log(this.hitbox().intersect(e.hitbox()));
		return this.hitbox().intersects(e.hitbox());
	}
};

Player.prototype.kill = function(){
	if (this.state == "died") return;
	this.state = "died";
	alert("You died");
};

// Bullet class

let Bullet = function(dir, damage, side, ...args){ // CHECK Will this works?
	Entity.apply(this, args);
	this.dir = dir.clone();
	this.damage = damage;
	this.side = side; // "enemy" or "player"
};


Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.isAbroad = function(){
	let w = canvas.width,
	h = canvas.height;
	spr = this.sprite;
	return (this.pos.x + spr.origin.x < 0 || this.pos.x - spr.origin.x > canvas.width ||
		this.pos.y + spr.origin.y < 0 || this.pos.y - spr.origin.y > canvas.height);
};

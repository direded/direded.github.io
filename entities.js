// Entitiy class

let Entity = function(pos, speed, health, size, sprite) {
	this.pos = pos;
	this.dir = new Point(0, 0);
	this.speed = speed;
	this.health = health;
	this.size = size;
	this.sprite = sprite;
}

Entity.prototype.render = function(ctx){
	ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    this.sprite.render(ctx, this.pos);
    ctx.restore();

}

Entity.prototype.update = function(step){
	with (this){
		pos.add(dir.clone().scale(speed * step / 1000)); // FIXME change geometry lib
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
	this.isAttack = b;
	this.plr.fire();
}

// Player class

let Player = function(...args){
	Entity.apply(this, args);
	this.control = new PlayerControl(this);
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.fire = function(){
	game.addEnt(new Bullet(new Point(0, -1), 2,
		new Point(this.pos.x, this.pos.y), 250, 100, new Point(64, 32),
		new Sprite(new Point(64, 32), resources.img.get("bullet"))));
}

Player.prototype.update = function(step) {
	with (this)
		pos.add(dir.clone().scale(speed * step / 1000)); // FIXME change geometry lib
}

// Bullet class

let Bullet = function(dir, damage, ...args){ // CHECK Will this works?
	Entity.apply(this, args);
	this.dir = dir;
	this.damage = damage;
}

Bullet.prototype = Object.create(Entity.prototype);

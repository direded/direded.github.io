
// Entitiy class

let Entity = function(obj){ // pos, speed, health, size, sprite

	this.pos = obj.pos.clone();
	this.dir = new Point(0, 0);
	this.speed = obj.speed;
	this.health = obj.health;
	this.size = obj.size.clone();
	this.sprite = obj.sprite;
	this.isAlive = true;
	this.dieCallbacks = [];
}


Entity.prototype.visualBounds = function() {
	return new Rect(this.pos.x - this.sprite.origin.x, this.pos.y - this.sprite.origin.y, this.sprite.size.x, this.sprite.size.y);
}

Entity.prototype.hitbox = function() {
	return new Rect(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2, this.size.x, this.size.y);
}

Entity.prototype.render = function(ctx){
	if (!this.isAlive) return;
	this.sprite.render(ctx, this.pos);
}

Entity.prototype.update = function(step){
	if (!this.isAlive) return;
	with (this){
		pos.add(dir.clone().scale(speed * step / 1000)); // FIXME change geometry lib
	}
}

Entity.prototype.checkCollision = function(e){
	if (!this.isAlive) return false;
	return e instanceof Bullet &&
		e.side == "player" &&
		e.hitbox().intersects(this.hitbox());
}

Entity.prototype.kill = function(e){
	this.isAlive = false;
	for (let f of this.dieCallbacks)
		f(e);
}

Entity.prototype.killByPlr = function(e){
	let x = Math.random();
	if (x > 0.8) {
		let i = Math.random() * (3.5 - 1) + 1;
		i = Math.round(i);
		if (i == 1)game.bonus().push(new DefaultBonus(this.pos));
		if (i == 2)game.bonus().push(new ShotgunBonus(this.pos));
		if (i == 3)game.bonus().push(new MachinegunBonus(this.pos));
	}
	this.isAlive = false;
	game.levelKilled();
}
// Enemy class

let Enemy = function(obj){
	Entity.call(this, obj);
	this.value = 10;
	this.attackDelay = 0;
	this.attackTime = 0;
	this.moveTime = 0;
}

Enemy.prototype = Object.create(Entity.prototype);

// Weapons class

let Weapon = function(obj){
	this.bullet = obj.bullet;
	this.delay = obj.delay;
	this.lastFire = 0;
	this.plr = obj.plr;
}

Weapon.prototype.fire = function(){
	let now = performance.now();
	if (now - this.lastFire >= this.delay) {
		this._fire();
		this.lastFire = now;
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
}

// Player class

let Player = function(obj){
	Entity.call(this, obj);
	this.control = new PlayerControl(this);
	this.weapon = new DefaultWeapon(this);
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function(step) {
	if (!this.isAlive) return;
	if (this.control.isAttack)
		this.weapon.fire();
	with (this) {
		pos.add(dir.clone().scale(speed * step / 1000)); // FIXME change geometry lib
		if (pos.x + sprite.origin.x > game.border.x || pos.y + sprite.origin.y > game.border.y ||
			pos.x - sprite.origin.x < 0 || pos.y - sprite.origin.y < 0)
			pos.subtract(dir.clone().scale(speed * step / 1000));
	}
};

Player.prototype.render = function(step) {
	if (!this.isAlive) return;
	Entity.prototype.render.call(this, step);
};

Player.prototype.checkCollision = function(e){
	if (!e.isAlive || !this.isAlive) return false;
	if (e instanceof Bullet)
		return this.hitbox().intersects(e.hitbox()) && e.side !== "player";
	else
		return this.hitbox().intersects(e.hitbox());
};

Player.prototype.hit = function(){
	resources.anim.play(
		"explosion_1",
		this.pos.clone().add(new Point(
			Math.random() * this.size.x * 0.3,
			Math.random() * this.size.y * 0.3)),
		this.sprite.size.clone().scale(Math.random() * (0.55 - 0.35) + 0.35), 810);
	resources.sound.play("explode", 0.5);
	if (--this.health > 0) return;

	this.kill();
}

Player.prototype.kill = function(){
	Entity.prototype.kill.call(this);
	if (!game.players()[0].isAlive && !game.players()[1].isAlive)
		game.setState("over");
}

// Bullet class

let Bullet = function(entObj, bulletObj){ // dir, damage, side
	Entity.call(this, entObj);
	this.dir = bulletObj.dir.clone();
	this.damage = bulletObj.damage;
	this.side = bulletObj.side; // "enemy" or "player"
};


Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.isAbroad = function(){
	let w = game.border.x,
	h = game.border.y;
	spr = this.sprite;
	return (this.pos.x + spr.origin.x < 0 || this.pos.x - spr.origin.x > w ||
		this.pos.y + spr.origin.y < 0 || this.pos.y - spr.origin.y > h);
};

// Binus class pos, speed, health, size, sprite
let Bonus = function(bonusObj) {
	Entity.call(this, {
			pos: bonusObj.pos,
			speed: 50,
			health: 1,
			size: new Point(32, 32),
			sprite: bonusObj.sprite,
		});
	this.dir = new Point(0, 1);
}

Bonus.prototype = Object.create(Entity.prototype);

Bonus.prototype.checkCollision = function(e){
	return this.hitbox().intersects(e.hitbox());
}

// DefaultBonus
let DefaultBonus = function(pos) {
	Bonus.call(this, {
			pos: pos,
			sprite: resources.sprites.get("default_bonus"),
		});
}

DefaultBonus.prototype = Object.create(Bonus.prototype);

DefaultBonus.prototype.use = function(plr) {
	if (!this.isAlive) return;
	plr.weapon = new DefaultWeapon(plr);
	this.kill();
}

//ShotgunBonus
let ShotgunBonus = function(pos) {
	Bonus.call(this, {
			pos: pos,
			sprite: resources.sprites.get("shotgun_bonus"),
		});
}

ShotgunBonus.prototype = Object.create(Bonus.prototype);

ShotgunBonus.prototype.use = function(plr) {
	if (!this.isAlive) return;
	plr.weapon = new ShotgunWeapon(plr);
	this.kill();
}

//MachinegunBonus
let MachinegunBonus = function (pos) {
	Bonus.call(this, {
		pos: pos,
		sprite: resources.sprites.get("machinegun_bonus"),
	})
}

MachinegunBonus.prototype = Object.create(Bonus.prototype);

MachinegunBonus.prototype.use = function(plr) {
	if (!this.isAlive) return;
	plr.weapon = new MachinegunWeapon(plr);
	this.kill();
}

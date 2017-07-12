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
	let ans = false;
	if (e instanceof Bullet && e.side == "player")
		if (e.hitbox().intersects(this.hitbox())){
			this.health -= e.damage;
			ans = "b";
		}
	return (this.health <= 0) ? true : ans;
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
	/*game.bullets.push(new Bullet(dir.clone(), 2, side,
		this.pos.clone().add(dir.clone().scale(Math.min(this.sprite.size.x, this.sprite.size.y))), 250,  100, new Point(16, 32),
		resources.sprites.get("bullet")));*/
}

// Enemy class

let Enemy = function(...args){
	Ship.apply(this, args);
	this.attackDelay = 0;
	this.attackTime = 0;
	this.moveTime = 0;
}

Enemy.prototype = Object.create(Ship.prototype);

Enemy.prototype.update = function(step){
}

// Weapons class

let Weapon = function(bullet, delay, plr){
	this.bullet = bullet;
	this.delay = delay;
	this.lastFire = 0;
	this.plr = plr;
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

let Player = function(...args){
	Ship.apply(this, args);
	this.control = new PlayerControl(this);
	this.state = "alive";
	this.weapon = new DefaultWeapon(this);
}

Player.prototype = Object.create(Ship.prototype);

Player.prototype.update = function(step) {
	if (this.state == "died") return;
	if (this.control.isAttack)
		this.weapon.fire();
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
	let w = game.border.x,
	h = game.border.y;
	spr = this.sprite;
	return (this.pos.x + spr.origin.x < 0 || this.pos.x - spr.origin.x > w ||
		this.pos.y + spr.origin.y < 0 || this.pos.y - spr.origin.y > h);
};

/*DefaultAI = function(enterPoint, movePoint, ...args){
	EnemyAI.apply(this, args);
	this.enterPoint = enterPoint.clone();
	this.movePoint = movePoint.clone();
}

DefaultAI.prototype = Object.create(EnemyAI.prototype);

DefaultAI.prototype.move = function(time){
	this.pos = this.posStart.lerp(this.movePoint, (time * this.speed) / this.posStart.distance(this.movePoint));
	if (this.pos.equals(this.movePoint)) {
		this.movePoint = this.posStart;
		this.posStart = this.movePoint;
		this.ai.time = 0;
	}
	if (this.pos.equals(this.enterPoint)) {
		this.movePoint = this.posStart;
		this.posStart = this.enterPoint;
		this.ai.time = 0;
	}

};

DefaultAI.prototype.enter = function(time){
	this.pos = this.posStart.lerp(this.enterPoint, (time * this.speed) / this.posStart.distance(this.enterPoint));
	if (this.pos.equals(this.enterPoint)){
		return null;
	}
	console.log(this);
};

let DefaultEnemy = function(enterPoint, movePoint, ...args){
	Enemy.apply(this, args);
	this.ai = new DefaultAI(enterPoint, movePoint, this);
}

DefaultEnemy.prototype = Object.create(Enemy.prototype);
*/

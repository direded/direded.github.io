let DefaultEnemy = function(enterP, finalP, ...args){
	Enemy.apply(this, args);
	this.attackDelay = 1000;
	this.changeState("enter");
	this.enterP = enterP;
	this.finalP = finalP;
	this.delta = 1;
}

DefaultEnemy.prototype = Object.create(Enemy.prototype);

DefaultEnemy.prototype.fire = function(){
	game.bullets.push(new Bullet(new Point(0, 1), 2, "enemy",
		this.pos.clone().add(new Point(0, this.sprite.origin.y)),
		250,  100, new Point(16, 32),
		resources.sprites.get("bullet")));
}

DefaultEnemy.prototype.changeState = function(state){
	this.startPos = this.pos;
	this.state = state;
	this.moveTime = 0;
}

DefaultEnemy.prototype.update = function(step){
	with (this){
		attackTime += step;
		if (attackTime >= attackDelay) {
			attackTime = 0;
			fire();
		}

		moveTime = moveTime + step * delta;
		if (state === "enter")
			if (!enter(moveTime))
				changeState("move");
		if (state === "move")
			if (!mainMove(moveTime))
				changeState("exit");

	}
}

DefaultEnemy.prototype.enter = function(time){
	let maxTime = (this.startPos.distance(this.enterP) / this.speed) * 1000;
	this.pos = this.startPos.lerp(this.enterP, time / maxTime);
	if (time >= maxTime)
		return false;
	return true;
}

DefaultEnemy.prototype.mainMove = function(time){
	let maxTime = (this.startPos.distance(this.finalP) / this.speed) * 1000;
	this.pos = this.startPos.lerp(this.finalP, time / maxTime);
	if (time > maxTime) {
		this.finalP = this.startPos.clone();
		this.startPos = this.pos.clone();
		this.moveTime = 0;
	}
	return true;
}

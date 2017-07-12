let DefaultEnemy = function(points, ...args){
	Enemy.apply(this, args);
	this.attackDelay = 300;
	this.finalPos = null;
	this.startPos = null;
	this.points = points;
	this.curPoint = 0;
	this.state = this.enter;
	this.stateDir = 1;
	this.isMoving = false;
	this.state();
}

DefaultEnemy.prototype = Object.create(Enemy.prototype);

DefaultEnemy.prototype.fire = function(){
	game.bullets.push(new Bullet(new Point(0, 1), 2, "enemy",
		this.pos.clone().add(new Point(0, this.sprite.origin.y)),
		250,  100, new Point(16, 32),
		resources.sprites.get("bullet")));
}

DefaultEnemy.prototype.update = function(step){
	with (this){
		attackTime += step;
		if (attackTime >= attackDelay) {
			attackTime = 0;
			fire();
		}

		moveTime += step;
		if (isMoving && !moveToUpdate(moveTime))
			state();
	}
}

DefaultEnemy.prototype.moveTo = function(p){
	with (this) {
		isMoving = true;
		startPos = this.pos.clone();
		finalPos = p;
		moveTime = 0;
	}
}

DefaultEnemy.prototype.moveToUpdate = function(time){
	with (this) {
		let maxTime = (startPos.distance(finalPos) / speed) * 1000;
		pos = startPos.lerp(finalPos, time / maxTime);
		if (time >= maxTime) {
			isMoving = false;
			return false;
		}
		return true;
	}
}

DefaultEnemy.prototype.enter = function(){
	with (this) {
		moveTo(points[curPoint]);
		state = mainMove;
	}
}

DefaultEnemy.prototype.mainMove = function(time){
	console.log("opa");
	with (this) {
		curPoint += stateDir;
		if (stateDir == 1) {
			if (curPoint < points.length)
				moveTo(points[curPoint]);
			else {
				stateDir = -1;
				curPoint -= 2;
				moveTo(points[curPoint]);
			}
		} else {
			if (curPoint >= 0)
				moveTo(points[curPoint]);
			else {
				stateDir = 1;
				curPoint += 2;
				moveTo(points[curPoint]);
			}

		}
	}
}

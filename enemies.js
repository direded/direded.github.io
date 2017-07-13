let DefaultEnemy = function(entObj, points){ // entObj: pos
	Enemy.call(this,{
			pos: entObj.pos,
			speed: 240,
			health: 210,
			size: new Point(90, 90),
			sprite: resources.sprites.get("enemy_1"),
		});
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
	game.bullets().push(new DefaultEnemyBullet({
			dir: new Point(0, 1),
			damage: 2,
			side: "enemy",
			pos: this.pos.clone().add(new Point(0, this.sprite.origin.y)),
		}));
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

DefaultEnemy.prototype.end = function(){
	this.moveTo(new Point(game.border.x / 2, -400));
	this.state = this.kill;
}

DefaultEnemy.prototype.mainMove = function(time){
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

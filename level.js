/*let StageEl = function(time, pos, ent){
	this.time = time;
	this.pos = pos;
	this.enemy = ent;
}*/

let Stage = function(enemyMax, delay, getPosPoint, generatePoint){
	this.enemies = [];
	this.enemyCount = 0;
	this.enemyKilled = 0;
	this.enemyMax = enemyMax;
	this.time = 0;
	this.delay = delay;
	this.maxTime = 6000;
	this.getPosPoint = getPosPoint;
	this.generatePoint = generatePoint;
}

Stage.prototype.spawnEnt = function(){
	this.enemyCount++;
	this.enemies.push(new DefaultEnemy(
			{pos: this.getPosPoint(this.enemies.length)},
			this.generatePoint(this.enemies.length),
		));
	this.enemies[this.enemies.length - 1].dieCallbacks.push(function(){
		game.levelKilled();
	});
	game.ents().push(this.enemies[this.enemies.length - 1]);
}

Stage.prototype.end = function(){
	time = -1;
	for (let e of this.enemies)
		e.end();
}

Stage.prototype.update = function(step){
	with (this){
		if (time == -1) return;
		time += step;
		if (enemyCount < enemyMax)
			if (time >= delay){
				spawnEnt();
				time = 0;
			}
		if (time >= maxTime)
			end();
	}
}

Stage.prototype.killed = function(){
	this.enemyKilled++;
	if (this.enemyKilled == this.enemyMax){
		this.cleanUp();
		return true;
	}
}

Stage.prototype.cleanUp = function(){
	this.enemies = [];
	this.enemyCount = 0;
	this.enemyKilled = 0;
	this.time = 0;
}

let DynLevel = function(name){
	this.stages = [];
	this.stageId = -1;
	this.name = name;
	this.pauseTime = 0;
	this.pauseDuration = -2;
}

DynLevel.prototype.stagePauseDurat;ion = 3000;
DynLevel.prototype.startPauseDuration = 4000;

DynLevel.prototype.addStage = function(enemyMax, delay, startPos, genPoints){
	if (this.stageId == -1)
		this.stageId = 0;
	/*this.stages.push(new Stage(
			function(id){
				return new Point(Math.random() * (game.border.x + 100 + 100 + 1) - 100, -100);
			},
			function(id){
				let count = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
				let ans = [];
				let pointY = 0.5 * game.border.y * (id+1) / this.enemyMax;
				ans.push(new Point(0, pointY));
				for (let i = 0; i < count; i++)
					ans.push(new Point(Math.random() * (game.border.x + 1), pointY));
				ans.push(new Point(game.border.x, pointY));
				return ans;
			}
		));*/
	this.stages.push(new Stage(enemyMax, delay, startPos, genPoints));
};

DynLevel.prototype.update = function(step){
	with (this) {
		if (pauseDuration == -2){
			console.log("Get ready for " + this.name);
			pauseDuration = this.startPauseDuration;
		}
		if (pauseDuration != -1){
			if (pauseTime <= pauseDuration)
				pauseTime += step;
			else {
				pauseTime = 0;
				pauseDuration = -1;
			}
			return;
		}
		if (stageId == -1) return;
		stages[stageId].update(step);
	}
};

DynLevel.prototype.stageCleared = function(){
	console.log("Stage " + this.name + "." + this.stageId + " cleared");
	pauseDuration = this.stagePauseDuration;
	if (++this.stageId >= this.stages.length){
		this.stageId = 0;
		game.levelFinished();
	}
};

DynLevel.prototype.killed = function(){
	if (this.stages[this.stageId].killed())
		this.stageCleared();
};

DynLevel.prototype.cleanUp = function(){
	this.pauseDuration = -2;
	this.stages.forEach(function(s){
			s.cleanUp();
		});
};

(function(){
	window.resources.levels = [];
	let l = new DynLevel("Demo");
	l.addStage(1, 1000,
			function(id){
				return new Point(Math.random() * (game.border.x + 100 + 100 + 1) - 100, -100);
			},
			function(id){
				let count = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
				let ans = [];
				let pointY = 0.5 * game.border.y * (id+1) / this.enemyMax;
				ans.push(new Point(0, pointY));
				for (let i = 0; i < count; i++)
					ans.push(new Point(Math.random() * (game.border.x + 1), pointY));
				ans.push(new Point(game.border.x, pointY));
				return ans;
			}
		);
	l.addStage(7, 1000,
			function(id){
				return new Point(Math.random() * (game.border.x + 100 + 100 + 1) - 100, -100);
			},
			function(id){
				let count = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
				let ans = [];
				let pointY = 0.5 * game.border.y * (id+1) / this.enemyMax;
				ans.push(new Point(0, pointY));
				for (let i = 0; i < count; i++)
					ans.push(new Point(Math.random() * (game.border.x + 1), pointY));
				ans.push(new Point(game.border.x, pointY));
				return ans;
			}
		);
	resources.levels.push(l);
})();

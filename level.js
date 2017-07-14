/*let StageEl = function(time, pos, ent){
	this.time = time;
	this.pos = pos;
	this.enemy = ent;
}*/

let Stage = function(maxTime, enemyMax, delay, getPosPoint, generatePoint){
	this.enemies = [];
	this.enemyCount = 0;
	this.enemyKilled = 0;
	this.enemyMax = enemyMax;
	this.time = 0;
	this.delay = delay;
	this.maxTime = maxTime;
	this.getPosPoint = getPosPoint;
	this.generatePoint = generatePoint;
}

Stage.prototype.spawnEnt = function(){
	this.enemyCount++;
	this.enemies.push(new DefaultEnemy(
			{pos: this.getPosPoint(this.enemies.length)},
			this.generatePoint(this.enemies.length),
		));
	game.ents().push(this.enemies[this.enemies.length - 1]);
}

Stage.prototype.end = function(){
	this.time = -2;
	this.endTime = 0;
	for (let e of this.enemies)
		e.end();
}

Stage.prototype.update = function(step){
	with (this){
		if (time == -1) return;
		if (time == -2){
			endTime += step;
			if (endTime > 3000){
				this.time == -1;
				game.level().stageCleared();
			}
			return;
		}
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
	return false;
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

DynLevel.prototype.stagePauseDuration = 3000;
DynLevel.prototype.startPauseDuration = 4000;

DynLevel.prototype.addStage = function(maxTime, enemyMax, delay, startPos, genPoints){
	if (this.stageId == -1)
		this.stageId = 0;
	this.stages.push(new Stage(maxTime, enemyMax, delay, startPos, genPoints));
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
	} else {
		game.menu.displayTitle(true, "Stage " + (this.stageId) + " cleared");
		setTimeout(function() {
				game.menu.displayTitle(false);
			}, 2000);
	}
};

DynLevel.prototype.killed = function(){
	if (this.stages[this.stageId].killed())
		this.stageCleared();
};

DynLevel.prototype.cleanUp = function(){
	this.pauseDuration = -2;
	this.stageId = 0;
	this.stages.forEach(function(s){
			s.cleanUp();
		});
};

(function(){
	window.resources.levels = [];
	let l = new DynLevel("Demo1");

	l.addStage(10000, 2, 1000,
			function(id){
				return new Point(-100, id * 50 + 100);
			},
			function(id){
				let count = 9;
				let ans = [];

				let delta = 150;
				let x = 200 + 100 * (id+1);
				let y = 200 + 100 * (id+1);

				ans.push(new Point(x, y));
				for (let i = 0; i < count; i++){
					if (i % 2){
						ans.push(new Point(x + delta * i, y - delta));
					}
					else{
						ans.push(new Point(x + delta * i, y));
					}
				}
				return ans;
			}
		);

	l.addStage(20000, 4, 1000,
		function(id){
				return new Point(game.border.x / 2, -100);
			},
		function(id){
			let ans = [];

			let left = game.border.x * 0.05 + id * Math.random() * 50;
			let top = game.border.y * 0.05 + id * Math.random() * 50;

			ans.push(new Point(game.border.x / 2 - 10 * id * Math.random(), game.border.y / 2 + 60 * id * Math.random()));
			ans.push(new Point(left, top));
			ans.push(new Point(left, top * 2));
			ans.push(new Point(game.border.x - left, top * 2));
			ans.push(new Point(game.border.x - left,  top));
			console.log(ans);
			return ans;
		}
		);

	l.addStage(10000, 7, 1000,
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

	l.addStage(12000, 8, 1000,
			function(id){
					return new Point(Math.random() * 150 + 100, -150);
			},
			function(id){
				let ans = [];

				let delta_x = game.border.x * 0.25;
				let delta_y = game.border.y * 0.2;
				let x = game.border.x * 0.3 - delta_x;
				let y = game.border.y * 0.4;

				switch (id) {
				case 0:
					for (let i = 0; i < 3; i++){
						ans.push(new Point(x + delta_x, y));
					}
					ans.push(new Point(x + delta_x * 2, y - delta_y));
					for (let i = 1; i < 3; i++) {
						ans.push(new Point(x + delta_x * 2 - delta_x * i, y - delta_y));
					}
					break;
				default:
					for (let i = 0; i < 4; i++){
						ans.push(new Point(x + delta_x * Math.random(), y));
						ans.push(new Point(x + delta_x * (3.6 - Math.random()), y - delta_y ));
					}
					break;
				}
				return ans;
			}
		);

	l.addStage(10000, 15, 1000,
			function(id){
				return new Point(game.border.x * 0.5, -100);
			},
			function(id){
				let ans = [];
				let r = game.border.x * 0.1;

				let x = game.border.x * (Math.random() * 0.95 + (id) * 0.001);
				let y = game.border.y * (Math.random() * 0.3 + 0.2);

				ans.push(new Point(x, y - r));
				ans.push(new Point(x + r * 0.6, y - r * 0.02));
				ans.push(new Point(x + r * 0.6, y + r * 0.02));
				ans.push(new Point(x, y + r));
				ans.push(new Point(x - r * 0.6, y + r * 0.02));
				ans.push(new Point(x - r * 0.6, y - r * 0.02));
				ans.push(new Point(x, y - r));
				return ans;

			}
		);
	resources.levels.push(l);

})();

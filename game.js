let Game = function(context) {
	var ents = [],
		bullets = [],
		plrs = [];
	let last = performance.now(),
		step = 20,
		delta = 0,
		now,
		bg = null,
		isPause = false,
		score = 0;
	let border = new Point(1920, 1080);
	let curLevel = 0;
	let levelLoaded = false;
	let level = resources.levels[curLevel];

	let addScore = function(value){
		score += value;
	}

	let levelKilled = function(){
		level.killed();
	}

	let levelFinished = function(){
		console.log("Level " + level.name + " finished");
		levelLoaded = false;;
		if (++curLevel < resources.levels.length){
			level = resources.levels[curLevel];
		} else {
			gameOver();
		}
	}

	let levelStart = function(){
		levelLoaded = true;
	}

	let gameOver = function() {
		console.log("You finished game with score: " + score);
	}


	let getEnts = function(){
		return ents;
	}

	let getBullets = function(){
		return bullets;
	}

	let getPlayers = function(){
		return plrs;
	}

	let start = function() {
		bg = new Background(resources.img.get("background"), canvas);
		requestAnimationFrame(loop);
	};

	let pause = function(){
		isPause = true;
	}


	let resume = function(){
		isPause = false;
		last = performance.now();
		requestAnimationFrame(loop);
	}

	let checkCollision = function() {
		for (let p in plrs) {
			if (!plrs[p].isAlive) continue;
			for (let e in ents)
				if (plrs[p].checkCollision(ents[e]))
					plrs[p].kill();
			for (let b in bullets)
				if (plrs[p].checkCollision(bullets[b])) {
					bullets[b].kill();
					plrs[p].kill();
				}
		}
		for (let b in bullets){
		 	if (bullets[b].isAbroad()){
				bullets[b].kill();
				continue;
			}
			for (let e in ents)
				if (a = ents[e].checkCollision(bullets[b])){
					bullets[b].kill();
					addScore(ents[e].value || 0);
					ents[e].kill();
				}
		}
	}

	let update = function(step) {
		if (levelLoaded) level.update(step);
		ents.forEach(function(ent){
			ent.update(step);
		});
		plrs.forEach(function(ent){
			ent.update(step);
		});
		bullets.forEach(function(ent){
			ent.update(step);
		});
		bg.update(step);
		checkCollision();
		let newArr = new Array();
		for (let i of bullets)
			if (i.isAlive)
				newArr.push(i);
		bullets = newArr.slice();

		newArr = new Array();
		for (let b of ents)
			if (b.isAlive)
				newArr.push(b);
		ents = newArr.slice();
	};

	let render = function(ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ents.forEach(function(ent){
			ent.render(ctx);
		});
		plrs.forEach(function(ent){
			ent.render(ctx);
		});
		bullets.forEach(function(ent){
			ent.render(ctx);
		});
	};

	let loop = function() {
		now = performance.now();
		delta += Math.min(1000, now - last); // исправление проблемы неактивных вкладок
		while (delta > step) {
			delta -= step;
			update(step);
		}
		last = now;
		render(context);
		if (!isPause)
			requestAnimationFrame(loop);
	};

	return {
		addScore: addScore,
		levelStart: levelStart,
		levelFinished: levelFinished,
		levelKilled: levelKilled,
		ents: getEnts,
		pause: pause,
		resume: resume,
		bullets: getBullets,
		players: getPlayers,
		start: start,
		border: border,
		background: bg,
	}
};

let Game = function(context) { 
	var ents = [],
		bullets = [],
		plrs = [];
	let last = performance.now(),
		step = 20,
		delta = 0,
		now,
		bg = null,
		isPause = true,
		score = 0;
	let border = new Point(1920, 1080);
	let curLevel = 0;
	let levelLoaded = false;
	let level = resources.levels[curLevel];
	let loaded = false;

	let input1, input2;
	let hud = null;

	let addScore = function(value){
		score += value;
	}

	let getScore = function(){
		return score;
	}

	let levelKilled = function(){
		level.killed();
	}

	let levelFinished = function(){
		console.log("Level " + level.name + " finished");
		levelLoaded = false;
		if (++curLevel < resources.levels.length){
			level = resources.levels[curLevel];
		} else {
			if ((plrs[0] && plrs[0].isAlive) || (plrs[0] && plrs[1].isAlive))
				changeState("finished");
			else
				changeState("over");
		}
	}

	let state = null;

	let levelStart = function(){
		levelLoaded = true;
	};

	let cleanUpGame = function(){
		ents.forEach(function(e){e.kill()});
		bullets.forEach(function(e){e.kill()});
		levelLoaded = false;
		curLevel = 0;
	}

	let startState = function(){
		resources.music.play("shooting_stars", 0.5, true);
		spawnPlayer(0);
		levelStart();
		isPause = false;
		last = performance.now();
		requestAnimationFrame(loop);
	};

	let overState = function(){
		console.log("Showing game over menu");
		console.log("You lost game with score: " + score);
		cleanUpGame();
		isPause = true;
	};

	let finishedState = function(){
		console.log("Showing finish menu");
		console.log("You finished game with score: " + score);
		cleanUpGame();
		isPause = true;
	};

	let resumeState = function(){
		console.log("Hiding pause menu");
		isPause = false;
		last = performance.now();
		requestAnimationFrame(loop);
	};

	let pauseState = function(){
		console.log("Showing pause menu");
		isPause = true;
	};

	let changeState = function(newState){
		switch (newState) {
			case "menu":
				state = menuState;
			break;
			case "start":
				state = startState;
			break;
			case "resume":
				state = resumeState;
			break;
			case "pause":
				state = pauseState;
			break;
			case "finished":
				state = finishedState;
			break;
			case "over":
				state = overState;
			break;

		}
		state();
		state = null;
	}

	let spawnPlayer = function(id){
		plrs[id].isAlive = true;
		plrs[id].pos = new Point(game.border.x / 2, game.border.y - 60);
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

	let initGame = function(){
		bg = new Background(resources.img.get("background"), canvas);
		input1 = playerHandleInput({
				up: "KeyW",
				down: "KeyS",
				left: "KeyA",
				right: "KeyD",
				attack: "KeyV"
			});
		input2 = playerHandleInput({
				up: "Numpad8",
				down: "Numpad5",
				left: "Numpad4",
				right: "Numpad6",
				attack: "ArrowDown"
			});
		loaded = true;
		plrs.push(new Player({
				pos: new Point(game.border.x / 2, game.border.y - 60),
				speed: 380,
				health: 3,
				size: new Point(40, 60),
				sprite: resources.sprites.get("plr_1")}
			));
		input1.connectPlayer(plrs[plrs.length - 1]);
		plrs.push(new Player({
				pos: new Point(game.border.x / 2, game.border.y - 60),
				speed: 380,
				health: 3,
				size: new Point(40, 60),
				sprite: resources.sprites.get("plr_2")}
			));
		input2.connectPlayer(plrs[plrs.length - 1]);
		plrs[0].kill();
		plrs[1].kill();
		hud = new HUD();
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
		hud.render();
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
		init: initGame,
		addScore: addScore,
		getScore: getScore,
		levelStart: levelStart,
		levelFinished: levelFinished,
		levelKilled: levelKilled,
		ents: getEnts,
		bullets: getBullets,
		players: getPlayers,
		changeState: changeState,
		border: border,
		background: bg,
	}
};

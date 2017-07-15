let Game = function(context) {
	var ents = [],
		bullets = [],
		plrs = [],
		bonus = [];
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
	let justInited = false;

	let playersCount = 1;

	let menu = new Menu();

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
		if (plrs[0].isAlive) plrs[0].health = 3;
		if (plrs[1].isAlive) plrs[1].health = 3;
		if (++curLevel < resources.levels.length){
			menu.displayTitle(true, "Level " + level.name + " finished");
			setTimeout(function() {
					game.menu.displayTitle(false);
				}, 2000);
			levelLoaded = true;
			level = resources.levels[curLevel];
			level.cleanUp();
		} else {
			setState("finished");
		}
	}

	let state = null;

	let levelStart = function(){
		levelLoaded = true;
	};

	let cleanUpGame = function() {
		ents.forEach(function(e){e.kill()});
		bullets.forEach(function(e){e.kill()});
		bonus.forEach(function(e){e.kill()});
		levelLoaded = false;
		curLevel = 0;
		score = 0;
		resources.anim.cleanUp();
		level.cleanUp();
		curLevel = 0;
		level = resources.levels[curLevel];
	}

	let startState = function() {
		resources.music.stopAll();
		let i = Math.random() * (4.4 - 0.6) + 0.6;
		i = Math.round(i);
		if (i == 1) resources.music.play("megamen", 0.35, true);
		if (i == 2) resources.music.play("sonic", 0.35, true);
		if (i == 3) resources.music.play("tower", 0.5, true);
		if (i == 4) resources.music.play("world6", 0.5, true);
		spawnPlayer(0);
		if (playersCount == 2)
			spawnPlayer(1);
		levelStart();
		isPause = false;
		last = performance.now();
		requestAnimationFrame(loop);
	};

	let overState = function() {
		resources.music.stopAll();
		resources.music.play("you_died", 0.5, true);
		menu.updateScore(score);
		menu.displayDeathMenu(true);
		console.log("Showing game over menu");
		console.log("You lost game with score: " + score);
		cleanUpGame();
		isPause = true;
	};

	let finishedState = function() {
		resources.music.stopAll();
		resources.music.play("dont_care", 0.5, true);
		menu.updateScore(score);
		menu.displayWinMenu(true);
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
		menu.displayPauseMenu(true);
		console.log("Showing pause menu");
		isPause = true;
	};

	let menuState = function(){
		if (!justInited)
			resources.music.stopAll();
		justInited = false;
		menu.displayMainMenu(true);
		console.log("Showing menu");
		isPause = true;
	};

	let setState = function(newState) {
		let temp = state;
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
				if (state == startState || state == resumeState)
					state = pauseState;
				else if (state == pauseState)
					state = resumeState;
			break;
			case "finished":
				state = finishedState;
			break;
			case "over":
				state = overState;
			break;

		}
		if (state != temp){
			menu.hideAll();
			state();
		}
	}

	let spawnPlayer = function(id){
		plrs[id].isAlive = true;
		plrs[id].health = 3;
		plrs[id].weapon = new DefaultWeapon(plrs[id]);
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

	let getBonus = function(){
		return bonus;
	}

	let initGame = function(){
		justInited = true;
		bg = new Background(resources.img.get("background"), canvas);
		input1 = playerHandleInput({
				up: "KeyW",
				down: "KeyS",
				left: "KeyA",
				right: "KeyD",
				attack: "Space"
			});
		input2 = playerHandleInput({
				up: "ArrowUp",
				down: "ArrowDown",
				left: "ArrowLeft",
				right: "ArrowRight",
				attack: "Slash"
			});
		window.addEventListener("keydown", function(e){
			if (e.code == "KeyP")
				setState("pause");
		}, false);
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
		plrs[0].isAlive = false;
		plrs[1].isAlive = false;
		hud = new HUD();
		setState("menu");
	};

	let pause = function(){
		isPause = true;
	}

	let resume = function(){
		isPause = false;
		last = performance.now();
		requestAnimationFrame(loop);
	}

	let checkPlayersAlive = function(){
		return plrs[0].isAlive || plrs[1].isAlive;
	}

	let checkCollision = function() {
		for (let p in plrs) {
			if (!plrs[p].isAlive) continue;
			for (let e in ents)
				if (plrs[p].checkCollision(ents[e]))
					plrs[p].hit();
			for (let b in bullets)
				if (plrs[p].checkCollision(bullets[b])) {
					bullets[b].kill();
					plrs[p].hit();
				}
			for (let bon of bonus)
				if (bon.checkCollision(plrs[p]))
					bon.use(plrs[p]);
		}
		for (let b in bullets){
		 	if (bullets[b].isAbroad()){
				bullets[b].kill();
				continue;
			}
			for (let e in ents)
				if (a = ents[e].checkCollision(bullets[b])){
					bullets[b].kill();
					ents[e].health -= bullets[b].damage;
					resources.anim.play(
						"explosion_1",
						ents[e].pos.clone().add(new Point(
							Math.random() * ents[e].size.x * 0.3,
							Math.random() * ents[e].size.y * 0.3)),
						ents[e].size.clone().scale(Math.random() * (0.55 - 0.35) + 0.35), 810);
					if (ents[e].health <= 0){
						addScore(ents[e].value || 0);
						ents[e].killByPlr();
					}
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
		bonus.forEach(function(ent){
			ent.update(step);
		});
		bg.update(step);
		resources.anim.update(step);
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

		newArr = new Array();
		for (let b of bonus)
			if (b.isAlive)
				newArr.push(b);
		bonus = newArr.slice();
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

		bonus.forEach(function(ent){
			ent.render(ctx);
		});
		resources.anim.render(ctx);
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
		level: function(){return level;},
		levelStart: levelStart,
		levelFinished: levelFinished,
		levelKilled: levelKilled,
		ents: getEnts,
		bonus: getBonus,
		bullets: getBullets,
		players: getPlayers,
		setState: setState,
		border: border,
		background: bg,
		setPlayersCount: function(v){playersCount = v},
		getPlayersCount: function(){return playersCount},
		menu: menu,
	}
};


game = new Game(context);

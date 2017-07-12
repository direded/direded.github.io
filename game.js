let Game = function(context) {
	var ents = [],
		bullets = [],
		plrs = [];
	let last = performance.now(),
		step = 20,
		delta = 0,
		now,
		bg = null,
		isPause = false;

	let border = new Point(1920, 1080);

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
		let a;
		for (let p in plrs) {
			if (plrs[p].state == "died") continue;
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
					ents[e].kill();
				}
		}
	}

	let update = function(step) {
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

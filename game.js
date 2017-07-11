let Game = function(context) {
	let ents = [];
		bullets = [];
		plrs = [];
	let last = performance.now(),
		step = 20,
		delta = 0,
		now,
		bg = null;

	let addEnt = function(e){
		if (e instanceof Player)
			plrs.push(e);
		else if (e instanceof Bullet)
			bullets.push(e);
		else ents.push(e);
	}

	let getEnt = function(id){
		return ents[id];
	}

	let start = function() {
		bg = new Background(resources.img.get("background"));
		requestAnimationFrame(loop);
	};

	let checkCollision = function() {
		for (let p in plrs) {
			if (plrs[p].state == "died") continue;
			for (let e in ents)
				if (plrs[p].checkCollision(ents[e]))
					plrs[p].kill();
			for (let b in bullets)
				if (plrs[p].checkCollision(bullets[b])) {
					bullets.splice(b, 1);
					plrs[p].kill();
				}
		}
		for (let b in bullets){
		 	if (bullets[b].isAbroad()){
				bullets.splice(b, 1);
				continue;
			}
			for (let e in ents)
				if (ents[e].checkCollision(bullets[b])){
					bullets.splice(b, 1);
					ents.splice(e, 1);
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
		requestAnimationFrame(loop);
	};

	return {
		ents: ents,
		bullets: bullets,
		players: plrs,
		start: start,
		background: bg,
	}
};

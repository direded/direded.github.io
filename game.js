let Game = function(context) {
	let ents = [];
	let last = performance.now(),
		step = 20,
		delta = 0,
		now;

	let addEntity = function(e){
		ents.push(e);
	}

	let getEnt = function(id){
		console.log(ents);
		return ents[id];
	}

	let start = function() {
		requestAnimationFrame(loop);
	};

	let update = function(step) {
		ents.forEach(function(ent){
			ent.update(step);
		});
	};

	let render = function(ctx) {
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ents.forEach(function(ent){
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
		getEnt: getEnt,
		addEnt: addEntity,
		start: start,
	}
};
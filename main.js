var canvas = $("<canvas>")[0];
$("body")[0].append(canvas);
var context = canvas.getContext("2d");

function onResize() {
	let w = document.body.clientWidth;
	let h = document.body.clientHeight;
	if (w / 16 >= h / 9){
	 	canvas.width = h * 16 / 9;
		canvas.height = h;
		canvas.style.left = (w - canvas.width) / 2;
		canvas.style.top = 0;
	} else {
		canvas.width = w;
		canvas.height = w * 9 / 16;
		canvas.style.left = 0;
		canvas.style.top = (h - canvas.height) / 2;
	}
}

onResize();
window.onresize = onResize;

game = new Game(context);

function test_func(){
	game.players().push(new Player({
			pos: new Point(50 ,canvas.height - 60),
			speed: 380,
			health: 100,
			size: new Point(40, 60),
			sprite: resources.sprites.get("ship")}
		));
	let plr1HandleInput = playerHandleInput(game.players()[0], {up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD", attack: "KeyV"});
	game.players().push(new Player({
			pos: new Point(50 ,canvas.height - 60),
			speed: 380,
			health: 100,
			size: new Point(40, 60),
			sprite: resources.sprites.get("ship")}
		));
	let plr2HandleInput = playerHandleInput(game.players()[1], {up: "Numpad8", down: "Numpad5", left: "Numpad4", right: "Numpad6", attack: "ArrowDown"});
	resources.music.play("shooting_stars", 0.5, true);
}

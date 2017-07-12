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
	game.players.push(new Player({
			pos: new Point(50 ,canvas.height - 60),
			speed: 380,
			health: 100,
			size: new Point(40, 60),
			sprite: resources.sprites.get("ship")}
		));
	let plr1HandleInput = playerHandleInput(game.players[0], {up: "w", down: "s", left: "a", right: "d", attack: "c"});
	//window.addEventListener("keydown", plr1HandleInput.isKeyDown);
	window.onkeydown = plr1HandleInput.isKeyDown;
	window.onkeyup = plr1HandleInput.isKeyUp;
	game.ents.push(new DefaultEnemy({
			pos: new Point(0, 0),
			speed: 250,
			health: 5,
			size: new Point(40, 60),
			sprite: resources.sprites.get("ship"),
		},
		[new Point(200, 150), new Point(800, 150), new Point(800, 600), new Point(200, 600)]));
	/*game.ents[0].move(function(time){
		time /= 1000;
			return new Point(100 * Math.sin(time)  , 10*time);
		});*/
	resources.music.play("shooting_stars", 0.5, true);
}

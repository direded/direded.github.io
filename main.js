var canvas = $("<canvas>")[0];
$("body")[0].append(canvas);
var context = canvas.getContext("2d");

function onResize() {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
}

onResize();
window.onresize = onResize;

game = new Game(context);


function test_func(){
	game.addEnt(new Player(new Point(100, 100), 100, 100, new Point(100, 100), new Sprite(new Point(100, 100), resources.img.get("p_ship_1"))));
	let plr1HandleInput = playerHandleInput(game.getEnt(0), {up: "w", down: "s", left: "a", right: "d", attack: "c"});
	//window.addEventListener("keydown", plr1HandleInput.isKeyDown);
	window.onkeydown = plr1HandleInput.isKeyDown;
	window.onkeyup = plr1HandleInput.isKeyUp;

	resources.music.play("shooting_stars", 0.5);
}

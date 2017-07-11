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
	game.players.push(new Player(new Point(0 ,0), 200, 100, new Point(40, 60), new Sprite(new Point(60, 70), resources.img.get("p_ship_1"))));
	let plr1HandleInput = playerHandleInput(game.players[0], {up: "w", down: "s", left: "a", right: "d", attack: "c"});
	//window.addEventListener("keydown", plr1HandleInput.isKeyDown);
	window.onkeydown = plr1HandleInput.isKeyDown;
	window.onkeyup = plr1HandleInput.isKeyUp;
	game.ents.push(new Enemy(new Point(60, 70), 100, 100, new Point(40, 60), resources.sprites.get("ship")));
	game.ents[0].move(function(time){
		time /= 1000;
			return new Point(100 * Math.sin(time)  , 10*time);
		});
	resources.music.play("shooting_stars", 0.5, true);
}

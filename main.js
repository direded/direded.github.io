var canvas = $("<canvas>")[0];
$("body")[0].append(canvas);
var context = canvas.getContext("2d");

function onResize(){
	canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}

<<<<<<< HEAD
window.onresize = onResize;
=======
window.onresize = onResize;
resources.sound.load('src/audio/sfx_exp_short_hard1.wav', 'pop');
resources.music.load('src/audio/1.mp3', 'pup');
resources.music.play('pup', 0);


setInterval(function(){
	 resources.music.volume('pup', +0.1)
}, 500);
>>>>>>> 29a26604d75db6a95aa39a527ad49d70d5363c4d

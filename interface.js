HUD.prototype.renderText = function(){
	let fontSize = 40 * canvas.width / 1920;
	context.font = 'Bold ' + fontSize + 'px monospace';
	context.fillStyle = "white";
	let text = String(game.getScore());
	context.fillText(text, canvas.width / 2 - context.measureText(text).width / 2, canvas.height * 0.03 + this.sprite.origin.y * canvas.height / 1080);
}

HUD.prototype.render = function(){
	this.renderPlr1();
	this.renderPlr2();
	this.renderText();
}

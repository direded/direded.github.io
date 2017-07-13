let HUD = function(){
	this.sprite = resources.sprites.get("heart");
 }

HUD.prototype.renderText = function(){
	let fontSize = 40 * canvas.width / 1920;
	context.font = 'Bold ' + fontSize + 'px monospace';
	context.fillStyle = "white";
	let text = String(game.getScore());
	context.fillText(text, canvas.width / 2 - context.measureText(text).width / 2, canvas.height * 0.03 + this.sprite.origin.y * canvas.height / 1080);
}

HUD.prototype.renderPlr1 = function(){
	if (game.players()[0] === undefined)
		return;
	for (let i = 1; i <= game.players()[0].health; i++) {
		this.sprite.render(context, new Point(i * 50 + this.sprite.origin.x, 25 + this.sprite.origin.y));
	}
}

HUD.prototype.renderPlr2 = function(){
	if (game.players()[1] === undefined) 
		return;
	for (let i = 1; i <= game.players()[1].health; i++){
		this.sprite.render(context, new Point(game.border.x - i * 50 - this.sprite.origin.x, 25 + this.sprite.origin.y));
	}
}

HUD.prototype.render = function(){
	this.renderPlr1();
	this.renderPlr2();
	this.renderText();
}

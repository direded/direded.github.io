let HUD = function(){
	this.sprite = resources.sprites.get("heart");
}

HUD.prototype.renderPlr1 = function(){
	if (game.players()[0] === undefined)
		return;
	for (let i = 1; i <= game.players()[0].health; i++) {
		this.sprite.render(context, new Point(i * 50 + this.sprite.origin.x, 25 + this.sprite.origin.y));
	}
} 

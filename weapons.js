let DefaultBullet = function(dir, damage, side, pos){
	Bullet.call(this, dir, damage, side, pos, 400, 1, new Point(16, 32), resources.sprites.get("bullet"))
}

DefaultBullet.prototype = Object.create(Bullet.prototype);

let DefaultWeapon = function(plr){
	Weapon.call(this, DefaultBullet, 300, plr);
}

DefaultWeapon.prototype = Object.create(Weapon.prototype);

DefaultWeapon.prototype._fire = function(){
	resources.sound.play("pew_1", 0.5);
	game.bullets.push(new this.bullet(new Point(0, -1), 1, "player", this.plr.pos));
}

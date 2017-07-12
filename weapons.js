let DefaultBullet = function(obj){ // dir, damage, side, pos
	Bullet.call(this, {
			pos: obj.pos,
			speed: 400,
			health: 1,
			size: new Point(16, 32),
			sprite: resources.sprites.get("bullet"),
		},{
			dir: obj.dir,
			damage: obj.damage,
			side: obj.side,
		});
}

DefaultBullet.prototype = Object.create(Bullet.prototype);

let DefaultWeapon = function(plr){
	Weapon.call(this, {
			bullet: DefaultBullet,
			delay: 300,
			plr: plr,
		});
}

DefaultWeapon.prototype = Object.create(Weapon.prototype);

DefaultWeapon.prototype._fire = function(){
	resources.sound.play("pew_1", 0.5);
	game.bullets.push(new this.bullet({
			dir: new Point(0, -1),
			damage: 1,
			side: "player",
			pos: this.plr.pos
		}));
}

//Default Bullet and Weapon
let DefaultBullet = function(obj){ // dir, damage, side, pos
	Bullet.call(this, {
			pos: obj.pos,
			speed: 400,
			health: 1,
			size: new Point(16, 32),
			sprite: resources.sprites.get("default_bullet"),
		},{
			dir: obj.dir,
			damage: obj.damage,
			side: obj.side,
		});
}

DefaultBullet.prototype = Object.create(Bullet.prototype);

let DefaultEnemyBullet = function(obj) {
	Bullet.call(this, {
			pos: obj.pos,
			speed: 400,
			health: 1,
			size: new Point(16, 32),
			sprite: resources.sprites.get("enemy_bullet"),
		},{
			dir: obj.dir,
			damage: obj.damage,
			side: obj.side,
		});
}

DefaultEnemyBullet.prototype = Object.create(Bullet.prototype);

let DefaultWeapon = function(plr){
	Weapon.call(this, {
			bullet: DefaultBullet,
			delay: 300,
			plr: plr,
		});
}

DefaultWeapon.prototype = Object.create(Weapon.prototype);

DefaultWeapon.prototype._fire = function(){
	let p = new Point (this.plr.pos.x, this.plr.pos.y - this.plr.sprite.origin.y);
	resources.sound.play("pew_1", 0.5);
	game.bullets().push(new this.bullet({
			dir: new Point(0, -1),
			damage: 105,
			side: "player",
			pos: p
		}));
}

//Shotgun Bullet and Weapon;
let ShotgunBullet = function(obj){ // dir, damage, side, pos
	Bullet.call(this, {
			pos: obj.pos,
			speed: 300,
			health: 1,
			size: new Point(16, 32),
			sprite: resources.sprites.get("shotgun_bullet"),
		},{
			dir: obj.dir,
			damage: obj.damage,
			side: obj.side,
		});
}

ShotgunBullet.prototype = Object.create(Bullet.prototype);

let ShotgunWeapon = function(plr){
	Weapon.call(this, {
			bullet: ShotgunBullet,
			delay: 500,
			plr: plr,
		});
}

ShotgunWeapon.prototype = Object.create(Weapon.prototype);

ShotgunWeapon.prototype._fire = function() {
	let p = new Point (this.plr.pos.x, this.plr.pos.y - this.plr.sprite.origin.y);
	p.subtract(this.plr.sprite.origin);
	p.add(this.plr.sprite.origin);
	resources.sound.play("shotgun", 0.5);
	game.bullets.push(new this.bullet({
			dir: (new Point(0.3, -1)).normalize(),
			damage: 70,
			side: "player",
			pos: p
		}));
	game.bullets.push(new this.bullet({
			dir: (new Point(0, -1)).normalize(),
			damage: 70,
			side: "player",
			pos: p
			}));
	game.bullets.push(new this.bullet({
			dir: (new Point(-0.3, -1)).normalize(),
			damage: 70,
			side: "player",
			pos: p
			}));

}

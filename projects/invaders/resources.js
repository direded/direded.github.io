resources.img.load("src/img/enemy_bullet.png", "enemy_bullet");
resources.img.load("src/img/default_bullet.png", "default_bullet");
resources.img.load("src/img/shotgun_bullet.png", "shotgun_bullet");
resources.img.load("src/img/machinegun_bullet.png", "machinegun_bullet");
resources.img.load("src/img/ship1.png", "p_ship_1");
resources.img.load("src/img/ship2.png", "p_ship_2");
resources.img.load("src/img/back.gif","background");
resources.img.load("src/img/ship3.png", "enemy");
resources.img.load("src/img/heart.png", "heart");
resources.img.load("src/img/explosion_anim.png", "explosion_anim");
resources.img.load("src/img/1.png", "enemy_1");
resources.img.load("src/img/default_bonus.png", "default_bonus");
resources.img.load("src/img/shotgun_bonus.png", "shotgun_bonus");
resources.img.load("src/img/machinegun_bonus.png", "machinegun_bonus");

resources.img.onReady(function(){
		resources.sprites.add(resources.img.get("p_ship_1"), "plr_1", undefined, new Point(72, 96));
		resources.sprites.add(resources.img.get("p_ship_2"), "plr_2", undefined, new Point(72, 96));
		resources.sprites.add(resources.img.get("enemy"), "enemy_1", undefined, new Point(96, 96));
		resources.sprites.add(resources.img.get("enemy_bullet"), "enemy_bullet", undefined, new Point(20, 20));
		resources.sprites.add(resources.img.get("shotgun_bullet"), "shotgun_bullet", undefined, new Point(20, 20));
		resources.sprites.add(resources.img.get("default_bullet"), "default_bullet", undefined, new Point(20, 20));
		resources.sprites.add(resources.img.get("machinegun_bullet"), "machinegun_bullet", undefined, new Point(20, 20));
		resources.sprites.add(resources.img.get("default_bonus"), "default_bonus", undefined, new Point(40, 40));
		resources.sprites.add(resources.img.get("shotgun_bonus"), "shotgun_bonus", undefined, new Point(40, 40));
		resources.sprites.add(resources.img.get("machinegun_bonus"), "machinegun_bonus", undefined, new Point(40, 40));
		resources.sprites.add(resources.img.get("heart"), "heart", undefined, new Point(40, 35));
		resources.anim.add(resources.img.get("explosion_anim"), "explosion_1", new Rect(0, 0, 100, 100), 81, 10);
		resources.sprites.add(resources.img.get("enemy_1"), "enemy_2", undefined, new Point(108, 108));
	});
resources.img.onReady(game.init);

resources.sound.load("src/audio/pew.wav", "pew_1");
resources.sound.load("src/audio/shotgun.wav", "shotgun");
resources.sound.load("src/audio/machinegun.wav", "machinegun");
resources.sound.load("src/audio/explode2.wav", "explode");

//sorry Solgryn
resources.music.load("src/audio/I wanna be the boshy - megamen them.mp3", "megamen");
resources.music.load("src/audio/I wanna be the boshy - sonic theme.mp3", "sonic");
resources.music.load("src/audio/I wanna be the boshy - The tower.mp3", "tower");
resources.music.load("src/audio/I wanna be the boshy - world 6.mp3", "world6");
resources.music.load("src/audio/I wanna be the boshy - lol you died.mp3", "you_died");
resources.music.load("src/audio/i dont care.mp3", "dont_care");

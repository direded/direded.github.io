resources.img.load("src/img/enemy_bullet.png", "enemy_bullet");
resources.img.load("src/img/default_bullet.png", "default_bullet");
resources.img.load("src/img/shotgun_bullet.png", "shotgun_bullet");
resources.img.load("src/img/machinegun_bullet.png", "machinegun_bullet");
resources.img.load("src/img/ship1.png", "p_ship_1");
resources.img.load("src/img/ship2.png", "p_ship_2");
resources.img.load("src/img/back.gif","background");
resources.img.load("src/img/ship3.png", "enemy");
resources.img.load("src/img/heart.png", "heart");

resources.img.onReady(function(){
		resources.sprites.add(resources.img.get("p_ship_1"), "plr_1", undefined, new Point(96, 96));
		resources.sprites.add(resources.img.get("p_ship_2"), "plr_2", undefined, new Point(96, 96));
		resources.sprites.add(resources.img.get("enemy"), "enemy_1", undefined, new Point(96, 96));
		resources.sprites.add(resources.img.get("enemy_bullet"), "enemy_bullet", undefined, new Point(20, 20));
		resources.sprites.add(resources.img.get("shotgun_bullet"), "shotgun_bullet", undefined, new Point(20, 20));
		resources.sprites.add(resources.img.get("default_bullet"), "default_bullet", undefined, new Point(20, 20));
		resources.sprites.add(resources.img.get("machinegun_bullet"), "machinegun_bullet", undefined, new Point(20, 20));
		resources.sprites.add(resources.img.get("heart"), "heart", undefined, new Point(40, 35));
	});
resources.img.onReady(game.init);

resources.sound.load("src/audio/pew.wav", "pew_1");
resources.sound.load("src/audio/shotgun.wav", "shotgun");
resources.sound.load("src/audio/machinegun.wav", "machinegun");

resources.music.load("https://cs5-4v4.vk-cdn.net/p26/98518656611b03.mp3?extra=UIDWEO9-FQfgMdO48YTDIQ2tAGzVr1NfC19r8COGjmuiDevIMUfui1wFI0BT2Qwsz44Q5o7bCTAeWmci4wtMsV8Z9eRhf_ax5hNxMiC7zc1vp25ApRAAqzJTbw1vu_ppqo-wTOY7IQ", "shooting_stars");

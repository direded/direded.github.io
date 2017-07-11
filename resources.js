resources.img.load("src/bullet.png", "bullet");
resources.img.load("src/ply_model.png", "p_ship_1");
resources.img.load("src/back.gif","background");
resources.img.onReady(game.start);
resources.img.onReady(function(){
		resources.sprites.add(resources.img.get("p_ship_1"), "ship", undefined, new Point(60, 70));
		resources.sprites.add(resources.img.get("bullet"), "bullet", undefined, new Point(32, 48));
	});
resources.img.onReady(test_func);

resources.sound.load("src/audio/pew.wav", "pew_1");

resources.music.load("https://cs5-4v4.vk-cdn.net/p26/98518656611b03.mp3?extra=UIDWEO9-FQfgMdO48YTDIQ2tAGzVr1NfC19r8COGjmuiDevIMUfui1wFI0BT2Qwsz44Q5o7bCTAeWmci4wtMsV8Z9eRhf_ax5hNxMiC7zc1vp25ApRAAqzJTbw1vu_ppqo-wTOY7IQ", "shooting_stars");

(function() {

	let sounds = {};
	let audio = '';
	let allVol = 0.5;

	function load(url, name) {
		sounds[name] = url;
	};

	function play(name, vol) {
		let audio = new Audio();
		audio.src = sounds[name];
		audio.volume = vol * allVol;
		audio.play();
	};

	function overallVolume(vol) {
		for (a in sounds){
			sounds[a].volume = sounds[a].volume / allVol * vol;
		}
		allVol = vol;
	}

	window.resources = window.resources || {};
	window.resources.sound = {
		load: load,
		play: play,
		overallVolume: overallVolume,
	};
})();

(function() {

	let musics = {};
	let audio = '';
	let allVol = 0.5;

	function load(url, name, vol) {
		let audio = new Audio();
		audio.src = url;
		musics[name] = audio;
	};

	function play(name, vol, loop) {
		audio = musics[name];
		audio.volume = vol * allVol;
		audio.loop = loop;
		audio.play();
	};

	function pause(name){
		audio = musics[name];
		audio.pause();
	};

	function volume(name, vol) {
		musics[name].volume = vol * allVol;
	};

	function overallVolume(vol){
		for (a in musics){
			musics[a].volume = musics[a].volume / allVol * vol;
		}
		allVol = vol;
	}

	function stopAll() {
		console.log(musics);
		for (a in musics){
			musics[a].pause();
			musics[a].currentTime = 0;
		}
	}

	window.resources = window.resources || {};
	window.resources.music = {
		load: load,
		play: play,
		volume: volume,
		pause: pause,
		overallVolume: overallVolume,
		stopAll: stopAll,
	};
})();

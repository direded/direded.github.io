(function() {

	let sounds = {};
	let audio = '';

	function load(url, name) {
		sounds[name] = url;
  };

	function play(name, vol) {
		let audio = new Audio();
		audio.src = sounds[name];
		audio.volume = vol;
		audio.play();
	};

  window.resources = window.resources || {};
  window.resources.sound = {
        load: load,
				play: play,
      };
})();

(function() {

	let musics = {};
	let audio = '';

	function load(url, name, vol) {
		let audio = new Audio();
		audio.src = url;
		musics[name] = audio;
	};

	function play(name, vol) {
		audio = musics[name];
		audio.volume = vol;
		audio.play();
	}

	function volume(name, vol) {
		musics[name].volume = vol;
	}

	window.resources = window.resources || {};
  window.resources.music = {
        load: load,
				play: play,
				volume: volume
      };
})();

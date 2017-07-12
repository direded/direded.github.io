let playerHandleInput = function(plr, keySet) {
	let isKeyDown = function(e) {
		switch (e.code) {
			case keySet.up:
				plr.control.up(true);
				break;
			case keySet.down:
				plr.control.down(true);
				break;
			case keySet.left:
				plr.control.left(true);
				break;
			case keySet.right:
				plr.control.right(true);
				break;
			case keySet.attack:
				plr.control.attack(true);
				break;
		}
	}

	let isKeyUp = function(e) {
		switch (e.code) {
			case keySet.up:
				plr.control.up(false);
				break;
			case keySet.down:
				plr.control.down(false);
				break;
			case keySet.left:
				plr.control.left(false);
				break;
			case keySet.right:
				plr.control.right(false);
				break;
			case keySet.attack:
				plr.control.attack(false);
				break;
		}
	}
	window.addEventListener("keydown", isKeyDown, false);
	window.addEventListener("keyup", isKeyUp, false);
	return {

		isKeyDown: isKeyDown,
		isKeyUp: isKeyUp,
	};
}

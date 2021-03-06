let Menu = function() {
	this.createMainMenu();
	this.createPauseMenu();
	this.createDeathMenu();
	this.createWinMenu();
	this.createTitle();
	this.createHelpMenu();

	let temp = this;
	window.addEventListener("resize", function(){
			temp.resize();
		}, false);
	this.resize();
}
//Main menu
Menu.prototype.createMainMenu = function(){
	let menuMain = document.createElement('div');
	let content = document.createElement('div');
	let menuTitle = document.createElement('div');
	let player1 = document.createElement('div');
	let player2 = document.createElement('div');
	let help = document.createElement('div');

	player1.onclick = function(){
			game.setPlayersCount(1);
			game.setState("start");
		};

	player2.onclick = function(){
			game.setPlayersCount(2);
			game.setState("start");
		};

	menuMain.setAttribute("class", "menuMain");
	content.setAttribute("class", "content");
	menuTitle.setAttribute("class", "title");
	player1.setAttribute("class","button");
	player2.setAttribute("class","button");
	help.setAttribute("class","button");

	menuTitle.textContent = "FEFU INVADERS";
	player1.textContent = "1 PLAYER";
	player2.textContent = "2 PLAYERS";
	help.textContent = "HELP"
	let t = this;
	help.onclick = function(){
		t.displayHelpMenu(true);
		t.displayMainMenu(false);
	}

	document.body.appendChild(menuMain);
	menuMain.appendChild(content);
	content.appendChild(player1);
	content.appendChild(player2);
	content.appendChild(help);
	content.appendChild(menuTitle);

}

Menu.prototype.displayMainMenu = function(show) {
	let menu = document.body.querySelector("div.menuMain");
	if (show) {
		menu.style.display = 'block';
	} else {
		menu.style.display = 'none';
	}
}

//Pause menu
Menu.prototype.createPauseMenu = function() {
	let menuPause = document.createElement('div');
	let content = document.createElement('div');
	let resume = document.createElement('div');
	let menu = document.createElement('div');

	menuPause.setAttribute("class", "menuPause");
	content.setAttribute("class", "content");
	resume.setAttribute("class", "button");
	menu.setAttribute("class", "button");

	resume.onclick = function(){
		game.setState("resume");
	};

	menu.onclick = function(){
		game.setState("menu");
	};

	document.body.appendChild(menuPause);
	menuPause.appendChild(content);
	content.appendChild(resume);
	content.appendChild(menu);

	resume.textContent = "RESUME";
	menu.textContent = "MENU";
}

Menu.prototype.displayPauseMenu = function(show) {
	let menu = document.body.querySelector("div.menuPause");
	if (show) {
		menu.style.display = 'block';
	} else {
		menu.style.display = 'none';
	}
}

//Death menu
Menu.prototype.createDeathMenu = function() {
	let menuDeath = document.createElement('div');
	let content = document.createElement('div');
	let score = document.createElement('div');
	let title = document.createElement('div');
	let restart = document.createElement('div');
	let menu = document.createElement('div');

	menuDeath.setAttribute("class", "menuDeath");
	content.setAttribute("class", "content");
	score.setAttribute("class", "score");
	title.setAttribute("class", "title");
	restart.setAttribute("class", "button");
	menu.setAttribute("class", "button");

	restart.onclick = function(){
		game.setState("start");
	}

	menu.onclick = function(){
		game.setState("menu");
	}

	document.body.appendChild(menuDeath);
	menuDeath.appendChild(content);
	content.appendChild(score);
	content.appendChild(title);
	content.appendChild(restart);
	content.appendChild(menu);

	title.textContent = "YOU LOST"
	restart.textContent = "RESTART";
	menu.textContent = "MENU";

}

Menu.prototype.displayDeathMenu = function(show) {
	let menu = document.body.querySelector("div.menuDeath");
	if (show) {
		menu.style.display = 'block';
	} else {
		menu.style.display = 'none';
	}
}

//Win menu
Menu.prototype.createWinMenu = function() {
	let menuWin = document.createElement('div');
	let content = document.createElement('div');
	let title = document.createElement('div');
	let score = document.createElement('div');
	let restart = document.createElement('div');
	let menu = document.createElement('div');

	menuWin.setAttribute("class", "menuWin");
	content.setAttribute("class", "content");
	title.setAttribute("class", "title");
	score.setAttribute("class", "score");
	restart.setAttribute("class", "button");
	menu.setAttribute("class", "button");

	restart.onclick = function(){
		game.setState("start");
	}

	menu.onclick = function(){
		game.setState("menu");
	}


	document.body.appendChild(menuWin);
	menuWin.appendChild(content);
	content.appendChild(score);
	content.appendChild(title);
	content.appendChild(restart);
	content.appendChild(menu);

	title.textContent = "YOU WIN!";
	menu.textContent = "MENU";
}

Menu.prototype.displayWinMenu = function(show) {
	let menu = document.body.querySelector("div.menuWin");
	if (show) {
		menu.style.display = 'block';
	} else {
		menu.style.display = 'none';
	}
}

//Udate score
Menu.prototype.updateScore = function(score) {
	let scr = document.body.querySelectorAll("div.score");
	for (var i = 0; i < scr.length; i++) {
		scr[i].textContent = "SCORE: " + score;
	}
}

//Title
Menu.prototype.createTitle = function() {
	let title = document.createElement('div');
	document.body.appendChild(title);
	title.setAttribute("class", "mainTitle");
}

Menu.prototype.displayTitle = function(show, content) {
	let title = document.body.querySelector("div.mainTitle");
	if (show) {
		title.style.display = "block";
	} else {
		title.style.display = "none";
	}
	if (content) title.textContent = content;
	this.resize();
}

//Help menu
Menu.prototype.createHelpMenu = function() {
	let menuHelp = document.createElement('div');
	let move = document.createElement('div');
	let shot = document.createElement('div');
	let back = document.createElement('div');


	menuHelp.setAttribute("class", "menuHelp");
	move.setAttribute("class", "moveShot");
	shot.setAttribute("class", "moveShot");
	back.setAttribute("class", "back");

	document.body.appendChild(menuHelp);
	menuHelp.appendChild(move);
	menuHelp.appendChild(shot);
	menuHelp.appendChild(back);

	let t = this;
	back.onclick = function(){
		t.displayHelpMenu(false);
		t.displayMainMenu(true);
	}

	move.textContent = "Player 1\n[W A S D]\n[SPACE]";
	shot.textContent = "Player 2\n[UP DOWN LEFT RIGHT]\n[/]";
	back.textContent = "BACK"
	this.resize();
}

Menu.prototype.displayHelpMenu = function(show) {
	let menu = document.body.querySelector("div.menuHelp");
	if (show) {
		menu.style.display = 'block';
	} else {
		menu.style.display = 'none';
	}
}

//Resize menus
Menu.prototype.resize = function() {
	let menus = document.body.querySelectorAll("div.menuPause, div.menuMain, div.menuDeath, div.menuWin, div.menuHelp");

	let mainTitle = document.body.querySelector("div.mainTitle");
	mainTitle.style.fontSize = canvas.height * 0.06 + "px";
	let width = parseInt(mainTitle.clientWidth),
		height = parseInt(mainTitle.clientHeight);
	mainTitle.style.width = canvas.width;
	mainTitle.style.left = parseInt(canvas.style.left) + canvas.width * 0.5 - width * 0.5;
	mainTitle.style.top = parseInt(canvas.style.top) + canvas.height * 0.3 - height * 0.5;

	for (var i = 0; i < menus.length; i++) {
		let w = canvas.width;
		let h = canvas.height;

		menus[i].style.width = w;
		menus[i].style.height = h;
		menus[i].style.top = canvas.style.top;
		menus[i].style.left = canvas.style.left;

		let content = menus[i].querySelector("div.content");
		if (content != null){
			content.style.width = w * 0.5;
			content.style.height = h * 0.8;
			content.style.left = w * 0.25;
			content.style.top = h * 0.25 * 0.4;
			w = parseInt(content.style.width);
			h = parseInt(content.style.height);
		}

		let score = menus[i].querySelector("div.score");
		if (score != null){
			score.style.fontSize = w * 0.08;
			score.style.width = w * 0.8;
			score.style.height = h * 0.13;
			score.style.left = w * 0.25 * 0.4;
			score.style.top = h * 0.1 * 2;
		}

		let move = menus[i].querySelectorAll("div.moveShot");
		if (move.length != 0) {
			let width = parseInt(move[0].clientWidth),
				height = parseInt(move[0].clientHeight);
			move[0].style.fontSize = canvas.height * 0.04 + "px";
			move[0].style.width = canvas.width;
			move[0].style.top = h * 0.2 * 0.5;// - height;
			width = parseInt(move[1].clientWidth);
			height = parseInt(move[1].clientHeight);
			move[1].style.fontSize = canvas.height * 0.04 + "px";
			move[1].style.width = canvas.width;
			move[1].style.top = h * 0.2 * 2; //*(1+1) - height * 0.5;
		}

		let back = menus[i].querySelector("div.back");
		if (back != null){
			back.style.fontSize = canvas.height * 0.04 + "px";
			back.style.width = w * 0.8;
			back.style.height = h * 0.13;
			back.style.left = w * 0.25 * 0.4;
			back.style.top = h * 0.2 * 4;
		}

		let buttons = menus[i].querySelectorAll("div.button");
		if (buttons.length != 0){
			buttons[0].style.width = w * 0.6;
			buttons[0].style.height = h * 0.09;
			buttons[0].style.left = w * 0.2;
			buttons[0].style.top = 0.4*h;
			buttons[0].style.fontSize = w * 0.06;
				for (let j = 1; j < buttons.length; j++) {
					buttons[j].style.fontSize = w * 0.06;
					buttons[j].style.width = w * 0.6;
					buttons[j].style.height = h * 0.09;
					buttons[j].style.left = w * 0.2;
					buttons[j].style.top = (parseInt(buttons[0].style.top))+ j*h * 0.15;
			}
		}

		let menuTitle = menus[i].querySelector("div.title");
		if (menuTitle != null){
			menuTitle.style.fontSize = w * 0.08;
			menuTitle.style.width = w * 0.8;
			menuTitle.style.height = h * 0.2;
			menuTitle.style.left = w * 0.25 * 0.4;
			menuTitle.style.top = h * 0.1;
		}
	}
}

Menu.prototype.hideAll = function(){
	this.displayWinMenu(false);
	this.displayMainMenu(false);
	this.displayDeathMenu(false);
	this.displayPauseMenu(false);
	this.displayTitle(false);
}

let HUD = function(){
	this.sprite = resources.sprites.get("heart");
 }

HUD.prototype.renderText = function(){
	let fontSize = 40 * canvas.width / 1920;
	context.font = 'Bold ' + fontSize + 'px \'Press Start 2P\'';
	context.fillStyle = "white";
	let text = String(game.getScore());
	context.fillText(text, canvas.width / 2 - context.measureText(text).width / 2, canvas.height * 0.03 + this.sprite.origin.y * canvas.height / 1080);
}

HUD.prototype.renderPlr1 = function(){
	for (let i = 1; i <= game.players()[0].health; i++) {
		this.sprite.render(context, new Point(i * 50 + this.sprite.origin.x, 25 + this.sprite.origin.y));
	}
}

HUD.prototype.renderPlr2 = function(){
	for (let i = 1; i <= game.players()[1].health; i++){
		this.sprite.render(context, new Point(game.border.x - i * 50 - this.sprite.origin.x, 25 + this.sprite.origin.y));
	}
}

HUD.prototype.render = function(){
	this.renderPlr1();
	if (game.getPlayersCount() == 2)
		this.renderPlr2();
	this.renderText();
}

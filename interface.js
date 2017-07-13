let Menu = function() {
}
//Main menu
Menu.prototype.createMainMenu = function(){
	let menuMain = document.createElement('div');
	let content = document.createElement('div');
	let menuTitle = document.createElement('div');
	let player1 = document.createElement('div');
	let player2 = document.createElement('div');
	let settings = document.createElement('div');

	menuMain.setAttribute("class", "menuMain");
	content.setAttribute("class", "content");
	menuTitle.setAttribute("class", "title");
	player1.setAttribute("class","button");
	player2.setAttribute("class","button");
	settings.setAttribute("class","button");

	menuTitle.textContent = "SPACE SHOOTER";
	player1.textContent = "1 PLAYER";
	player2.textContent = "2 PLAYERS";
	settings.textContent = "SETTINGS"

	document.body.appendChild(menuMain);
	menuMain.appendChild(content);
	content.appendChild(player1);
	content.appendChild(player2);
	content.appendChild(settings);
	content.appendChild(menuTitle);

	let temp = this;
	window.addEventListener("resize", function(){
			temp.resize();
		}, false);
	this.resize();
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

	menuPause.setAttribute("class", "menuPause");
	content.setAttribute("class", "content");
	resume.setAttribute("class", "button");

	document.body.appendChild(menuPause);
	menuPause.appendChild(content);
	content.appendChild(resume);

	resume.textContent = "RESUME";

	let temp = this;
	window.addEventListener("resize", function(){
			temp.resize();
		}, false);
	this.resize();
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


	document.body.appendChild(menuDeath);
	menuDeath.appendChild(content);
	content.appendChild(score);
	content.appendChild(title);
	content.appendChild(restart);
	content.appendChild(menu);

	title.textContent = "YOU LOST"
	restart.textContent = "RESTART";
	menu.textContent = "MENU";

	let temp = this;
	window.addEventListener("resize", function(){
			temp.resize();
		}, false);
	this.resize();
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


	document.body.appendChild(menuWin);
	menuWin.appendChild(content);
	content.appendChild(score);
	content.appendChild(title);
	content.appendChild(restart);
	content.appendChild(menu);

	title.textContent = "YOU WIN!";
	menu.textContent = "MENU";

	let temp = this;
	window.addEventListener("resize", function(){
			temp.resize();
		}, false);
	this.resize();
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
//Resize menus
Menu.prototype.resize = function() {
	let menus = document.body.querySelectorAll("div.menuPause, div.menuMain, div.menuDeath, div.menuWin");
	for (var i = 0; i < menus.length; i++) {
		let w = canvas.width;
		let h = canvas.height;

		menus[i].style.width = w;
		menus[i].style.height = h;
		menus[i].style.top = canvas.style.top;
		menus[i].style.left = canvas.style.left;


		let content = menus[i].querySelector("div.content");
		content.style.width = w * 0.5;
		content.style.height = h * 0.8;
		content.style.left = w * 0.25;
		content.style.top = h * 0.25 * 0.4;

		w = parseInt(content.style.width);
		h = parseInt(content.style.height);

		let score = menus[i].querySelector("div.score");
		if (score != null){
			score.style.fontSize = w * 0.08;
			score.style.width = w * 0.8;
			score.style.height = h * 0.13;
			score.style.left = w * 0.25 * 0.4;
			score.style.top = h * 0.1 * 2;
		}

		let buttons = menus[i].querySelectorAll("div.button");
		buttons[0].style.width = w * 0.6;
		buttons[0].style.height = h * 0.09;
		buttons[0].style.left = w * 0.2;
		buttons[0].style.top = 0.4*h;
		buttons[0].style.fontSize = w * 0.06;
			for (var j = 1; j<buttons.length; j++) {
				buttons[j].style.fontSize = w * 0.06;
				buttons[j].style.width = w * 0.6;
				buttons[j].style.height = h * 0.09;
				buttons[j].style.left = w * 0.2;
				buttons[j].style.top = (parseInt(buttons[0].style.top))+ j*h * 0.15;
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

// let Menu  = function() {
// 	this.block = document.createElement('div');
// 	this.blockWidth = 0;
// 	this.blockHeight = 0;
//
// 	this.pw = 0;
// 	this.ph = 0;
// 	this.pBtnw = 0;
// 	this.pBtnh = 0;
// 	this.pBFone = 0;
// 	this.pMarTop = 0;
//
// 	this.caption = null;
//
// 	this.btns = [];
// 	this.btnOffset = 0;
// 	this.sizeBtn = new Point(0, 0);
// 	this.countBtn = 0;
// 	this.startOffset = 0;
// }
//
// Menu.prototype.createMenu = function(pw, ph, pBtnw, pBtnh, pBFone){
// 	this.block.setAttribute("class","menu");
// 	this.pw = pw;
// 	this.ph = ph;
// 	this.pBtnh = pBtnh;
// 	this.pBtnw = pBtnw;
// 	this.pBFone = pBFone;
// 	this.menuResize();
// 	document.body.appendChild(this.block);
// }
//
// Menu.prototype.menuResize = function() {
// 	this.block.style.width = canvas.getAttribute("width") * this.pw;
// 	this.blockWidth = parseInt(this.block.style.width);
// 	this.block.style.height =  this.blockWidth * this.ph;
// 	this.blockHeight = parseInt(this.block.style.height);
//
// 	this.block.style.top = parseInt(canvas.style.top) + canvas.getAttribute('height') * 0.5 - this.blockHeight * 0.5;
// 	this.block.style.left =  parseInt(canvas.style.left)  + canvas.getAttribute('width') * 0.5 - this.blockWidth * 0.5;
//
// 	this.sizeBtn = new Point(this.blockWidth * this.pBtnw, this.blockWidth * this.pBtnh);
// }
//
// Menu.prototype.createButton = function(name, text){
//
// 	this.btns.push(document.createElement('button'));
// 	this.countBtn++;
// 	this.btns[this.countBtn - 1].setAttribute("class", name);
// 	this.btns[this.countBtn - 1].name = name;
//
//
// 	this.btns[this.countBtn - 1].innerHTML = text;
//
// 	this.block.appendChild(this.btns[this.countBtn - 1]);
// }
//
// Menu.prototype.buttonResize = function(i){
//
// 	this.btnOffset = (this.blockHeight - this.countBtn * this.sizeBtn.y - this.startOffset) / (this.countBtn + 1);
//
// 	this.btns[i].style.width = this.sizeBtn.x;
// 	this.btns[i].style.height = this.sizeBtn.y;
// 	this.btns[i].style.left = (this.blockWidth - this.sizeBtn.x) * 0.5;
//
// 	this.btns[i].style.fontSize = this.sizeBtn.y * this.pBFone;
//
// 	if (i === 0) {
// 		this.btns[0].style.top = this.startOffset + this.btnOffset;
// 	}
// 	else {
// 		this.btns[i].style.top = parseInt(this.btns[i - 1].style.top) + this.sizeBtn.y +  this.btnOffset;
// 	}
// }
//
// Menu.prototype.createTextNode = function(text, pMarTop, pTFone){
// 	this.caption = document.createElement('div');
// 	this.caption.innerHTML = text;
// 	this.caption.setAttribute("class", "caption");
// 	this.pMarTop = pMarTop;
// 	this.pTFone = pTFone
// 	this.block.appendChild(this.caption);
// }
//
// Menu.prototype.textResize = function() {
// 	this.caption.style.marginTop = this.blockHeight * this.pMarTop;
// 	this.caption.style.fontSize = this.blockHeight * this.pTFone;
// 	this.startOffset += 2 * parseInt(this.caption.style.marginTop);
// }
//
// Menu.prototype.resize = function() {
// 	this.menuResize();
// 	if (this.caption != null) {
// 		this.textResize()
// 	}
// 	for (let i = 0; i < this.countBtn; i++) {
// 		this.buttonResize(i);
// 	}
// }
//
// Menu.prototype.createMainMenu = function(){
// 	this.createMenu(0.4, 1, 0.6, 0.2, 0.35);
// 	this.createTextNode("Start", 0.05, 0.1);
// 	this.createButton("start", "START");
// 	this.createButton("start", "SETTING");
// 	this.resize();
// }
//
//
// Menu.prototype.createPauseMenu = function(){
// 	this.createMenu(0.4, 1, 0.6, 0.2, 0.3);
// 	this.createTextNode("Pause", 0.05, 0.1);
// 	this.createButton("pause", "RESUME");
// 	this.createButton("pause", "RESTART");
// 	this.resize();
// }
//
// Menu.prototype.createFinishMenu = function(text){
// 	this.createMenu(0.33, 1.2, 0.6, 0.3, 0.35);
// 	this.createTextNode(text, 0.07, 0.1);
// 	this.createButton("restart", "RESTART");
// 	this.resize();
// }
//
// Menu.prototype.remove = function(){
// 	if (this.caption != null) {
// 		this.block.removeChild(this.caption);
// 	}
// 	for (let i = 0; i < this.counyBtn; i++){
// 		this.block.removeChild(this.btns[i]);
// 	}
// 	document.body.removeChild(this.block);
// }

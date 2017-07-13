/*var Menu  = function() {
	this.block = document.createElement('div');
	this.blockWidth = 0;
	this.blockHeight = 0;

	this.pw = 0;
	this.ph = 0;
	this.pBtnw = 0;
	this.pBtnh = 0;
	this.pBFone = 0;
	this.pMarTop = 0;

	this.caption = null;

	this.btns = [];
	this.btnOffset = 0;
	this.sizeBtn = new Point(0, 0);
	this.countBtn = 0;
	this.startOffset = 0;
}

Menu.prototype.createMenu = function(pw, ph, pBtnw, pBtnh, pBFone){
	this.block.setAttribute("class","menu");
	this.pw = pw;
	this.ph = ph;
	this.pBtnh = pBtnh;
	this.pBtnw = pBtnw;
	this.pBFone = pBFone;
	this.menuResize();
	document.body.appendChild(this.block);
}

Menu.prototype.menuResize = function() {
	this.block.style.width = canvas.getAttribute("width") * this.pw;
	this.blockWidth = parseInt(this.block.style.width);
	this.block.style.height =  this.blockWidth * this.ph;
	this.blockHeight = parseInt(this.block.style.height);

	this.block.style.top = parseInt(canvas.style.top) + canvas.getAttribute('height') * 0.5 - this.blockHeight * 0.5;
	this.block.style.left =  parseInt(canvas.style.left)  + canvas.getAttribute('width') * 0.5 - this.blockWidth * 0.5;

	this.sizeBtn = new Point(this.blockWidth * this.pBtnw, this.blockWidth * this.pBtnh);
}

Menu.prototype.createButton = function(name, text){

	this.btns.push(document.createElement('button'));
	this.countBtn++;
	this.btns[this.countBtn - 1].setAttribute("class", name);
	this.btns[this.countBtn - 1].name = name;


	this.btns[this.countBtn - 1].innerHTML = text;

	this.block.appendChild(this.btns[this.countBtn - 1]);
}

Menu.prototype.buttonResize = function(i){

	this.btnOffset = (this.blockHeight - this.countBtn * this.sizeBtn.y - this.startOffset) / (this.countBtn + 1);

	this.btns[i].style.width = this.sizeBtn.x;
	this.btns[i].style.height = this.sizeBtn.y;
	this.btns[i].style.left = (this.blockWidth - this.sizeBtn.x) * 0.5;

	this.btns[i].style.fontSize = this.sizeBtn.y * this.pBFone;

	if (i === 0) {
		this.btns[0].style.top = this.startOffset + this.btnOffset;
	}
	else {
		this.btns[i].style.top = parseInt(this.btns[i - 1].style.top) + this.sizeBtn.y +  this.btnOffset;
	}
}

Menu.prototype.createTextNode = function(text, pMarTop, pTFone){
	this.caption = document.createElement('div');
	this.caption.innerHTML = text;
	this.caption.setAttribute("class", "caption");
	this.pMarTop = pMarTop;
	this.pTFone = pTFone
	this.block.appendChild(this.caption);
}

Menu.prototype.textResize = function() {
	this.caption.style.marginTop = this.blockHeight * this.pMarTop;
	this.caption.style.fontSize = this.blockHeight * this.pTFone;
	this.startOffset += 2 * parseInt(this.caption.style.marginTop);
}

Menu.prototype.resize = function() {
	this.menuResize();
	if (this.caption != null) {
		this.textResize()
	}
	for (let i = 0; i < this.countBtn; i++) {
		this.buttonResize(i);
	}
}

Menu.prototype.createMainMenu = function(){
	this.createMenu(0.33, 1.2, 0.6, 0.2, 0.35);
	this.createTextNode("Start", 0.05, 0.1);
	this.createButton("start", "START");
	this.createButton("start", "SETTING");
	this.resize();
}


Menu.prototype.createPauseMenu = function(){
	this.createMenu(0.33, 1.2, 0.6, 0.2, 0.3);
	this.createTextNode("Pause", 0.05, 0.1);
	this.createButton("pause", "RESUME");
	this.createButton("pause", "RESTART");
	this.resize();
}

Menu.prototype.createFinishMenu = function(text){
	this.createMenu(0.33, 1.2, 0.6, 0.3, 0.35);
	this.createTextNode(text, 0.07, 0.1);
	this.createButton("restart", "RESTART");
	this.resize();
}

Menu.prototype.remove = function(){
	if (this.caption != null) {
		this.block.removeChild(this.caption);
	}
	for (let i = 0; i < this.counyBtn; i++){
		this.block.removeChild(this.btns[i]);
	}
	document.body.removeChild(this.block);
}*/

const app = new PIXI.Application(800, 600, { backgroundColor: 0xDCEDC8, antialias: true })
app.view.style.visibility = "hidden"

document.body.appendChild(app.view)
window.onresize = function () {
	app.view.style.position = 'absolute'
	app.view.style.left = (this.innerWidth - app.screen.width) / 2 + 'px'
	app.view.style.top = (this.innerHeight - app.screen.height) / 2 + 'px'
}

document.addEventListener("DOMContentLoaded", function (event) {
	app.view.oncontextmenu = event => {
		event.preventDefault();
	}	
})

window.onload = function() {
	window.onresize()
	app.view.style.visibility = "visible"

	// on document ready
	// app.view.oncontextmenu = event => event.preventDefault()
}

// Log

let Log = {
	info: function(msg) {
		console.log(`[INFO] ${msg}`)
	},
	error: function (msg) {
		console.log(`[INFO] ${msg}`)
	},
	warn: function (msg) {
		console.log(`[INFO] ${msg}`)
	},
	debug: function (msg) {
		console.log(`[DEBUG] ${msg}`)
	},
}

// Entity class

let Entity = function() {
	this.position = new Vector()
	this.rotation = 0
	this.rotationSpeed = null
	this.rotateTo
	this.moveSpeed = 0
	this.moveTo_target = null
	let obj = this
	app.ticker.add(function(delta) {
		obj.onTick(delta)
	})
}

Entity.prototype.setPos = function(vec) {
	this.position.set(vec)
	this.sprite.position.set(vec.x, vec.y)
}

Entity.prototype.setRotation = function(ang) {
	this.rotation = ang
	this.sprite.rotation = ang
}

Entity.prototype.setSprite = function(sprite) {
	this.sprite = sprite
	this.sprite.position.set(this.position.x, this.position.y)
}

Entity.prototype.spawn = function() {
	app.stage.addChild(this.sprite)
}

Entity.prototype.rotateTo = function(ang) {
	if (this.rotationSpeed != null) {
		this.rotateTo_target = ang
	} else {
		this.setRotation(ang)
	}
}

Entity.prototype.moveTo = function(vec) {
	this.moveTo_target = new Vector(vec)
}

Entity.prototype.onTick = function(delta) {
	if (this.moveTo_target != null && this.moveSpeed != 0) {
		let distance = this.moveTo_target.subtract(this.position)
		this.rotateTo(distance.toAngle2d())
		let length = distance.length()
		let path = Math.min(this.moveSpeed * delta, length)
		let velocity = distance.unit().multiply(this.moveSpeed * delta)
		this.setPos(this.position.add(velocity))
		if (length - path < Math.pow(5, 2)) // 0.5 is eps 
			this.moveTo_target = null
	}

	if (this.rotateTo_target != null && this.rotationSpeed != 0) {
		let target = this.rotateTo_target + Math.PI
		let current = this.rotation + Math.PI
		
		let ang = target - current
		if (ang > Math.PI) ang = ang - Math.PI * 2
		if (ang < -Math.PI) ang = Math.PI * 2 + ang
		let path = Math.sign(ang) * Math.min(this.rotationSpeed * delta, Math.abs(ang))
		this.setRotation(this.rotation + path)
		
	}
}

// Player class

let Player = function() { // entObj: pos
	Entity.call(this)
	this.rotationSpeed = Math.PI * 0.075
	this.moveSpeed = 5
} 

Player.prototype = Object.create(Entity.prototype)

let playableEntity = null

// Input
app.stage.interactive = true
app.stage.on('mousedown', function(event) {
	if (playableEntity == null) return
	playableEntity.moveTo(event.data.getLocalPosition(app.stage))
})

// Graphics 

let graphics = new PIXI.Graphics()
graphics.beginFill(0xFF3300, 0)
	.lineStyle(8, 0x795548, 1)
	.drawRect(0, 0, app.screen.width, app.screen.height)

graphics.lineStyle(2, 0x0000FF, 1)

app.stage.addChild(graphics)

// Game

function startGame(resources) {
	Log.info('Game starting...')
	let sprite = new PIXI.Sprite(resources.player.texture)
	sprite.anchor.set(0.4, 0.5)
	sprite.scale = new PIXI.Point(2, 2)
	
	let player = new Player()
	player.setSprite(sprite)
	player.setPos(new Vector(100, 100))	
	player.spawn()
	playableEntity = player

}



PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

PIXI.loader
	.add('player', 'assets/player.png')
	.load(function(loader, resources) {
		Log.info('Resources initialized.')
		startGame(resources)
	})
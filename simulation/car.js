// Initial values: pos:{x:200, y:100}, v:{0,1}, a:{0,0}
var car = []

function init() {
	car = [{x:200, y:100}, {x:0, y:1}, {x:0, y:0}]
}

function outside() {
	// if not over gray -- Out of the road
}

function move() {
	var dx = car[1].x,
	    dy = car[1].y
	car[0].x += dx
	car[0].y += dy

	setTimeout(move, 10) // Game speed, cada 100ms executa move()
}

init()
move()
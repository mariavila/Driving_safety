// Initial values: pos:{x:200, y:100}, v:{0,1}, a:{0,0}, playing, in_roundabout, exit_roundabout
var car = []

function init() {
	car = [{x:200, y:100}, {x:0, y:1}, {x:0, y:0}, true, false, false]
}


function move() {
	if (car[3]) {
		var dx = car[1].x,
		    dy = car[1].y
		car[0].x += dx
		car[0].y += dy
		if (car[5]) {
			car[5] = false
			if (car[1].x == -4) car[1].x = -1
			if (car[1].x == 4) car[1].x = 1
			if (car[1].y == -4) car[1].y = -1
			if (car[1].y == 4) car[1].y = 1
		}
	}
	setTimeout(move, 20) // Game speed, cada 100ms executa move()
}

init()
move()

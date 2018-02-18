var uo = document.getElementById('screen')
var ctx = uo.getContext("2d")

function renderCar() {
	ctx.fillStyle = "#000000"
	ctx.fillRect(car[0].x, car[0].y, 7, 7)
}

function render() {
	ctx.clearRect(0, 0, uo.width, uo.height)
	var street_bg = new Image()
	street_bg.src = "../views/imgs/mapa3.jpg"
	//street_bg.onload = function() {
	ctx.drawImage(street_bg, 0, 0, 1200, 700)
	//}
	renderCar()
	setTimeout(render, 10)
}

// call the render function
render()
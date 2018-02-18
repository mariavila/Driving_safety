document.onkeydown = function(event) {
	var keys = {
		38: 'up',
		40: 'down',
		37: 'left',
		39: 'right'
	}
	// console.log(event.keyCode) // print the key code

	car[1].x = 0
	car[1].y = 0

	switch (keys[event.keyCode]) {
		case 'left':
			car[1].x = -1
			break
		case 'right':
			car[1].x = 1
			break
		case 'up':
			car[1].y = -1
			break
		case 'down':
			car[1].y = 1
			break
		default:
			return
	}
}
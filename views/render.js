var uo = document.getElementById('screen')
var ctx = uo.getContext("2d")

// Mapa de la simulacio
var street_bg = new Image()
street_bg.src = "./imgs/mapa3.jpg"

// Dibujar explosion, parte correspondiente
var spriteWidth=2048;
var spriteHeight = 1536;
var rows = 6;
var cols = 8;
var width = spriteWidth/cols;
var height = spriteHeight/rows;
var srcX = 0;
var srcY = 0;

// Explosion
var boom = new Image()
boom.src = "./imgs/explosion.png"
var exploding = false;

// Warrnings for crossroads, schools, hospitals and parcs
WC = false
WS = false
WH = false
WP = false

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function color_diff(hex1, hex2) {
    // get red/green/blue int values of hex1
    var r1 = parseInt(hex1.substring(0, 2), 16);
    var g1 = parseInt(hex1.substring(2, 4), 16);
    var b1 = parseInt(hex1.substring(4, 6), 16);
    // get red/green/blue int values of hex2
    var r2 = parseInt(hex2.substring(0, 2), 16);
    var g2 = parseInt(hex2.substring(2, 4), 16);
    var b2 = parseInt(hex2.substring(4, 6), 16);
    // calculate differences between reds, greens and blues
    var r = 255 - Math.abs(r1 - r2);
    var g = 255 - Math.abs(g1 - g2);
    var b = 255 - Math.abs(b1 - b2);
    // limit differences between 0 and 1
    // r /= 255;
    // g /= 255;
    // b /= 255;
    // 0 means opposit colors, 255 means same colors
    return (r + g + b) / 3;
}

function updateFrame() {
	srcX++;
	if (srcX == cols) {
		srcX = 0;
		srcY++;
		if (srcY == rows) {
			srcY = 0;
			exploding = false;
		}
	}
}

function draw() {
	if (exploding) {
		updateFrame();
		//console.log(srcX);
		//console.log(srcY);
		ctx.drawImage(boom, srcX*256, srcY*256, width, height, car[0].x - 64, car[0].y - 64, 100, 100);
	}
  else{
    window.location.href="accident.html";
  }
}

function outside() {
	// if not over gray -- Out of the road
	var place = ctx.getImageData(car[0].x, car[0].y, 1, 1).data
	var hex_place = ("000000" + rgbToHex(place[0], place[1], place[2])).slice(-6)
	// console.log("HEX: " + hex_place);
	// console.log("gray: " + color_diff(hex_place, 'dcdddd'));
	// console.log("white: " + color_diff(hex_place, 'fdfdfd'));
	if (color_diff(hex_place, 'dcdddd') < 230)
		if (color_diff(hex_place, 'fdfdfd') > 230) {
			console.log("You are out of the road!")
      var sound = document.getElementById("sound_out_road");
      sound.play();
		}
		else {
			console.log("CRASH")
			exploding = true
			setInterval(draw, 3)
			car[3] = false
      //window.location.href=".html";
		}

}

function in_risk() {
	var x = car[0].x
	var y = car[0].y
	if (700 < x && x < 900 && 270 < y && y < 460) {
		if (!WC) {
			console.log("You are aproaching a dangerous crossroad!")
			WC = true
      var sound = document.getElementById("sound_dangerous");
      sound.play();
		}
	}
	else WC = false
	if (525 < x && x < 695 && 310 < y && y < 480) {
		if (!WH) {
			console.log("Careful, a you are passing near a hospital!")
			WH = true
      var sound = document.getElementById("sound_hospital");
      sound.play();
		}
	}
	else WH = false
	if ((450 < x && x < 560 && 145 < y && y < 255) ||
		(170 < x && x < 270 && 375 < y && y < 480)) {
		if (!WE) {
			console.log("Slow down, a school is close.")
			WE = true
      var sound = document.getElementById("sound_school");
      sound.play();
		}
	}
	else WE = false
	if ((200 < x && x < 710 && 500 < y && y < 680) ||
		(340 < x && x < 520 && 440 < y)) {
		if (!WP) {
			console.log("Slow down, a parc is close.")
			WP = true
	      var sound = document.getElementById("sound_park");
	      sound.play();
		}
	}
	else WP = false

}

function abs(n) {
	if (n >= 0) return n
	else return -n
}

function in_rondabout() {
	if (!car[5] || x < 700 || y > 300) {
		var x = car[0].x
		var y = car[0].y
		var y_elipse = Math.sqrt(65*65 - 65*65/100/100 * (x - 765)*(x - 765)) + 95
		if (abs(y - 95) < abs(y_elipse - 95) +2 && (y > 95 || (y == 95 && x < 810))) {
			// Center Elispe: (765, 95)
			car[1].x = 0
			car[1].y = 0
			car[0].x = car[0].x + 1
			car[0].y = Math.sqrt(65*65 - 65*65/100/100 * (x +1 - 765)*(x +1 - 765)) + 95
			car[4] = true
		}
		if (abs(y - 95) < abs(y_elipse - 95) +2 && (y < 95 || (y == 95 && x > 810))) {
			// Center Elispe: (765, 95)
			car[1].x = 0
			car[1].y = 0
			car[0].x = car[0].x - 1
			car[0].y = - Math.sqrt(65*65 - 65*65/100/100 * (x -1 - 765)*(x -1 - 765)) + 95
			car[4] = true
		}
		//else car[4] = false
	}
}

function renderCar() {
	if (car[3]) {
		outside()
		in_risk()
		in_rondabout()
		ctx.fillStyle = "#000000"
		ctx.fillRect(car[0].x, car[0].y, 8, 8)
	}
}

function render() {
	if (!exploding) {
		ctx.clearRect(0, 0, uo.width, uo.height)
	//street_bg.onload = function() {
	    ctx.drawImage(street_bg, 0, 0, 1080, 630)
	}
	//}
	renderCar()
	setTimeout(render, 20)
}

// call the render function
render()

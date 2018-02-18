var uo = document.getElementById('screen')
var ctx = uo.getContext("2d")

// Mapa de la simulacio
var street_bg = new Image()
street_bg.src = "../views/imgs/mapa3.jpg"

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
boom.src = "../views/imgs/explosion.png"
var exploding = false;

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
		//ctx.clearRect(0, 0, uo.width, uo.height);
		//ctx.drawImage(street_bg, 0, 0, 1200, 700)
		console.log(srcX);
		console.log(srcY);
		ctx.drawImage(boom, srcX*256, srcY*256, width, height, car[0].x - 64, car[0].y - 64, 100, 100);
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
		}
		else {
			console.log("CRASH")
			exploding = true
			setInterval(draw, 10)
			car[3] = false
		}

}

function renderCar() {
	if (car[3]) {
		outside()
		ctx.fillStyle = "#000000"
		ctx.fillRect(car[0].x, car[0].y, 8, 8)
	}
}

function render() {
	ctx.clearRect(0, 0, uo.width, uo.height)
	//street_bg.onload = function() {
	ctx.drawImage(street_bg, 0, 0, 1200, 700)
	//}
	renderCar()
	setTimeout(render, 20)
}

// call the render function
render()
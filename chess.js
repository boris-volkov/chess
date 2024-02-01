
const canvas    = document.querySelector("#canvas");
let cell_width  = 64; // pixels on the display


let num_rows = 8;
let num_cols = 8;

let white = '#FFF';
let black = '#000';
const BOARD_COLOR = '#888888';
const WHITE_CONTROL = 'rgba(20, 100, 255, 0.3)';
const BLACK_CONTROL = 'rgba(255,20,100,0.3)';
const fontSize = 48;

let grid = new Array(num_rows);
for (let i = 0; i < num_rows; i++){
	grid[i] = new Array(num_cols);
	for (let j = 0; j < num_cols; j++)
		grid[i][j] = 0;
} 

canvas.height = grid.length * cell_width;
canvas.width = grid[0].length * cell_width;
const c = canvas.getContext("2d");
c.font = fontSize + 'px Arial';

let selected_piece = 0;

function square(row, col){
	if (row > 7 || row < 0 || col > 7 || col < 0) return;
	c.fillRect(col*cell_width, row*cell_width, cell_width, cell_width);
}

function inner_square(row, col){
	let border = 8;
	c.fillRect(col*cell_width + border, row*cell_width + border, 
		cell_width-2*border, cell_width-2*border);
}

function occupied(row, col){
	if (row > 7 || row < 0 || col > 7 || col < 0) return false;
	return grid[row][col] != 0;
}


class ChessPiece {
	constructor(color, row, col){
		this.color = color;
		this.row = row;
		this.col = col;
		if (this.color == white){
			this.fillStyle = WHITE_CONTROL;
		} else {
			this.fillStyle = BLACK_CONTROL;
		}
		grid[row][col] = this;
	}
}

class Knight extends ChessPiece {
	constructor (color, row, col){
		super (color, row, col);
		this.code = '\u265E';
	}
	light_squares(grid, row, col){
		let temp = c.fillStyle;
		c.fillStyle = this.fillStyle;
		let moves = [	[-2, -1],
			     	[-1, -2],
				[2, 1],
				[1, 2],
				[2, -1],
				[1, -2],
				[-2, 1],
				[-1, 2] ]
		for (let [x, y] of moves){
				square(row+y, col+x);
		}
		c.fillStyle = temp;				
	}	
}

class Bishop extends ChessPiece {
	constructor (color, row, col){
		super (color, row, col);
		this.code = '\u265D';
	}
	light_squares(grid, row, col){
		let temp = c.fillStyle;
		c.fillStyle = this.fillStyle;
		for (let x = 1; x < 8; x++){
			square(row+x, col+x);
			if (occupied(row+x,col+x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row-x, col+x);
			if (occupied(row-x,col+x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row+x, col-x);
			if (occupied(row+x,col-x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row-x, col-x);
			if (occupied(row-x,col-x)) break;
		}
		c.fillStyle = temp;				
	}
}

class Rook extends ChessPiece {
	constructor (color, row, col){
		super (color, row, col);
		this.code = '\u265C';
	}
	light_squares(grid, row, col){
		let temp = c.fillStyle;
		c.fillStyle = this.fillStyle;
		for (let x = 1; x < 8; x++){
			square(row, col+x);
			if (occupied(row,col+x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row-x, col);
			if (occupied(row-x,col)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row+x, col);
			if (occupied(row+x,col)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row, col-x);
			if (occupied(row,col-x)) break;
		}
		c.fillStyle = temp;				
	}
}

class Queen extends ChessPiece {
	constructor (color, row, col){
		super (color, row, col);
		this.code = '\u265B';
	}
	light_squares(grid, row, col){
		let temp = c.fillStyle;
		c.fillStyle = this.fillStyle;
		for (let x = 1; x < 8; x++){
			square(row, col+x);
			if (occupied(row,col+x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row-x, col);
			if (occupied(row-x,col)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row+x, col);
			if (occupied(row+x,col)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row, col-x);
			if (occupied(row,col-x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row+x, col+x);
			if (occupied(row+x,col+x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row-x, col+x);
			if (occupied(row-x,col+x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row+x, col-x);
			if (occupied(row+x,col-x)) break;
		}
		for (let x = 1; x < 8; x++){
			square(row-x, col-x);
			if (occupied(row-x,col-x)) break;
		}
		c.fillStyle = temp;				
	}
}

class Pawn extends ChessPiece{
	constructor (color, row, col){
		super (color, row, col);
		this.code = '\u265F';
	}
	light_squares(grid, row, col){
		let temp = c.fillStyle;
		c.fillStyle = this.fillStyle;
		if (this.color == white){
			square(row-1, col-1);
			square(row-1, col+1);
		} else {
			square(row+1, col-1);
			square(row+1, col+1);
		}

		c.fillStyle = temp;				
	}
}

class King extends ChessPiece{
	constructor (color, row, col){
		super (color, row, col);
		this.code = '\u265A';
	}

	light_squares(grid, row, col){
		let temp = c.fillStyle;
		c.fillStyle = this.fillStyle;
		square(row-1, col-1);
		square(row  , col-1);
		square(row+1, col-1);
		square(row+1, col);
		square(row-1, col);
		square(row-1, col+1);
		square(row , col+1);
		square(row+1, col+1);
		c.fillStyle = temp;				
	}
}
for (let col = 0; col < 8; col++) {
    const w_pawn = new Pawn(white, 6, col); // White Pawn
    const b_pawn = new Pawn(black, 1, col); // Black Pawn
}

const w_queen = new Queen(white, 7, 3); // Queen
const w_rook1 = new Rook(white, 7, 0); // Rook
const w_rook2 = new Rook(white, 7, 7); // Rook
const w_knight1 = new Knight(white, 7,1);
const w_knight2 = new Knight(white, 7, 6); // Knight
const w_bishop1 = new Bishop(white, 7, 2); // Bishop
const w_bishop2 = new Bishop(white, 7, 5); // Bishop
const w_king = new King(white, 7, 4); // King


const b_rook1 = new Rook(black, 0, 0); // Rook
const b_rook2 = new Rook(black, 0, 7); // Rook
const b_knight1 = new Knight(black, 0, 1); // Knight
const b_knight2 = new Knight(black, 0, 6); // Knight
const b_bishop1 = new Bishop(black, 0, 2); // Bishop
const b_bishop2 = new Bishop(black, 0, 5); // Bishop
const b_queen = new Queen(black, 0, 3); // Queen
const b_king = new King(black, 0, 4); // King


c.strokeStyle = "#567";
c.lineWidth = 2;
function stroke_grid() {
	for (let row = 0; row < grid.length; row++){
		c.beginPath();
		c.moveTo(0, row*cell_width);
		c.lineTo(canvas.width, row*cell_width);
		c.stroke(); 
	}
	for (let col = 0; col < grid[0].length; col++){
		c.beginPath();
		c.moveTo(col*cell_width, 0);
		c.lineTo(col*cell_width, canvas.height);
		c.stroke(); 
	}
}

function clear_canvas(){
	c.fillStyle = BOARD_COLOR;
	c.fillRect(0,0, canvas.width, canvas.height);
}

function grid_to_canvas() {
	clear_canvas();
	for (let row = 0; row < grid.length; row++){
		for (let col = 0; col < grid[0].length; col++){
			if (grid[row][col] != 0){
				let piece = grid[row][col];
				piece.light_squares(grid, row, col);
			}
		}
	}
	for (let row = 0; row < grid.length; row++){
		for (let col = 0; col < grid[0].length; col++){
			if (grid[row][col] != 0){
				let piece = grid[row][col];
				if (grid[row][col] === selected_piece){
					c.fillStyle = '#f22';
				} else {
					c.fillStyle = grid[row][col].color;
				}
				c.fillText(grid[row][col].code, col*cell_width + 8, (row)*cell_width + cell_width - 10);
			}
		}
	}

	
}

var keys_down = {
	'b': false, 	'w': false,  	'k': false, 	'n': false, 'p': false,
	'r': false,	'q': false, 	's': false,     'x': false, 'shift': false,
};

window.addEventListener('keydown', (event) => {
	let key = event.key.toLowerCase();
	if (event.key == "Escape"){
		for (let row = 0; row < grid.length; row++){
			for (let col = 0; col < grid[0].length; col++){
				grid[row][col] = 0;
			}
		}
		grid_to_canvas();
		stroke_grid();
	}

	if (event.key === 'Shift') {
        	event.preventDefault();
    	}

	if (keys_down.hasOwnProperty(key)){
		keys_down[key] = true;
		console.log(keys_down);
	}
});

window.addEventListener('keyup', (event) => {
	let key = event.key.toLowerCase();
	if (keys_down.hasOwnProperty(key))
		keys_down[key] = false;
});

canvas.onclick = (event) => {
	bb = canvas.getBoundingClientRect(); 
	let x = (event.clientX-bb.left)*(canvas.width/bb.width);
	let y = (event.clientY-bb.top)*(canvas.height/bb.height);
	let col = Math.floor(x/cell_width);
	let row = Math.floor(y/cell_width);
	if (keys_down['x']){
		grid[row][col] = 0;
		grid_to_canvas();
		stroke_grid();
		return;
	}
	if (selected_piece != 0){ // placing the piece
		console.log("placing", selected_piece);
		grid[row][col] = selected_piece;
		if (selected_piece.row != row || selected_piece.col != col){
			grid[selected_piece.row][selected_piece.col] = 0;
			selected_piece.row = row;
			selected_piece.col = col;
		}
		selected_piece = 0;
	} else { // select the piece at this position:
		selected_piece = grid[row][col];
		console.log("selected", selected_piece);
	}
	let color = white;
	if (keys_down['shift']){
		color = black;
	}
	if (keys_down['n']){
		let n = new Knight(color, row, col);
	}
	if (keys_down['b']){
		let n = new Bishop(color, row, col);
	}
	if (keys_down['r']){
		let n = new Rook(color, row, col);
	}
	if (keys_down['q']){
		let n = new Queen(color, row, col);
	}
	if (keys_down['k']){
		let n = new King(color, row, col);
	}
	if (keys_down['p']){
		let n = new Pawn(color, row, col);
	}
	grid_to_canvas();
	stroke_grid();
}

grid_to_canvas();
stroke_grid();




var slider = document.getElementById("myRange");
var output = document.getElementById("delayOutput");
output.innerHTML = `Delay: ${slider.value}ms`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = `Delay: ${this.value}ms`;
}

function toggleGridSquare(event){
	var thisGridSquare = this.childNodes[0];
	if(thisGridSquare.innerHTML == "0"){
		thisGridSquare.innerHTML = "1";
	}
	else{
		thisGridSquare.innerHTML = "0";
	}
}

function createGrid(){
	/*
	Creates the html elements for the grid
	*/
	container = document.getElementById("gridContainer");
	for(var i = 0; i < 36; i += 1){
		p = document.createElement("a");
		p.innerHTML = "_"
		p.className = "gridBoxText noselect"
		el = document.createElement("div");
		el.className = "gridBox"
		el.onclick = toggleGridSquare
		el.appendChild(p)
		container.appendChild(el)
	}
}


function getGrid(){
	/*
	Gets the numbers from the grid as a 2d array
	Reads black (Shown as underscores) as -1
	*/
	var grid = []
	var container = document.getElementById("gridContainer");
	var boxes = container.childNodes;
	for(var i = 0; i < boxes.length; i += 1){
		if(i%6 === 0){
			grid.push([])
		}
		if(boxes[i].innerText === "_"){
			grid[grid.length-1].push(-1)
		}else{
			grid[grid.length-1].push(parseInt(boxes[i].innerText))
		}
		
	}
	return grid
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

function checkBoard(board){
	maxNum = 3; // maximum number of each number to be in each row/col
	tooMany = (x) => x>maxNum;

	rowCounts = [0, 0]
	colCounts = [0, 0]

	// Counts how many 1's and 0's are in each row and coloumn of the board
	// Fails if there are more than maxNum of either in any row or col
	for(var i = 0; i < 6; i += 1){
		for(var j = 0; j < 6; j+= 1){

			if(board[j][i] != -1){
				rowCounts[ board[j][i] ] += 1
			}
			if(board[i][j] != -1){
				colCounts[ board[i][j] ] += 1
			}
		}
		if(rowCounts.some(tooMany) || colCounts.some(tooMany)){
			return false
		}
		rowCounts = [0, 0]
		colCounts = [0, 0]
	}

	isThree = (arr) => arraysEqual(arr, [0, 0, 0]) || arraysEqual(arr, [1, 1, 1]);
	// Checks if there is three of the same number in a line
	for(var i = 1; i < 5; i += 1){
		for(var j = 0; j < 6; j += 1){

			// gets the values for the grid squares on either side up and down of this one
			horiz = [ board[i-1][j], board[i][j], board[i+1][j] ];
			vert =  [ board[j][i-1], board[j][i], board[j][i+1] ];

			if(isThree(horiz) || isThree(vert)){
				return false
			}

		}
	}

	// Only check for uniqueness if the board is full
	for(var i = 0; i < 6; i += 1){
		for (var j = 0; j < 6; j += 1){
			if(board[i][j] == -1){
				return true
			}
		}
	}
	// Make sure every row and colomn is unique


	return true
}

function branch(){

}

function solve(){
	/*
	Solves the binary puzzle
	*/
	startGrid = getGrid();
	console.log(startGrid)
	console.log(checkBoard(startGrid))
}

createGrid()
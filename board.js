function Board() {

	var that = this;
	
	this.X
	this.Y
	this.size;
	this.cells;
	
	this.context;
	
	this.activeCell_i;
	this.activeCell_j;
	
	this.isBigBoard;
	this.i;
	this.j;
	this.alpha
	this.isEmpty;
	this.cellWinner;

	this.set = function(context, X, Y, size, isBigBoard) {

		that.X = X;
		that.Y = Y;
		that.size = size;
		that.isBigBoard = isBigBoard;
		that.activeCell_i = -1;
		that.activeCell_j = -1;
		that.isEmpty = true;
		that.cellWinner = "none";
		
		that.context = context;
		
		var smallCellFullSize = size / 3
		that.alpha = 0.1 * smallCellFullSize;
		var smallCellReducedSize = smallCellFullSize - 2 * that.alpha
	
		that.cells = new Array(3)
		for (i = 0; i < 3; i++)
			that.cells[i] = new Array(3)
		
		var zeroPosX = 0;
		var zeroPosY = 0;
		
		if (isBigBoard) {
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
				
					zeroPosX = that.alpha + X + smallCellFullSize * i
					zeroPosY = that.alpha + Y + smallCellFullSize * j
					var subBoard = new Board();
					
					subBoard.set(that.context, zeroPosX, zeroPosY, smallCellReducedSize, false)
					subBoard.i = i;
					subBoard.j = j;
					that.cells[i][j] = subBoard;
				}
			}
		}
		
		else {
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					zeroPosX = that.alpha + X + smallCellFullSize * i
					zeroPosY = that.alpha + Y + smallCellFullSize * j
						
					//alert(tX+", "+tY+", "+smallCellFullSize);
					var cell = new ArrayCell();
					
					cell.set(that.context, zeroPosX, zeroPosY, i , j, smallCellReducedSize);
					that.cells[i][j] = cell;	
				}
			}
		}
		
		that.draw();
	}
	
	this.draw = function() {
		
		if (!that.isBigBoard) {		
			if (!that.isEmpty) {
				if (that.cellWinner == "X") {
					drawRectangle(that.context, that.X - that.alpha * 4, that.Y - that.alpha * 4, that.size + that.alpha * 8, 'green');
				}
				else if (that.cellWinner == "O"){
					drawRectangle(that.context, that.X - that.alpha * 4, that.Y - that.alpha * 4, that.size + that.alpha * 8, 'red');
				}
				else {
					drawRectangle(that.context, that.X - that.alpha * 4, that.Y - that.alpha * 4, that.size + that.alpha * 8, 'gray');
				}
			}
		}
		
		that.drawOneBoard(that.X, that.Y, that.size);
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				var item = that.cells[i][j]
				item.draw();				
			}
		}
		
		if (that.isBigBoard) {
			if (that.activeCell_i != -1 && that.activeCell_j != -1) {
				var item = that.cells[that.activeCell_i][that.activeCell_j];
				drawRectangle(item.context, item.X - item.alpha * 4, item.Y - item.alpha * 4, item.size + item.alpha * 8, 'purple');
			}
			else {
				for (var i = 0; i < 3; i++) {
					for (var j = 0; j < 3; j++) {
						var item = that.cells[i][j];
						if (item.isEmpty) {
							//drawRectangle(item.context, item.X - item.alpha * 4, item.Y - item.alpha * 4, item.size + item.alpha * 8, 'white');
						}
					}
				}
				
			}
		}
	}
	

	this.drawOneBoard = function(X, Y, size) {

		var xPortion = (size) / 3
		var yPortion = (size) / 3
		
		that.drawLine(X + xPortion, Y, size, false)
		that.drawLine(X + xPortion * 2, Y, size, false)
		that.drawLine(X, Y + yPortion, size, true)
		that.drawLine(X, Y + yPortion * 2, size, true)
	}
	
	this.mouseOver = function(X, Y, isXTurn) {
		
		if (that.isBigBoard) {
			var board = this.getItemByCoordinates(X, Y);
			if (board) {
				var cell = board.getItemByCoordinates(X, Y);
				if (cell) {
					
					var isValidMove = that.isValidMove(board, cell)
					if (isValidMove) {
						if (isXTurn) {
							drawX(cell.context, cell.X, cell.Y, cell.size, true);
						}
						else {
							drawO(cell.context, cell.X, cell.Y, cell.size, true);
						}
					}
				}
			}
		}	
	}
	
	this.isValidMove = function(board, cell) {
		if (board.isEmpty) {
			if ((that.activeCell_i == -1 && that.activeCell_j == -1) || board.i == that.activeCell_i && board.j == that.activeCell_j) {
				if (cell.isEmpty) {
					return true;
				}
			}
		}
		return false;
	}
	
	this.turnPlayed = function(X, Y, isXTurn) {
		
		var item = this.getItemByCoordinates(X, Y);
		
		if (that.isBigBoard) {
			if (item && item.isEmpty) {
				if ((that.activeCell_i == -1 && that.activeCell_j == -1) || item.i == that.activeCell_i && item.j == that.activeCell_j) {
					
					var isValidTurn = item.turnPlayed(X, Y, isXTurn)
					if (isValidTurn) {
						item.resolveBoard()
						that.resolveBoard()
						that.activeCell_i = item.activeCell_i;
						that.activeCell_j = item.activeCell_j;
						
						if (!that.cells[that.activeCell_i][that.activeCell_j].isEmpty) {
							that.activeCell_i = -1;
							that.activeCell_j = -1;
						}	
					}
					return isValidTurn;
				}
			}
		}
		
		else {
			if (item && item.isEmpty) {
				item.fill(isXTurn);
				that.activeCell_i = item.i;
				that.activeCell_j = item.j;
				return true;
			}
		}
		return false;
		
	}
	
	this.resolveBoard = function() {
		var rows = new Array(3)
		var columns = new Array(3)
		var diagonals = new Array(2)
		for (var i = 0; i < 3; i++) {
			rows[i] = 0
			columns[i] = 0
		}
		diagonals[0] = 0;
		diagonals[1] = 0;
		
		var emptyFound = false;
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				var cell = that.cells[i][j];
				if (!cell.isEmpty) {
					var add = 0;
					if (cell.cellWinner == "X") 
						add = 1;
					else if (cell.cellWinner == "O")
						add = -1;
					
					rows[j] += add;
					columns[i] += add;
					if (i == j)
						diagonals[0] += add;
					if (i == 2-j)
						diagonals[1] += add;
				}
				else {
					emptyFound = true;
				}
			}
		}
		
		if (!emptyFound) {
			that.isEmpty = false;
		}
		that.checkLine(rows, 3);
		that.checkLine(columns, 3);
		that.checkLine(diagonals, 3);
	}
	
	this.checkLine = function(line, winVal) {
		if (!that.isEmpty)
			return;
		
		for (var i = 0; i< line.length; i++) {
			if (Math.abs(line[i]) == winVal) {
				that.isEmpty = false;
				if (line[i] > 0) {
					that.cellWinner = 'X';
				}
				else {
					that.cellWinner = 'O';
				}
				return;
			}
		}
	}
	
	this.getBoardWin = function() {
		if (that.isEmpty) {
			return 'none'
		}
		return that.cellWinner;
	}
		
	
	this.isRestricted = function() {
		if (that.activeCell_i == -1 && that.activeCell_j == -1)
			return false;
		return true;
	}
	
	this.getItemByCoordinates = function(X, Y) {
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				var item = that.cells[i][j]
				if (item.X < X && item.Y < Y && item.X + item.size > X && item.Y + item.size > Y) {
					return item
				}
			}
		}
	}
	
	this.drawLine = function (X, Y, size, isHorizontal) {
		
		that.context.globalAlpha = 1;
		that.context.beginPath();
		that.context.moveTo(X, Y);
		if (isHorizontal)
			that.context.lineTo(X + size, Y);
		else
			that.context.lineTo(X, Y + size);
		
		
		if (that.isBigBoard) {
			that.context.strokeStyle = '#000000';
			that.context.lineWidth = 6;
		}
		else {
			that.context.strokeStyle = '#47477f';
			that.context.lineWidth = 4;
			
		}
		that.context.lineCap = 'round';
		that.context.stroke();
	}
		
	
      
}
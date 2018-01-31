function Game() {

	var that = this;
	this.board;
	this.header;

	this.X
	this.Y
	this.size;

	this.canvas;
	this.context;
	
	this.isXTurn;
	
	this.margins = 10;
	this.headerHeight = 50;
	
	this.winner;
	this.gameOver
	this.set = function(X, Y, size) {

		that.canvas = document.getElementById('myCanvas');
		that.context = that.canvas.getContext('2d');
		that.winner = 'none'
		that.gameOver = false;
		c_width  = that.canvas.width;
		c_height = that.canvas.height;
		
		c_size = Math.min(c_width - 2*that.margins, c_height - 2*that.margins - that.headerHeight)
		
		var board_x = 0;
		var board_y = 0;
		var board_size = c_size;
		that.canvas.addEventListener('click', function(evt) {
			var mousePos = getMousePos(that.canvas, evt);
			that.turnPlayed(mousePos.x, mousePos.y);
		}, false);
		
		that.canvas.addEventListener("mousemove", function(evt) {
			var mousePos = getMousePos(that.canvas, evt);
			that.mouseOver(mousePos.x, mousePos.y);
		}, false);
		
		that.X = 0;
		that.Y = 0;
		that.size = c_size;
		
		that.isXTurn = false;
		
		var board = new Board();
		board.set(that.context, that.margins, that.margins + that.headerHeight, c_size, true);
		that.board = board;
		
		var header = new Header();
		header.set(that.context, that.margins, that.margins, that.headerHeight);
		that.header = header;
		
		that.draw();
	}
	
	this.draw = function() {
		var message = ""
		var color = ""
		if (!that.gameOver) {
			if (!that.board.isRestricted())
				message = "anywhere."
			else 
				message = "in the purple board."
			
			if (that.isXTurn) {
				message = "X, play " + message;
				color = "green";
			}
			else {
				message = "O, play " + message;
				color = 'red';
			}
		}
		
		else {
			if (that.winner != 'none')
				message = that.winner + " won the game!";
			else 
				message = "Game is draw."
			
			color = 'blue'
		}
		
		that.header.draw(message, color);
		that.board.draw();
	}
	
	this.mouseOver = function(X, Y) {
		that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
		that.board.mouseOver(X, Y, that.isXTurn);
		that.draw();
	}

	this.turnPlayed = function(X, Y) {
		if (!that.gameOver) {
			var isValidTurn = that.board.turnPlayed(X, Y, that.isXTurn);
			if (isValidTurn) {
				that.winner = that.board.getBoardWin()
				if (!that.board.isEmpty) {
					that.winner = that.board.getBoardWin();
					that.gameOver = true;
				}
					
				that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
				that.isXTurn = !that.isXTurn;
				that.draw();
			}
		}
	}

	function getMousePos(canvas, evt) {
        var rect = that.canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
}

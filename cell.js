function ArrayCell() {
	var that = this;
	
	this.context
	this.X;
	this.Y;
	this.i;
	this.j
	this.size;
	this.isEmpty;
	this.cellWinner;
	
	this.set = function(context, X, Y, i, j, size) {
		that.context = context
		that.X = X;
		that.Y = Y;
		that.i = i;
		that.j = j;
		that.size = size;
		that.isEmpty = true;
		that.cellWinner = 'none'
	}
	
	this.fill = function(isXTurn) {
		if (that.isEmpty) {
			that.isEmpty = false;
			if (isXTurn)
				that.cellWinner = "X"
			else
				that.cellWinner = "O"
		}
	}
		
	this.draw = function() {
		if (!that.isEmpty) {
			if (that.cellWinner == "X") {
				drawX(that.context, that.X, that.Y, that.size, false);
			}
			else if (that.cellWinner == "O") {
				drawO(that.context, that.X, that.Y, that.size, false);
			}
		}
	}
}
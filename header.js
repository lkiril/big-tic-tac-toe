function Header() {

	var that = this;
	
	this.X
	this.Y
	this.height;
	
	this.context

	this.set = function(context, X, Y, height) {
		that.context = context
		that.X = X;
		that.Y = Y;
		that.height = height
	}
	
	this.draw = function(message, color) {
		
		drawMessage(that.context, message, that.X, that.Y, 26, color);
		
	}
	
}
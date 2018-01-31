function drawX(context, X, Y, size, isTransparent) {
		
		
	var x = (2*X + size) / 2 ;
	var y = (2*Y + size) / 2 ;
	var len = size / 2.5;
	
	
	context.globalAlpha = 1;
	if (isTransparent)
		context.globalAlpha = 0.2;
	context.beginPath();
	context.moveTo(x-len, y-len);
	context.lineTo(x+len, y+len);
	context.lineWidth = 2;

	context.strokeStyle = 'green';
	context.stroke();

	context.beginPath();
	context.moveTo(x-len, y+len);
	context.lineTo(x+len, y-len);
	context.lineWidth = 2;

	context.strokeStyle = 'green';
	context.stroke();
	return true;

}
	
function drawO (context, X, Y, size, isTransparent) {
	
	var x = (2*X + size) / 2 ;
	var y = (2*Y + size) / 2 ;
	var radius = size / 2.3;
	var startAngle = 0 * Math.PI;
	var endAngle = 2 * Math.PI;
	
	context.globalAlpha = 1;
	if (isTransparent)
		context.globalAlpha = 0.2;
	context.beginPath();
	context.arc(x, y, radius, startAngle, endAngle);
	context.lineWidth = 2;
	
	context.strokeStyle = 'red';
	context.stroke();
	return true;
}

function drawRectangle (context, X, Y, size, color) {

	context.globalAlpha = 0.2;
	context.beginPath();
	context.rect(X, Y, size, size);
	context.fillStyle = color;
	context.fill();
	context.strokeStyle = color;
	context.stroke();
	return true;
}

function drawMessage(context, message, X, Y, size, color) {
	context.globalAlpha = 1;
	context.font = '26pt Calibri';
	context.fillStyle = color;
	context.fillText(message, X, Y+size);
		
}
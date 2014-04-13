ENGINE.Mouse = function(element,callback) {


	this.element = element || window;
	this.callback = callback;
	this.getBounds();

    this.x = 0;
    this.y = 0;

    this.mouseMove();
    return this;
    
};

ENGINE.Mouse.prototype.constructor = ENGINE.Mouse;


ENGINE.Mouse.prototype.getBounds = function(){

	this.bounds = this.element.getBoundingClientRect();

};

ENGINE.Mouse.prototype.getMousePosition = function(event){

	this.x = event.clientX - this.bounds.left;
	this.y = event.clientY - this.bounds.top;

};

ENGINE.Mouse.prototype.mouseMove = function(){

	this.element.addEventListener('mousemove', function(event) {

		this.getMousePosition(event);
		this.callback({x: this.x, y: this.y});

	}.bind(this), false);

};
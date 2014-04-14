ENGINE.Mouse = function(element) {


	this.element = element || window;
	this.getBounds();

    this.x = 0;
    this.y = 0;

    this.allowContext = false;
    this.context();

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

ENGINE.Mouse.prototype.mouseMove = function(callback){

	this.element.addEventListener('mousemove', function(event) {

		this.getMousePosition(event);
		callback({x: this.x, y: this.y});

	}.bind(this), false);

};

ENGINE.Mouse.prototype.mouseClick = function(callback){

	this.element.addEventListener('click', function(event) {

		callback();

	}.bind(this), false);

};

ENGINE.Mouse.prototype.mouseDown = function(callback,interval,click){

	this.element.addEventListener('mousedown', function(event) {

    switch (event.which) {
        case 1:
        	if(click === "left")
            this.mouseDownTimer = setInterval(callback, interval);
            break;
        case 2:
        	if(click === "middle")
            this.mouseDownTimer = setInterval(callback, interval);
            break;
        case 3:
        	if(click === "right")
            this.mouseDownTimer = setInterval(callback, interval);
            break;
        default:
            alert('Are you using a wacom?!');
    }


		

	}.bind(this), false);

	this.mouseUp();
};

ENGINE.Mouse.prototype.mouseUp = function(callback){

	this.element.addEventListener('mouseup', function(event) {

		clearInterval(this.mouseDownTimer);

		if(callback)
			callback();

	}.bind(this), false);

};

ENGINE.Mouse.prototype.context = function(){

	this.element.oncontextmenu = function() {
	     return this.allowContext;  
	}.bind(this);

};
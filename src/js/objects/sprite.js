// sprite constructor function
    space.sprite = function(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    return this;
};
 
// (re)define the GameObject prototype object
space.sprite.prototype.position = function(x,y){
    this.x = x;
    this.y = y;
};
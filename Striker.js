class Striker {
  constructor(x, y, width, height) {
    var options = {
        'isStatic':true,
        'restitution':1.0,
        'friction':0.4,
        'frictionAir':0.06,
        'density':0.9,
        'angle':Math.PI/2
    }
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.body=Bodies.rectangle(this.x,this.y,this.width,this.height,options);
    this.image=loadImage("striker-polo.png");
     
    World.add(world,this.body);
   }
  display(){
   
    var pos =this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    strokeWeight(5);
    image(this.image,0,0,this.width,this.height);
    pop();
    
 }

}
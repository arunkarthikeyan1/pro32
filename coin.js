class coin{
  constructor(x, y, width, height, colour) {
    var options = { 
     'isStatic':true,
     'density': 0.01, 
     'frictionAir': 0.05,
     'restitution':0.8
     
    };
    
    this.x=x;
    this.y=y;
    this.colour = colour;
    this.width = width;
    this.height = height;
   
    
    this.body = Bodies.rectangle(this.x, this.y, width, height, options);
     World.add(world, this.body);
    if(this.colour == "white")
    {
      this.image= loadImage("whitecoin1.png");   
    }
    else if (this.colour == "black") 
    {
      this.image = loadImage("blackcoin1.png"); 
    } 
    else if (this.colour == "red")
    { 
      this.image = loadImage("redcoin.png");
    }
    else{}
    
  }

  display() {
    
    var pos =this.body.position;
    push();
    translate(pos.x, pos.y);
    image(this.image,0,0,this.width,this.height);
    pop();
      
  }

}
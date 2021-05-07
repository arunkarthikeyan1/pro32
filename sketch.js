
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;

var coinPosition,stPosition, objPosition;
var test="";
var ang,spos;
var striker,backgroundImg,wall1,wall2,wall3,wall4;

var  point=[],coinw=[],coinb=[],coinr;
var d,d1;
var py=Math.PI;
var score=0;

var tex = "hit = 'space'  ,  change directions = 'left and right arrow key' ";

var stepbx=[30,-15,-15,42,-42,52,-52,0,0];
var stepby=[0,25,-25,23,24,-23,-23,-52,52];
var stepwx=[-30,15,15,59,-59,30,30,-30,-30];
var stepwy=[0,25,-25,0,0,52,-52,52,-52];

function preload(){
  backgroundImg = loadImage("carromboardimg.png");
 }

function setup() {
  createCanvas(1000,1000);
  engine = Engine.create();
  world = engine.world;

  striker = new Striker(500,800,37,37);

  wall1 = new Wall(500,950,875,45);
  wall2 = new Wall(500,72,875,45);
  wall3 = new Wall(965,513,45,923);
  wall4 = new Wall(35,513,45,923);

  point[1] = new Point(915,119,40,40);
  point[2] = new Point(90,119,40,40);
  point[3] = new Point(85,905,40,40);
  point[4] = new Point(915,905,40,40);
   
  coinr = new coin(487,495,30,30,"red");

  for (var m=0;m<10;m++)
    {
    coinw[m] = new coin(487+stepwx[m],495+stepwy[m],30,30,"white");
    coinb[m] = new coin(487+stepbx[m],495+stepby[m],30,30,"black");
      }
}


function draw() {
  
  background(backgroundImg);
  
  Engine.update(engine);
  engine.world.gravity.y = 0;

   /* Dispaying the score  */

   textSize(20);
   text("Your Score is     " +score, 70,40);
   text(""  + tex,250,900);
   text(test,400,30);


 
  wall1.display();
  wall2.display();
  wall3.display();
  wall4.display();
  for(var i=1;i<=4;i++){
  point[i].display();
  }
   
  for (var p=0;p<10;p++){
    
    var d2=detectCollision(striker,coinw[p]);
    var d3=detectCollision(striker,coinb[p]);
    
    if(d2<=coinw[p].width + striker.width){
      Matter.Body.setStatic(coinw[p].body, false);
     }
    if(d3<=coinb[p].width + striker.width){
      Matter.Body.setStatic(coinb[p].body, false);
     }
  }

  var d4=detectCollision(striker,coinr);
  if(d4<=coinr.width + striker.width){
    Matter.Body.setStatic(coinr.body, false);
   }

  for(var i=1;i<=4;i++){
     d = pocket(striker,point[i]);
     d1=pocket(coinr,point[i]);
    if(d <= point[i].width){
      Matter.Body.setPosition(striker.body, {x:500,y:800});
      if(score > 0){
      score=score-1;
      }
    }
    else{
      striker.display();
      }
    if(d1 <= point[i].width){
     
      Matter.Body.setPosition(coinr.body, {x:960,y:930});
      score=score+5;
    }
    else{
      coinr.display();
     
    }
    for(var j=0;j<10;j++){
      var dw=pocket(coinw[j],point[i]);
      var db=pocket(coinb[j],point[i]);
      if(dw <= point[i].width){
        
        Matter.Body.setPosition(coinw[j].body, {x:35,y:40*j});
        score=score+2;
        
      }
      else{
        coinw[j].display();
      }
      if(db <= point[i].width){
        Matter.Body.setPosition(coinb[j].body, {x:960,y:40*j});
        score=score+1;
       
      }
      else{
        coinb[j].display();
      }
    }
  }
 
  keyPressed();
  drawSprites();
}
 

  function mouseDragged()
  {
      Matter.Body.setStatic(striker.body, false);
      Matter.Body.setPosition(striker.body, {x: mouseX,y:mouseY}); 
  }

  function detectCollision (striker, coin) {
    coinPosition=coin.body.position;
    stPosition=striker.body.position;
    var distance=dist(stPosition.x,stPosition.y,coinPosition.x,coinPosition.y);
    return distance;
    
  }
  function pocket (obj, Point) {
    pointPosition=Point.body.position;
    objPosition=obj.body.position;
    var distance=dist(objPosition.x,objPosition.y,pointPosition.x,pointPosition.y);
    return distance;

  }

  function keyPressed(){
    ang= striker.body.angle;
    spos=striker.body.position;
    var s=Math.sin(ang);
    var c=Math.cos(ang);
    var x2 = spos.x - 500 * Math.cos(ang);
    var y2 = spos.y - 500 * Math.sin(ang)
    
    var lpos={x:x2, y:y2};
    var sineval=Math.abs(Math.sin(ang));
    var cosineval=Math.abs(Math.cos(ang));
    
    if(keyDown("r")){
      Matter.Body.setPosition(striker.body, {x:500,y:800});
      Matter.Body.setAngle(striker.body, py/2);
    }
   
    if(keyWentDown("RIGHT_ARROW"))
    {
      if(ang < py)
      {
        Matter.Body.setAngle(striker.body, striker.body.angle+(py/12));
        lpos={x:lpos.x, y:lpos.y};
        strokeWeight(5);
        line(striker.body.position.x,striker.body.position.y,lpos.x,lpos.y);
      
      }
    }
    
    if(keyWentDown("LEFT_ARROW"))
    {
      if (ang > 0)
      {
      Matter.Body.setAngle(striker.body, striker.body.angle-(py/12));
      lpos={x:lpos.x, y:lpos.y};
      strokeWeight(5);
      line(striker.body.position.x,striker.body.position.y,lpos.x,lpos.y);
      }
    } 
    if(keyDown("SPACE"))
    {
      Matter.Body.setStatic(striker.body, false);
      Matter.Body.applyForce(striker.body, striker.body.position,{x:-c*10,y:-s*10});
      test="Press 'r' to position stricker";
      
    }

  }

let dt = 1/10;

function setup() {
  //canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(500,250);
  frameRate(30);
  ball_1 = new ball(5,20,createVector(100,0),createVector(-50,0));
 ball_2=new ball(20,40,createVector(-100,0),createVector(50,0));

  borde = new border();
}

function draw() {
  translate(250,125);
  background(128,64,0);
  borde.mostrar();



  
  ball_1.collision();
  ball_2.collision();
  
  ball_1.ballscollision();

  ball_1.movimiento();
  ball_2.movimiento();

  ball_1.mostrar(); 
  ball_2.mostrar();

  
 
}

let ball = function(_mass, _rad, _pos, _vel){
  this.mass = _mass;
  this.radio = _rad;
  this.pos = _pos;
  this.vel = _vel;

  this.mostrar = function() {
    noStroke(); //elimina el borde negro
    fill(229,190,1);
    ellipse(this.pos.x, this.pos.y, this.radio, this.radio);
    stroke(25);
  }

  this.movimiento = function(){
    this.pos.x += this.vel.x*dt;
    this.pos.y += this.vel.y*dt;
  }

  this.collision=function(){
if ((this.pos.x<-248+this.radio) || (this.pos.x>248-this.radio)){
this.vel.x*=-1;
}

if ((this.pos.y<-125+this.radio) || (this.pos.y>125-this.radio)){
  this.vel.y*=-1;
  }

  }
//caso colision elastica entre bolas
this.ballscollision=function(){
  let d=dist(ball_1.pos.x,ball_1.pos.y,ball_2.pos.x,ball_2.pos.y);
  let u= createVector((ball_1.pos.x-ball_2.pos.x)/d,(ball_1.pos.y-ball_2.pos.y)/d);
  let a= ((2*ball_1.mass*ball_2.mass)/(ball_1.mass+ball_2.mass))*((ball_2.vel.x-ball_1.vel.x)*u.x+(ball_2.vel.y-ball_1.vel.y)*u.y);
  if(d<(ball_1.radio+ball_2.radio)){
  
  
  ball_1.vel.x=ball_1.vel.x+(a/ball_1.mass)*u.x;
  ball_1.vel.y=ball_1.vel.y+(a/ball_1.mass)*u.y;
  ball_2.vel.x=ball_2.vel.x-(a/ball_2.mass)*u.x;
  ball_2.vel.y=ball_2.vel.y-(a/ball_2.mass)*u.y;
}
}

}



let border = function(){
  this.mostrar = function() {
    //noStroke(); //elimina el borde negro
    fill(0,143,57);
    rect(-240,-115,480,230);
    //stroke(100);

  }
}
  
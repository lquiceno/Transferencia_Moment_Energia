let ball_1;
let borde;
let dt = 1/50;

function setup() {
  //canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(500,250);
  frameRate(30);
  ball_1 = new ball(5,20,createVector(0,0),createVector(50,50));
  borde = new border();
}

function draw() {
  translate(250,125);
  background(128,64,0);
  borde.mostrar();

ball_1.collision();
  ball_1.movimiento();
  ball_1.mostrar(); 
  
}

let ball = function(_mass, _rad, _pos, _vel){
  this.mass = _mass;
  this.radio = _rad;
  this.pos = _pos;
  this.vel = _vel;

  this.mostrar = function() {
    noStroke(); //elimina el borde negro
    fill(229,190,1);
    ellipse(this.pos.x, this.pos.y, this.radio, this.rad);
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


}

let border = function(){
  this.mostrar = function() {
    //noStroke(); //elimina el borde negro
    fill(0,143,57);
    rect(-240,-115,480,230);
    //stroke(100);

  }
}
  

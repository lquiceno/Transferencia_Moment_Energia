
let dt = 1/10;
let phi=100; //porcentaje de elasticidad 
//choque completamente elastico phi=100, choque completamente inelastico phi=0
//Modificacion del main
//EXPERIMENTING BRANCHES
let balls=[];
let N=3; //number of balls
function setup() {
//canvas = createCanvas(windowWidth, windowHeight);
canvas = createCanvas(500,250);
frameRate(100);

for(let i=0; i<N;i++){
balls.push(new ball(i, random(1,10),random(10,20),createVector(random(-200,200),random(-100,100)),createVector(random(-50,50),random(-50,50))));
for(let j=0; j<i;j++){
let di= dist(balls[i].pos.x,balls[i].pos.y,balls[j].pos.x,balls[j].pos.y);
if(di<=balls[i].radio){
balls[i].pos.x+=2*balls[i].radio;
  }

}
}

borde = new border();
}

function draw() {
  translate(250,125);
  background(128,64,0);
  borde.mostrar();

for(let i=0; i<N;i++){
balls[i].movimiento();
balls[i].mostrar();
balls[i].collision();
for(let j=0;j<N;j++){
let dis=dist(balls[i].pos.x,balls[i].pos.y,balls[j].pos.x,balls[j].pos.y);
if(i !==j && dis<=balls[i].radio+balls[j].radio){
inelasticballscollision(balls[i],balls[j]);
}
}
}

}

let ball = function(i, _mass, _rad, _pos, _vel){
  this.mass = _mass;
  this.radio = _rad;
  this.pos = _pos;
  this.vel = _vel;

  this.mostrar = function() {
    noStroke(); //elimina el borde negro
    switch (i) {
      case 0:
        fill	(255, 233, 0);
        break;
      case 1:
        fill(255, 0, 0);
        break;
      case 2:
        fill(0,0,255);
        break;
      case 3:
        fill(87,35,100);
        break;
      case 4:
        fill(255,128,0);
        break;
      case 5:
        fill(255,177,187);
        break;
    }
    
    ellipse(this.pos.x, this.pos.y, 2*this.radio, 2*this.radio); //en realidad ellipse toma el ancho y alto total de la elipse, en este caso sería el diametro
    stroke(25);
  }

  this.movimiento = function(){
    this.pos.x += this.vel.x*dt;
    this.pos.y += this.vel.y*dt;
  }

  this.collision=function(){
if ((this.pos.x<-240+this.radio) || (this.pos.x>240-this.radio)){
this.vel.x*=-1;
}
if ((this.pos.y<-115+this.radio) || (this.pos.y>115-this.radio)){
  this.vel.y*=-1;
  }

  }

}




inelasticballscollision=function(object1,object2){

  


let d=dist(object1.pos.x,object1.pos.y,object2.pos.x,object2.pos.y);
let u= createVector((object1.pos.x-object2.pos.x)/(d),(object1.pos.y-object2.pos.y)/(d));
let s= createVector((object1.vel.x-object2.vel.x)/(dist(object1.vel.x,object1.vel.y,object2.vel.x,object2.vel.y)),(object1.vel.y-object2.vel.y)/(dist(object1.vel.x,object1.vel.y,object2.vel.x,object2.vel.y)));
let kmin=sqrt(1-sq((s.x*u.x)+(s.y*u.y)));
let k=(phi/100)+((1-(phi/100))*kmin);
let A= sq((object1.mass+object2.mass)/(object1.mass*object2.mass));
let B=2*((object1.mass+object2.mass)/(object1.mass*object2.mass))*(((object1.vel.x-object2.vel.x)*u.x)+((object1.vel.y-object2.vel.y)*u.y));
let C=(1-sq(k))*sq(dist(object1.vel.x,object1.vel.y,object2.vel.x,object2.vel.y));
let D=sq(B)-4*A*C;
if(D<0){
  
  object1.vel.x=0;
  object1.vel.y=0;
  object2.vel.x=0;
  object2.vel.y=0;

}else{
let a1=(-B+sqrt(sq(B)-4*A*C))/(2*A);
let a2=(-B-sqrt(sq(B)-4*A*C))/(2*A); 
let a=max(a1,a2);
 
  
object1.vel.x+=(a/object1.mass)*u.x;
object1.vel.y+=(a/object1.mass)*u.y;
object2.vel.x-=(a/object2.mass)*u.x;
object2.vel.y-=(a/object2.mass)*u.y;
  
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
  

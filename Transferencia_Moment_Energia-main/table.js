let dt = 1/10;
//si phi=80; //porcentaje de elasticidad 
//choque completamente elastico phi=100, choque completamente inelastico phi=0
//Modificacion del main

let balls=[]; //arreglo vacio bolas
//si N=4; cuatro bolas 
let l=100; //altura para mostrar botones
//crea pantalla
let w=window.innerWidth;
let h=window.innerHeight-l; 



function setup() {
//canvas = createCanvas(windowWidth, windowHeight);
//crea botones para interaccion con usuario
canvas = createCanvas(w,h);
button=createButton('Restaurar');
button.mousePressed(resetSketch);

//barra de bolas
p1=createP('Numero de Bolas');
p1.position(w/3+25,h+l/5); //posicion barra

//barra elasticidad
p2=createP('Porcentaje de Elasticidad');
p2.position(2*w/3,h+l/5); //posicion barra

sliderx = createSlider(0, 6, 3); //controla numero de bolas, si el usuario crea mas, las crea del mismo color
sliderx.position(w/3, h+ l/2); //posicion
sliderx.style('width', '150px'); //color

slidery = createSlider(0.1, 100, 50);
slidery.position(2*w/3, h+ l/2);
slidery.style('width', '150px');

sliderx.changed(resetSketch);
slidery.changed(resetSketch);

resetSketch();
}

function resetSketch() {
  frameRate(100);
  balls=[]; //bolas
  N=sliderx.value(); //numero bolas
  phi=slidery.value(); //porcentaje ealsticidad
  //crea las bolas y las pone en lugar aleatorio
  for(let i=0; i<N;i++){
  balls.push(new ball(i, random(1,10),random(10,20),createVector(random(-w/2+50,w/2-50),random(-h/2+50,h/2-50)),createVector(random(-50,50),random(-50,50))));
  for(let j=0; j<i;j++){
  let di= dist(balls[i].pos.x,balls[i].pos.y,balls[j].pos.x,balls[j].pos.y);
  if(di<=balls[i].radio){
  balls[i].pos.x+=2*balls[i].radio;
    }
  
  }
  }
  //se crea el borde la imagen  
  borde = new border(); 
}

function draw() {
  translate(w/2,h/2);
  background(128,64,0);
  borde.mostrar();
  
   //for recorre numero de bolas
for(let i=0; i<N;i++){
balls[i].movimiento(); //llama a la funcion movimiento y la aplica a cada bola
balls[i].mostrar(); //llama a mostrar para que aparezca pantalla
balls[i].collision(); //llama funcion colision encargada de colision de bolas
for(let j=0;j<N;j++){
  //cambia movimiento de las bolas segun su radio
let dis=dist(balls[i].pos.x,balls[i].pos.y,balls[j].pos.x,balls[j].pos.y);
if(i !==j && dis<=balls[i].radio+balls[j].radio){ // condicion si dos bolas chocan
inelasticballscollision(balls[i],balls[j]);
}
}
}


}
//llama las caracteristicas fisicas de la bola
let ball = function(i, _mass, _rad, _pos, _vel){
  this.mass = _mass;
  this.radio = _rad;
  this.pos = _pos;
  this.vel = _vel;
//switch escoge las bolas para ingresar a cada una caracteristicas
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
    
    ellipse(this.pos.x, this.pos.y, 2*this.radio, 2*this.radio); //en realidad ellipse toma el ancho y alto total de la elipse, en este caso ser??a el diametro
    stroke(25);
  }
//funcion movimiento la cual cambia posicion usando ec. Cinematica x = vt
  this.movimiento = function(){
    this.pos.x += this.vel.x*dt;
    this.pos.y += this.vel.y*dt;
  }
//funcion colision que cambia velocidad
  this.collision=function(){
if ((this.pos.x<-w/2+10+this.radio) || (this.pos.x>w/2-10-this.radio)){
this.vel.x*=-1;
}
if ((this.pos.y<-h/2+10+this.radio) || (this.pos.y>h/2-10-this.radio)){
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
  //funcion mostrar para aparecer el lienzo 
  this.mostrar = function() {
    //noStroke(); //elimina el borde negro
    fill(0,143,57);
    rect(-w/2+10,-h/2+10,2*(w/2-10),2*(h/2-10));
    //stroke(100);

  }
}



  
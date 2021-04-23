let dt = 1/10;
//si phi=80; //porcentaje de elasticidad 
//choque completamente elastico phi=100, choque completamente inelastico phi=0
//Modificacion del main

let balls=[]; //arreglo vacio bolas
//si N=4; cuatro bolas 
let l=150; //altura para mostrar botones
//crea pantalla
let R=[];
let w=window.innerWidth;
let h=window.innerHeight-l; 


function setup() {
//canvas = createCanvas(windowWidth, windowHeight);
//crea botones para interaccion con usuario
//aproximadamente 1360px=659--------> 150px=72.7

canvas = createCanvas(w,h);
button=createButton('Restaurar');
button.mousePressed(resetSketch);

//barra de bolas
p1=createP('Número de bolas');
p1.position(2*w/4-72.7+20,h+l/4-35); //posicion barra
sliderx = createSlider(0, 6, 6); //controla numero de bolas
sliderx.position(2*w/4-72.7, h+ l/4); //posicion
sliderx.style('width', '150px'); //color

//barra elasticidad
p2=createP('Porcentaje de elasticidad');
p2.position(3*w/4-72.7,h+l/4-35); //posicion barra
slidery = createSlider(0.1, 100, 50);
slidery.position(3*w/4-72.7, h+ l/4);
slidery.style('width', '150px');

//barra fricción
p3 = createP('Coeficiente de fricción');
p3.position(w/4-72.7+3,h+l/4-35);
sliderz = createSlider(0, 1, 0, 0.01);
sliderz.position(w/4-72.7, h+ l/4);
sliderz.style('width', '150px');
//text("Freq Y = " + nfc(b, 2), 120,l+190);

//RADIOS DE LAS SEIS POSIBLES BOLAS EN ESTE ORDEN: AMARILLA, ROJA, AZUL, MORADA, NARANJA, ROSADA
p4 = createP('Radios');
p4.position(w/2,h+l/2-15);

p11 = createP('Amarilla');
p11.position(w/7-72.7+55,h+l/2+l/4-35);
sliderR1 = createSlider(10, 40, 10, 0.01);
sliderR1.position(w/7-72.7, h+ l/2+l/4);
sliderR1.style('width', '150px');

p12 = createP('Roja');
p12.position(2*w/7-72.7+65,h+l/2+l/4-35);
sliderR2 = createSlider(10, 40, 15, 0.01);
sliderR2.position(2*w/7-72.7, h+ l/2+l/4);
sliderR2.style('width', '150px');

p13 = createP('Azul');
p13.position(3*w/7-72.7+65,h+l/2+l/4-35);
sliderR3 = createSlider(10, 40, 20, 0.01);
sliderR3.position(3*w/7-72.7, h+ l/2+l/4);
sliderR3.style('width', '150px');

p14 = createP('Morada');
p14.position(4*w/7-72.7+55,h+l/2+l/4-35);
sliderR4 = createSlider(10, 40, 25, 0.01);
sliderR4.position(4*w/7-72.7, h+ l/2+l/4);
sliderR4.style('width', '150px');

p15 = createP('Naranja');
p15.position(5*w/7-72.7+55,h+l/2+l/4-35);
sliderR5 = createSlider(10, 40, 30, 0.01);
sliderR5.position(5*w/7-72.7, h+ l/2+l/4);
sliderR5.style('width', '150px');

p16 = createP('Rosada');
p16.position(6*w/7-72.7+55,h+l/2+l/4-35);
sliderR6 = createSlider(10, 40, 40, 0.01);
sliderR6.position(6*w/7-72.7, h+ l/2+l/4);
sliderR6.style('width', '150px');


sliderx.changed(resetSketch);
slidery.changed(resetSketch);
sliderz.changed(resetSketch);

sliderR1.changed(resetSketch);
sliderR2.changed(resetSketch);
sliderR3.changed(resetSketch);
sliderR4.changed(resetSketch);
sliderR5.changed(resetSketch);
sliderR6.changed(resetSketch);



resetSketch();

}

function resetSketch() {
  frameRate(100);
  balls=[]; //bolas
  N=sliderx.value(); //numero bolas
  phi=slidery.value(); //porcentaje ealsticidad
  b=sliderz.value(); //coef. de fricción
  R=[sliderR1.value(),sliderR2.value(),sliderR3.value(),sliderR4.value(),sliderR5.value(),sliderR6.value()];
  //crea las bolas y las pone en lugar aleatorio
  for(let i=0; i<N;i++){
    //Vamos a considerar densidad=0.0001; M=4pi/3*Radio^3
  balls.push(new ball(i, 0.0001*4.2*R[i]*sq(R[i]),R[i],createVector(random(-w/2+50,w/2-50),random(-h/2+50,h/2-50)),createVector(random(-50,50),random(-50,50))));
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
  //p6 = createP(nfc(sliderz.value(),2));
  //p6.position(w-1040,h+l/4);
  
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
        //se acaba la función
    }
    
    //ellipse(this.pos.x, this.pos.y, 2*this.radio, 2*this.radio); //en realidad ellipse toma el ancho y alto total de la elipse, en este caso sería el diametro
    circle(this.pos.x,this.pos.y, 2*this.radio);
    stroke(25);
  }
//funcion movimiento la cual cambia posicion usando ec. Cinematica x = vt
  this.movimiento = function(){


    //b = 0.2; //coef. de fricción
    beta = b*dt/this.mass; //fricción si b diferente de 0
    this.vel.x = (1.0 - beta)*this.vel.x;
    this.vel.y = (1.0 - beta)*this.vel.y;

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


MostGeneralCollision=function(object1,object2){
  //ANALISIS SIN CONSERVACION DEL MOMENTO, CUANDO SE LLAMA NO PARECE DAR UN RESULTADO FÍSICAMENTE VIABLE.
  let d=dist(object1.pos.x,object1.pos.y,object2.pos.x,object2.pos.y);
  let u= createVector((object1.pos.x-object2.pos.x)/(d),(object1.pos.y-object2.pos.y)/(d));
  //let s= createVector((object1.vel.x-object2.vel.x)/(dist(object1.vel.x,object1.vel.y,object2.vel.x,object2.vel.y)),(object1.vel.y-object2.vel.y)/(dist(object1.vel.x,object1.vel.y,object2.vel.x,object2.vel.y)));
  let kmin=sqrt(sq(dist(object1.vel.x*(1-(b/object1.mass)),object1.vel.y*(1-(b/object1.mass)),object2.vel.x*(1-(b/object2.mass)),object2.vel.y*(1-(b/object2.mass))))-sq((u.x*((1-(b/object1.mass))*object1.vel.x-(1-(b/object2.mass))*object2.vel.x))+(u.y*((1-(b/object1.mass))*object1.vel.y-(1-(b/object2.mass))*object2.vel.y))))/dist(object1.vel.x,object1.vel.y,object2.vel.x,object2.vel.y);
  let k=(phi/100)+((1-(phi/100))*kmin);
  let A= sq((object1.mass+object2.mass)/(object1.mass*object2.mass));
  let B=2*((object1.mass+object2.mass)/(object1.mass*object2.mass))*((((1-(b/object1.mass))*object1.vel.x-(1-(b/object2.mass))*object2.vel.x)*u.x)+(((1-(b/object1.mass))*object1.vel.y-(1-(b/object2.mass))*object2.vel.y)*u.y));
  let C=sq(dist(object1.vel.x*(1-(b/object1.mass)),object1.vel.y*(1-(b/object1.mass)),object2.vel.x*(1-(b/object2.mass)),object2.vel.y*(1-(b/object2.mass))))-sq(k)*sq(dist(object1.vel.x,object1.vel.y,object2.vel.x,object2.vel.y));
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
   
  object1.vel.x=((1-(b/object1.mass))*object1.vel.x)+(a/object1.mass)*u.x;
  object1.vel.y=((1-(b/object1.mass))*object1.vel.y)+(a/object1.mass)*u.y;
  object2.vel.x=((1-(b/object2.mass))*object2.vel.x)-(a/object2.mass)*u.x;
  object2.vel.y=((1-(b/object2.mass))*object2.vel.y)+(a/object2.mass)*u.y;
    
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

function changeRad() {
  radio = int(inputRadio.value());
  inputRadio.value('');

  if (radio > 5 && radio < 60) {
    ball.r = radio;
  }
}
  

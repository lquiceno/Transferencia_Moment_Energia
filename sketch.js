let suelo;
let pelota;
let dt=1/30;
let gravedad= createVector(0,10);

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  frameRate(30);

  suelo = new Tierra(-windowWidth/2,windowHeight/2-100,windowWidth,100);

  pelota = new Balon(10,20,createVector(-windowWidth/3,-windowHeight/3),createVector(20,-20));
}

//comentarios
function draw() {
  translate(windowWidth/2,windowHeight/2);
  background(52,152,219);
  suelo.mostrar();
  pelota.actVelocidad(gravedad);
  pelota.movimiento();
  pelota.mostrar();

}

//crear tierra
let Tierra = function (_x, _y, _w, _h) {

this.x =_x;
this.y =_y;
this.w =_w;
this.h =_h;

this.mostrar = function () {
  noStroke();
  fill(211, 84, 0);
rect(this.x, this.y, this.w, this.h);

}

}

let Balon = function (_mass, _rad, _pos, _vel){

  this.mass=_mass;
  this.rad=_rad;
  this.pos=_pos;
  this.vel=_vel;

  this.trayectoria =[];

  this.mostrar= function (){
    noStroke();
    fill(10);
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad);

    stroke(25);

    for(let i=0;i< this.trayectoria.length-2;i++){

      line(this.trayectoria[i].x,this.trayectoria[i].y,this.trayectoria[i+1].x,this.trayectoria[i+1].y );
    }

  }

  this.actVelocidad=function (accel){

    this.vel.x += accel.x *dt;
    this.vel.y +=accel.y*dt;
  }

  this.movimiento= function (){

    this.pos.x+=this.vel.x*dt;
    this.pos.y+=this.vel.y*dt;

    this.trayectoria.push(this.pos.copy());
    if(this.trayectoria.length > 150) {
      this.trayectoria.splice(0,1);

    }

    
  }

}

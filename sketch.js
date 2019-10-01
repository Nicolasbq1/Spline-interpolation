var pointsarr = [];
var splinearr = [];
var catmul_spline_inv = math.matrix([[1,0,0,0],[0,0,1,0],[-3,3,-2,-1],[2,-2,1,1]]);
var catmul_spline = math.matrix([[1,0,0,0],[1,1,1,1],[0,1,0,0],[0,1,2,3]]);

//deprecated scale controls
// let scale = 100.0;
// let scaleControl = new controlPoint(100,500);

//sets up canvas for drawing with p5.js wrapper framework
function setup() {
  var canvas = createCanvas(1000,2000);
  canvas.parent('sketch_holder');
  background("#00A699");

  pointsarr.push(new controlPoint(200,50));
  pointsarr.push(new controlPoint(220,100));
  pointsarr.push(new controlPoint(225,150));
  pointsarr.push(new controlPoint(220,200));
  pointsarr.push(new controlPoint(215,250));
  pointsarr.push(new controlPoint(210,300));
  pointsarr.push(new controlPoint(180,350));
  pointsarr.push(new controlPoint(100,400));
  pointsarr.push(new controlPoint(80,410));

  //method of intersectoin of lines fails for:
  // pointsarr.push(new controlPoint(200,50));
  // pointsarr.push(new controlPoint(260,100));
  // pointsarr.push(new controlPoint(195,150));
  // pointsarr.push(new controlPoint(240,200));
  console.log(pointsarr,"hih",pointsarr.length)
  for(var i = 0; i < pointsarr.length-3;i++){
    splinearr.push(new spline(pointsarr[i],pointsarr[i+1],pointsarr[i+2],pointsarr[i+3]));
    splinearr[i].calcMat();
  }

  //deprecated scale controls
  // pointsarr.forEach(function(point,index){
  //   point.link(new controlPoint(point.x/scale,point.y/scale));
  // });
  //pointsarr.push(new controlPoint(200,250));
  // a = new spline(pointsarr[0],pointsarr[1],pointsarr[2],pointsarr[3]);
  // a.calcMat();
  //console.log(a.calcPoint(.5));

  // secondarr.push(new controlPoint(1,-1));
  // secondarr.push(new controlPoint(1,1));
  // secondarr.push(new controlPoint(4,3));
  // secondarr.push(new controlPoint(5,-2));
  // b = new spline(secondarr[0],secondarr[1],secondarr[2],secondarr[3]);
  // b.calcMat();

}


//draws on canvas based on state if info not yet loaded
//shows loading animation, usually only lasts 3 frames
function draw() {
  background("#00A699");
  drawpoints();
  // for( var p = 0; p < pointsarr.length-3;p++ )
  //   for(var i = 0; i <= 1; i+= .01)
  //     drawLine(pointsarr[p], pointsarr[p+1],pointsarr[p+2],pointsarr[p+3],i);

  //scaleControl.render();
  for(var i = 0; i < splinearr.length;i++){
    console.log(splinearr[i]);
    for(var t = 0; t < 1; t+=.01){
      var out1 = splinearr[i].calcPoint(t);
      var out2 = splinearr[i].calcPoint(t+.01)
      line(out1[0],out1[1],out2[0],out2[1]);
    }
  }

  if(mouseIsPressed){
    pointsarr.forEach(function(point,index){
        if(pointdist(point.x,point.y,mouseX,mouseY)<point.r*point.r*5){
          point.locate(mouseX,mouseY);
          //deprecated scale controls
          //point.splinescale.locate(mouseX/scale,mouseY/scale);
          splinearr.forEach(function(spline,index){
            spline.calcMat();
          });
        }
    });
    //deprecated scale controls
    // if(pointdist(scaleControl.x,scaleControl.y,mouseX,mouseY)<100*5){
    //   scaleControl.locate(mouseX,mouseY);
    //   scale = mouseX;
    //   pointsarr.forEach(function(point,index){
    //     point.link(new controlPoint(point.x/scale,point.y/scale));
    //     point.splinescale.locate(point.x/scale,point.y/scale);
    //   });
    //   a.updatePoints();
    //   a.calcMat();
    //   console.log(scale);
    // }
  }
}

function spline(p1,p2,p3,p4){
  //deprecated scale controls
  // this.points = p1,p2,p3,p4;
  // this.p1 = p1.splinescale;
  // console.log("memes",this.p1)
  // this.p2 = p2.splinescale;
  // this.p3 = p3.splinescale;
  // this.p4 = p4.splinescale;
  // this.mat = math.matrix([[0,0],[0,0],[0,0],[0,0]]);
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
  this.p4 = p4;

  this.mat = math.matrix([[1,2],[3,4],[5,6],[7,8]]);

  //deprecated scale controls;
  // this.updatePoints = function(){
  //   this.p1 = p1.splinescale;
  //   this.p2 = p2.splinescale;
  //   this.p3 = p3.splinescale;
  //   this.p4 = p4.splinescale;
  // }


  this.calcMat = function(){
    //i = 2
    var p1 = this.p1;
    var p2 = this.p2;
    var p3 = this.p3;
    var p4 = this.p4;
    console.log("p1",p1.x,p1.y);
    console.log("p2",p2.x,p2.y);
    console.log("p3",p3.x,p3.y);
    console.log("p4",p4.x,p4.y);
    t2x = .5*(p3.x-p1.x);
    t2y = .5*(p3.y-p1.y);
    t3x = .5*(p4.x-p2.x);
    t3y = .5*(p4.y-p2.y);
    console.log("point",t2x,t2y);
    du2dx = 1/(p3.x-p2.x);
    du2dy = 1/(p3.y-p2.y);
    console.log("u derive",du2dx,du2dy);
    du3dx = 1/(p3.x-p2.x);
    du3dy = 1/(p3.y-p2.y);
    // du3dx = 1/(p4.x-p3.x);
    // du3dy = 1/(p4.y-p3.y);
    //var pointMat = math.matrix([[p2.x,p2.y],[p3.x,p3.y],[t2x*du2dx,t2y*du2dy],[t3x*du3dx,t3y*du3dy]]);
    // this.mat = math.multiply(catmul_spline_inv,pointMat);
    var pointMat = math.matrix([[p2.x,p2.y],[p3.x,p3.y],[t2x,t2y],[t3x,t3y]]);
    this.mat = math.multiply(catmul_spline_inv,pointMat);
    console.log(pointMat._data[2]);
  }
  this.calcPoint = function(t){
    var x = 0;
    var y = 0;
    this.mat.forEach(function(value,index,matrix){
      //console.log(value,(1-index[1]));
      x += (1-index[1])*value*math.pow(t,index[0]);
      y += index[1]*value*math.pow(t,index[0]);
    });
    return [x,y];
    //deprecated scale controls
    // return [scale*x,scale*y];
  }
}



//buttons that change the state, has hover animation
// function controlPoint(x,y){
//   this.y = y;
//   this.x = x;
//   this.r = 10;
//   this.locate = function(x,y){
//     this.x = x;
//     this.y = y;
//   }
//   this.render= function(){
//     push();
//     stroke("#cccccc")
//     strokeWeight(4)
//     fill("#00A699")
//     ellipse(this.x,this.y,this.r);
//     pop();
//   }
// }


function controlPoint(x,y){
  this.splinescale;
  this.y = y;
  this.x = x;
  this.r = 10;

  this.link = function(p){
    this.splinescale = p;
  }

  this.locate = function(x,y){
    this.x = x;
    this.y = y;
  }


  this.render= function(){
    push();
    stroke("#cccccc")
    strokeWeight(4)
    fill("#00A699")
    ellipse(this.x,this.y,this.r);
    pop();
  }
}

//P = (1−t)^2 *  P1 + 2(1−t)t * P2 + t^2 * P3
function drawHermiteApprox(point0,point1,point2,point3,t){
  var a1 = (point1.y-point0.y)/(point1.x-point0.x);
  var b1 = -1;
  var c1 = point0.x*(point1.y-point0.y)/(point1.x-point0.x) - point0.y;

  var a2 = (point3.y-point2.y)/(point3.x-point2.x);
  var b2 = -1;
  var c2 = point2.x*(point3.y-point2.y)/(point3.x-point2.x) - point2.y;



  // line(0,c1/b1,500,(c1-a1*500)/b1);
  // line(0,c2/b2,500,(c2-a2*500)/b2);

  var determinant = a1*b2 - a2*b1;
  var cpointx;
  var cpointy;
  if(determinant != 0){
    cpointx = (c1*b2-c2*b1)/(determinant);
    cpointy = (a1*c2-a2*c1)/determinant;
  }
  else{
    cpointx = (point1.x+point2.x)/2;
    cpointy = (point1.y+point2.y)/2;
  }
  ellipse(cpointx,cpointy,10);

  var p1x = point1.x;
  var p1y = point1.y;
  var p2x = cpointx;
  var p2y = cpointy;
  var p3x = point2.x;
  var p3y = point2.y;
  var out1x = p1x*(1-t)*(1-t) + 2*(1-t)*t*p2x + t*t*p3x;
  var out1y = p1y*(1-t)*(1-t) + 2*(1-t)*t*p2y + t*t*p3y;
  t += .01;
  var out2x = p1x*(1-t)*(1-t) + 2*(1-t)*t*p2x + t*t*p3x;
  var out2y = p1y*(1-t)*(1-t) + 2*(1-t)*t*p2y + t*t*p3y;
  push();
  strokeWeight(2);
  line(out1x,out1y,out2x,out2y);
  pop();
}



function drawpoints(t){
  pointsarr.forEach(function(point,index){
      point.render();
  });
}





function pointdist(p1x,p1y,p2x,p2y){
  return (p1x-p2x)*(p1x-p2x) + (p1y-p2y)*(p1y-p2y)
}


//mouse clicked listener provided by p5.js
function mousePressed(){
  print("yeet")

}

var pointsarr = [];
var splinearr = [];
var playerDict = {};
var catmul_spline_inv = math.matrix([[1,0,0,0],[0,0,1,0],[-3,3,-2,-1],[2,-2,1,1]]);
var catmul_spline = math.matrix([[1,0,0,0],[1,1,1,1],[0,1,0,0],[0,1,2,3]]);
var nflData;
var ourData;
var complete;
var oComplete;
var drawR;
var drawOur;
var drawPointArr;

//deprecated scale controls
// let scale = 100.0;
// let scaleControl = new controlPoint(100,500);

function testSpline(){

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
  console.log("test spline setup done");
}


//sets up canvas for drawing with p5.js wrapper framework
function setup() {
  var canvas = createCanvas(1000,2000);
  canvas.parent('sketch_holder');
  background("#00A699");
  complete=false;
  oComplete=false;
  drawR = false;
  drawOur = false;
  extractNFLData();
  ourData={};
  //extractOurData(10);


  //testSpline();
  console.log("ready to draw");



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

  //drawpoints();
  // for( var p = 0; p < pointsarr.length-3;p++ )
  //   for(var i = 0; i <= 1; i+= .01)
  //     drawLine(pointsarr[p], pointsarr[p+1],pointsarr[p+2],pointsarr[p+3],i);
  //scaleControl.render();
  if(complete){
    console.log("Done");
    complete = false;
    drawR = true;
    console.log(nflData);
    sum = 0;
    playerdict = {};

    nflData.forEach(function(features,index){
      playerdict[features[8]] = features[9];
      playerDict[features[9]] = {};
      playerDict[features[9]]["points"] = [];
      playerDict[features[9]]["splines"] = [];
      playerDict[features[9]]["times"] = [];
      playerDict[features[9]]["team"] = "";

    });
    console.log(playerdict);

    compareDict = {}

    nflData.forEach(function(features,index){
      // if(features[13]=="44" && (features[9] == "80" || features[10]=="away")){

      if(features[13]=="160" ){//&& (features[9] == "14" || features[9] == "23")){
        //console.log(features);
        print(features[12])
        playerDict[features[9]]["points"].push(new controlPoint(features[2]*10+100,features[1]*10,features[9]));
        playerDict[features[9]]["times"].push(features[3]);
        playerDict[features[9]]["team"] = features[10];
        sum+=1;
      }

    });

    compareDict["14"] = playerDict["14"];
    compareDict["23"] = playerDict["23"];
    console.log(compareDict);




    var value;
    for(var key in playerDict){
      value = playerDict[key];
      for(var i = 0; i < value["points"].length-3;i++){
        value["splines"].push(new spline(value["points"][i],value["points"][i+1],value["points"][i+2],value["points"][i+3]));
        value["splines"][i].calcMat();
      }

    }
    // playerDict.forEach(function(dict,index){
    //   for(var i = 0; i < dict["points"].length-3;i++){
    //     dict["splines"].push(new spline(dict["points"][i],dict["points"][i+1],dict["points"][i+2],dict["points"][i+3]));
    //     dict["splines"][i].calcMat();
    //   }
    // });


    console.log(playerDict);
  }



  if(oComplete){

    console.log("init our");
    oComplete = false;
    drawOur = true;
    console.log(ourData);

    var value;
    for(var key in ourData){
      value = ourData[key];
      playerDict[key] = {};
      playerDict[key]["points"] = [];
      playerDict[key]["splines"] = [];
      playerDict[key]["frame"] = [];
      playerDict[key]["times"] = [];
    }

    // ourData.forEach(function(features,index){
    //   playerDict[features[0]] = {};
    //   playerDict[features[0]]["points"] = [];
    //   playerDict[features[0]]["splines"] = [];
    //   playerDict[features[0]]["frame"] = [];
    //   playerDict[features[0]]["times"] = [];
    // });

    var dataRow;
    for(var key in ourData){
      dataRow = ourData[key];
      for(var i = 0; i < dataRow[0].length;i++){
        if(20<i&&i<270){
            playerDict[key]["points"].push(new controlPoint(dataRow[0][i],dataRow[1][i],key));
            playerDict[key]["times"].push(i);
        }
      }
      // dataRow.forEach(function(features,index){
      //   if(index<100000){
      //       playerDict[key]["points"].push(new controlPoint(features[0],features[1],key));
      //       playerDict[key]["times"].push(index);
      //   }
      // });
    }

    // ourData.forEach(function(features,index){
    //   // if(features[13]=="44" && (features[9] == "80" || features[10]=="away")){
    //   if(parseInt(features[3])<240){
    //     playerDict[features[0]]["points"].push(new controlPoint(features[1],features[2],features[0]));
    //     playerDict[features[0]]["times"].push(features[3]);
    //   }
    //
    //
    // });

    var value;
    for(var key in playerDict){
      value = playerDict[key];
      for(var i = 0; i < value["points"].length-3;i++){
        value["splines"].push(new spline(value["points"][i],value["points"][i+1],value["points"][i+2],value["points"][i+3]));
        value["splines"][i].calcMat();
      }

    }

    console.log(playerDict)


  }






  if(drawR){
    background("#00A699");
    //console.log("running");

    var value;
    for(var key in playerDict){
      value = playerDict[key];

      // if(value["points"].length>0){
      //   drawPointArr = value["points"]
      //   //console.log(drawPointArr);
      //   drawpoints();
      // }

      for(var i = 0; i < value["splines"].length;i++){
        for(var t = 0; t < 1; t+=.01){
          var out1 = value["splines"][i].calcPoint(t);
          var out2 = value["splines"][i].calcPoint(t+.01)
          push();
          if(value["team"] == "home")
            stroke("#0000FF")
          else if(value["team"] == "ball")
            stroke("#964B00")
          else
            stroke("#FF0000")
          line(out1[0],out1[1],out2[0],out2[1]);
          pop();
        }
      }

      //analyzeVelocity(compareDict["14"]);

      //analyzeDistance(compareDict["14"],compareDict["23"]);


      // for(var i = 0; i < value["points"].length-3;i++){
      //   value["splines"].push(new spline(value["points"][i],value["points"][i+1],value["points"][i+2],value["points"][i+3]));
      //   value["splines"][i].calcMat();
      // }

    }
    // for(var i = 0; i < splinearr.length;i++){
    //   for(var t = 0; t < 1; t+=.01){
    //     var out1 = splinearr[i].calcPoint(t);
    //     var out2 = splinearr[i].calcPoint(t+.01)
    //     line(out1[0],out1[1],out2[0],out2[1]);
    //   }
    // }
    drawR = false;

  }



  if(drawOur){
    console.log("draw Our")
    background("#CCFFDD");
    //console.log("running");

    var value;
    for(var key in playerDict){
      value = playerDict[key];

      // if(value["points"].length>0){
      //   drawPointArr = value["points"]
      //   //console.log(drawPointArr);
      //   drawpoints();
      // }
      color ="#"+getRandomInt(10)+getRandomInt(10)+getRandomInt(10)+getRandomInt(10)+getRandomInt(10)+getRandomInt(10);
      for(var i = 0; i < value["splines"].length;i++){
        for(var t = 0; t < 1; t+=.01){
          var out1 = value["splines"][i].calcPoint(t);
          var out2 = value["splines"][i].calcPoint(t+.01)
          push();
          stroke(color);
          line(out1[0],out1[1],out2[0],out2[1]);
          pop();
        }
      }

      //analyzeVelocity(compareDict["14"]);

      //analyzeDistance(compareDict["14"],compareDict["23"]);


      // for(var i = 0; i < value["points"].length-3;i++){
      //   value["splines"].push(new spline(value["points"][i],value["points"][i+1],value["points"][i+2],value["points"][i+3]));
      //   value["splines"][i].calcMat();
      // }

    }
    // for(var i = 0; i < splinearr.length;i++){
    //   for(var t = 0; t < 1; t+=.01){
    //     var out1 = splinearr[i].calcPoint(t);
    //     var out2 = splinearr[i].calcPoint(t+.01)
    //     line(out1[0],out1[1],out2[0],out2[1]);
    //   }
    // }
    drawOur = false;

  }

  // pointsarr.push(new controlPoint(100,400));
  // pointsarr.push(new controlPoint(80,410));
  //
  // //method of intersectoin of lines fails for:
  // // pointsarr.push(new controlPoint(200,50));
  // // pointsarr.push(new controlPoint(260,100));
  // // pointsarr.push(new controlPoint(195,150));
  // // pointsarr.push(new controlPoint(240,200));
  // console.log(pointsarr,"hih",pointsarr.length)
  // for(var i = 0; i < pointsarr.length-3;i++){
  //   splinearr.push(new spline(pointsarr[i],pointsarr[i+1],pointsarr[i+2],pointsarr[i+3]));
  //   splinearr[i].calcMat();
  // }


  if(mouseIsPressed){
    var value;
    for(var key in playerDict){
      value = playerDict[key];
      for(var i = 0; i < value["points"].length;i++){
        var point = value["points"][i];
        if(pointdist(point.x,point.y,mouseX,mouseY)<point.r*point.r*5){
          point.locate(mouseX,mouseY);
          //deprecated scale controls
          //point.splinescale.locate(mouseX/scale,mouseY/scale);
          value["splines"].forEach(function(spline,index){
            spline.calcMat();
          });
        }
      }

    }
    // pointsarr.forEach(function(point,index){
    //     if(pointdist(point.x,point.y,mouseX,mouseY)<point.r*point.r*5){
    //       point.locate(mouseX,mouseY);
    //       //deprecated scale controls
    //       //point.splinescale.locate(mouseX/scale,mouseY/scale);
    //       splinearr.forEach(function(spline,index){
    //         spline.calcMat();
    //       });
    //     }
    //   drawR = true;
    // });


    //drawR = true;
    drawOur = true;
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

function analyzeDistance(aDict,bDict){
  var averageDist = 0;
  var sum = 0;
  for(var i = 0; i < aDict["points"].length; i++){
    sum++;
    xDelta = aDict["points"][i].x - bDict["points"][i].x;
    yDelta = aDict["points"][i].y - bDict["points"][i].y;
    pDelta = Math.sqrt(xDelta*xDelta + yDelta*yDelta);
    //console.log(pDelta);
    averageDist += pDelta;
  }
  console.log("Average Distance",averageDist/sum);
}

function analyzeVelocity(dict){
  points = dict["points"];
  times = dict["times"];

  for(var i = 1; i < points.length;i++){
    xDelta = points[i].x - points[i-1].x;
    yDelta = points[i].y - points[i-1].y;
    pDelta = Math.sqrt(xDelta*xDelta + yDelta*yDelta);
    tDelta = times[i]-times[i-1];
    if(tDelta<0){
      // console.log(points[i])
      push();
      stroke("#cccccc")
      strokeWeight(4)
      fill("#00A699")
      ellipse(points[i].x,points[i].y,points[i].r);
      pop();
    }
    console.log(times[i],pDelta/tDelta);
  }
}

function getRandomInt(max) {
  return String(Math.floor(Math.random() * Math.floor(max)));
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
    // console.log("p1",p1.x,p1.y);
    // console.log("p2",p2.x,p2.y);
    // console.log("p3",p3.x,p3.y);
    // console.log("p4",p4.x,p4.y);
    t2x = .5*(p3.x-p1.x);
    t2y = .5*(p3.y-p1.y);
    t3x = .5*(p4.x-p2.x);
    t3y = .5*(p4.y-p2.y);
    // console.log("point",t2x,t2y);
    du2dx = 1/(p3.x-p2.x);
    du2dy = 1/(p3.y-p2.y);
    // console.log("u derive",du2dx,du2dy);
    du3dx = 1/(p3.x-p2.x);
    du3dy = 1/(p3.y-p2.y);
    // du3dx = 1/(p4.x-p3.x);
    // du3dy = 1/(p4.y-p3.y);
    //var pointMat = math.matrix([[p2.x,p2.y],[p3.x,p3.y],[t2x*du2dx,t2y*du2dy],[t3x*du3dx,t3y*du3dy]]);
    // this.mat = math.multiply(catmul_spline_inv,pointMat);
    var pointMat = math.matrix([[p2.x,p2.y],[p3.x,p3.y],[t2x,t2y],[t3x,t3y]]);
    this.mat = math.multiply(catmul_spline_inv,pointMat);
    //console.log(pointMat._data[2]);
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
    console.log("render")
    push();
    stroke("#cccccc")
    strokeWeight(4)
    fill("#00A699")
    ellipse(this.x,this.y,this.r);
    pop();
  }
}

function controlPoint(x,y,name){
  this.splinescale;
  this.name = name;
  this.y = y;
  this.x = x;
  this.r = 10;

  this.link = function(p){
    this.splinescale = p;
  }

  this.locate = function(x,y){
    console.log(this.name);
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



function drawpoints(){
  drawPointArr.forEach(function(point,index){
      point.render();
  });
}


//assumes data is <= 2n+1 in length
function smoothData(data,n){
    console.log(n);
    console.log("run");
    end = false;
    players = 0;
    var dict = {};
    while(!end){
        if(data[players][3] == 1){
          dict[data[players][0]+String(n)] = [[],[]];
          for(var i = 0; i < n ;i++){
            dict[data[players][0]+String(n)][0].push(parseInt(data[players][1]));
            dict[data[players][0]+String(n)][1].push(parseInt(data[players][2]));
          }
          players++;
        }
        else{
          end = true;
        }
    }
    data.forEach(function(feature,index){
      if(feature.length > 2){
        dict[feature[0]+String(n)][0].push(parseInt(feature[1]));
        dict[feature[0]+String(n)][1].push(parseInt(feature[2]));
        if(index >= data.length-players-1){
          for(var i = 0; i < n ;i++){
            dict[feature[0]+String(n)][0].push(parseInt(feature[1]));
            dict[feature[0]+String(n)][1].push(parseInt(feature[2]));
          }
        }
      }

    });

    var dataRow;
    for(var key in dict){
      dataRow = dict[key];
      for(var i = n ; i < dataRow[0].length-n;i++){
        sumx = 0;
        sumy = 0;
        for(var j = -n; j < n+1;j++){
          sumx+=dataRow[0][i+j];
          sumy+=dataRow[1][i+j];
        }
        newx = sumx/(2*n + 1);
        newy = sumy/(2*n + 1);
        dict[key][0][i] = newx;
        dict[key][1][i] = newy;
      }
    }
    return dict;



}

function pointdist(p1x,p1y,p2x,p2y){
  return (p1x-p2x)*(p1x-p2x) + (p1y-p2y)*(p1y-p2y)
}


//mouse clicked listener provided by p5.js
function mousePressed(){
  print("yeet")

}

function extractOurData(n){
  Papa.parse("./saved_data/playerData1.csv", {
    download: true,
  	complete: function(results) {
      // console.log(results.data);
      console.log("run2");
      //console.log(smoothData(results.data,0));
      outDict = smoothData(results.data,n);
      for(var key in outDict){
        ourData[key] = outDict[key];
      }
      ourData = smoothData(results.data,n);
      oComplete = true;
  	}
  });
}

function extractNFLData(){
  Papa.parse("./Big-Data-Bowl/Data/tracking_gameId_2017090700.csv", {
    download: true,
  	complete: function(results) {
      // console.log(results.data);
      nflData = results.data;
      complete = true;
  	}
  });
}

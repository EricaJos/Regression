var data = [];

var m = 1;
var b = 0;

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  background('pink');
}

function linearRegression(){
    var xsum = 0;
    var ysum = 0;

    for (var i = 0; i<data.length; i++){
        xsum+= data[i].x;
        ysum += data[i].y;
    }

    var xmean = xsum / data.length;
    var ymean = ysum / data.length;

    var numerator = 0
    denominator = 0
    for (var i = 0; i< data.length; i++){
        var x = data[i].x
        var y = data[i].y
        numerator += (x - xmean) * (y - ymean);
        denominator += (x - xmean)**2; //(x - ymean);
    }

    m = numerator/denominator
    b = ymean - (m * xmean);

}

function drawLine(){
    var x1 = 0;
    var y1 = m*x1 + b;
    var x2 = 1;
    var y2 = m*x2 + b;

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1,0,1,height,0);
    x2 = map(x2,0,1,0,width);
    y2 = map(y2,0,1,height,0);

    stroke('hotpink');
    line(x1,y1,x2,y2);

}

function mousePressed(){
    var x = map(mouseX,0, width, 0,1);
    var y = map(mouseY,0, height, 1,0);
    var point = createVector(x,y);
    data.push(point);    

}

function draw() {
    background('pink');
    for (var i = 0; i< data.length; i++){
        var x = map(data[i].x,0,1,0,width);
        var y = map(data[i].y,0,1,height,0);
        fill('black');
        ellipse(x,y,10,10);
    }
    
    if (data.length >1){
        linearRegression();
        drawLine();
    }

/*
// Define colors
  let pink = color(255, 25, 180);   // Hot pink
  let orange = color(255, 100, 0);   // Orange
  let yellow = color(255, 255, 0);   // Yellow

  // Loop through each pixel column
  for (let x = 0; x < width; x++) {
    let inter;
    let c;

    // First half: pink → orange
    if (x < width / 2) {
      inter = map(x, 0, width / 2, 0, 1);
      c = lerpColor(pink, orange, inter);
    }
    // Second half: orange → yellow
    else {
      inter = map(x, width / 2, width, 0, 1);
      c = lerpColor(orange, yellow, inter);
    }
    stroke(c);
    line(x, 0, x, height);
  }*/

}

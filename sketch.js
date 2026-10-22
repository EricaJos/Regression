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

    stroke('limegreen');
    line(x1,y1,x2,y2);

}

function mousePressed(){
    var x = map(mouseX,0, width, 0,1);
    var y = map(mouseY,0, height, 1,0);
    var point = createVector(x,y);
    data.push(point);    

}

function distanceFromLine(point) {
  var px = map(point.x, 0, 1, 0, width);
  var py = map(point.y, 0, 1, height, 0);

  var x1 = 0;
  var y1 = map(b, 0, 1, height, 0);
  var x2 = width;
  var y2 = map(m + b, 0, 1, height, 0);

  var lineLength = Math.hypot(x2 - x1, y2 - y1);
  return abs((y2 - y1) * px - (x2 - x1) * py + x2 * y1 - y2 * x1) / lineLength;
}

function draw() {
  background('pink');

  if (data.length > 1) {
    linearRegression();
  }

  var maxDistance = 0;
  for (var i = 0; i < data.length && data.length > 1; i++) {
    maxDistance = Math.max(maxDistance, distanceFromLine(data[i]));
  }

  var nearColor = color('yellow');
  var farColor = color('mediumvioletred');

  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    var amount = maxDistance > 0
      ? distanceFromLine(data[i]) / maxDistance
      : 0;

    fill(lerpColor(nearColor, farColor, amount));
    noStroke();
    ellipse(x, y, 10, 10);
  }

  if (data.length > 1) {
    drawLine();
  }
}

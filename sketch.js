
var font;
var vehicles = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {

  let myCanvas = createCanvas(windowWidth, 300);
  myCanvas.parent("container1");
  background(26, 32, 44);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var points = font.textToPoints("Hello World,I'm Sudip", 0, height / 2, 110, {
    sampleFactor: 0.65
  });
  document.getElementById("customText").addEventListener("change", changeText);
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}
function changeText() {
  var input = document.getElementById("customText").value;
  vehicles=[];
  var points = font.textToPoints(input, 0, height / 2, 110, {
    sampleFactor: 0.65
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  
  
  background(26, 32, 44);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

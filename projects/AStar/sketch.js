

let cols, rows;
let w = 20;
let grid;
let current;
let stack = [];

function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

// How many columns and rows?


// This will be the 2D array


// Open and closed set
var openSet = [];
var closedSet = [];
var canStart = false;
// Start and end
var start;
var end;
var ht;
// Width and height of each cell of grid


// The road taken
var path = [];

function fxn() {
  canStart = true;
}
function resetSketch() {
  canStart = false;
  path = [];
  openSet = [];
  closedSet = [];
  grid = new Array(cols)
  for (i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  //adding neighbours
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors();
    }
  }
  // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  // openSet starts with beginning only
  openSet.push(start);
}
function setup() {
  var canvas = createCanvas(windowWidth - 50, windowHeight - 50);
  canvas.parent("p5Container")

  cols = floor(width / w);
  rows = floor(height / w);
  ht = document.getElementById("alertbox");
  document.getElementById("startBtn").addEventListener("click", fxn);
  resetSketch();
  document.getElementById("refreshBtn").addEventListener("click", resetSketch)
}

function mouseDragged() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].checkClicked(mouseX, mouseY);
    }
  }

}

function draw() {
  // Am I still searching?
  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  findpath(canStart);
  noStroke();
  fill("#2b78fe");
  rect(0, 0, w, w);
  noStroke();
  fill("#BC4B51");
  rect(cols * w - w, rows * w - w, w, w);
}

function findpath(b) {
  if (b) {
    if (openSet.length > 0) {

      // Best next option
      var winner = 0;
      for (var i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }
      var current = openSet[winner];

      // Did I finish?
      if (current === end) {
        noLoop();
        console.log("DONE!");
        
      }

      // Best option moves from openSet to closedSet
      removeFromArray(openSet, current);
      closedSet.push(current);

      // Check all the neighbors
      var neighbors = current.neighbors;
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        // Valid next spot?
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          var tempG = current.g + heuristic(neighbor, current);

          // Is this a better path than before?
          var newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }

          // Yes, it's a better path
          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }

      }
      // Uh oh, no solution
    } else {
      console.log('no solution');
      noLoop();
      
      createP("No solution found !!!",);
     
      return;
    }


    for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color("#63b3ed"));
    }

    for (var i = 0; i < openSet.length; i++) {
      openSet[i].show(color("#bee3f8"));
    }


    // Find the path by working backwards
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }

    // Drawing path as continuous line
    noFill();
    stroke("#2a4365");
    strokeWeight(w / 4);
    beginShape();
    for (var i = 0; i < path.length; i++) {
      vertex(path[i].i * w + w / 2, path[i].j * w + w / 2);
    }
    endShape();
  }
}

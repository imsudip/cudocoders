

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.wall = false;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors =[];

  // Where did I come from?
  this.previous = undefined;


  this.checkClicked = function (x1, y1) {
    if (!this.wall) {
      let x = this.i * w;
      let y = this.j * w;
      if (x1 >= x && x1 <= x + w && y1 >= y && y1 <= y + w) {
        this.wall = true;
      }
    }

  }
  this.show = function (col) {
    let x = this.i * w;
    let y = this.j * w;
    strokeWeight(0.5)
    stroke("#3182ce");
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.wall) {
      noStroke();
      fill("#1a202c");
      rect(x, y, w, w);
    }else if(col){
      fill(col);
      rect(x, y, w, w);
    }

  }
  //add neighbours
  this.addNeighbors = function () {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}

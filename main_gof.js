let x_axis;
let y_axis;
let grid;
let resolution = 5;

function make_2d_array(x_axis, y_axis) {
  let arr = new Array(x_axis);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(y_axis);
  }
  return arr;
}
function setup() {
  createCanvas(500,1000);
  x_axis = width / resolution;
  y_axis = height / resolution;
  grid = make_2d_array(x_axis, y_axis);
  for (let i = 0; i < x_axis; i++) {
    for (let j = 0; j < y_axis; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return grid;
}

function draw() {
  background(255);
  for (let i = 0; i < x_axis; i++) {
    for (let j = 0; j < y_axis; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(100,100,255);
        rect(x, y, resolution, resolution);
      }
    }
  }

  let next = make_2d_array(x_axis, y_axis);
  for (let i = 0; i < x_axis; i++) {
    for (let j = 0; j < y_axis; j++) {
     
      
        let sum = 0;
        let nighbors = count_nighbors(grid, i, j);

        let state = grid[i][j];

        if (state == 0 && nighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (nighbors < 2 || nighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        } 
      }
    }
    grid=next
  }
  

function count_nighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
       let col = (x+i+x_axis) % x_axis
       let row = (y + j +  y_axis) % y_axis

      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;

}

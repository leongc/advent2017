/*
http://adventofcode.com/2017/day/3
--- Day 3: Spiral Memory ---
You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?
*/

const day3input = 289326;

function spiral(n) {
  var x = 0;
  var y = 0;
  var step = 1;
  var heading_steps = 0;
  var heading_max = 1;
  function east() {
    x += 1;
  }
  function north() {
    y += 1;
  }
  function west() {
    x -= 1;
  }
  function south() {
    y -= 1;
  }
  var heading = east;

  while (n > step) {
    if (heading_steps >= heading_max) {
      heading_steps = 0;
      if (heading === east) {
        heading = north;
      } else if (heading === north) {
        heading = west;
        heading_max++;
      } else if (heading === west) {
        heading = south;
      } else { // assume heading === south
        heading = east;
        heading_max++;
      }
    }
    heading.apply(this);
    step++;
    heading_steps++;
  }
  return Math.abs(x) + Math.abs(y);
}

console.assert(spiral(1) === 0);
console.assert(spiral(12) === 3);
console.assert(spiral(23) === 2);
console.assert(spiral(1024) === 31);

spiral(day3input);

/*
--- Part Two ---
As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?
*/
function key(x, y) {
  return x + ',' + y;
}
var value_map = {};
value_map[key(0, 0)] = 1;
function get_value(i, j) {
  return value_map[key(i, j)] || 0;
}

function spiral_sum(n) {
  var x = 0;
  var y = 0;
  var step = 1;
  var heading_steps = 0;
  var heading_max = 1;
  function east() {
    x += 1;
  }
  function north() {
    y += 1;
  }
  function west() {
    x -= 1;
  }
  function south() {
    y -= 1;
  }
  var heading = east;
  function neighbor_sum() {
    return get_value(x-1, y-1)
      + get_value(x, y-1)
      + get_value(x+1, y-1)
      + get_value(x-1, y)
      // skip self
      + get_value(x+1, y)
      + get_value(x-1, y+1)
      + get_value(x, y+1)
      + get_value(x+1, y+1);
  }

  var value;
  while (n > step) {
    if (heading_steps >= heading_max) {
      heading_steps = 0;
      if (heading === east) {
        heading = north;
      } else if (heading === north) {
        heading = west;
        heading_max++;
      } else if (heading === west) {
        heading = south;
      } else { // assume heading === south
        heading = east;
        heading_max++;
      }
    }
    heading.apply(this);
    step++;
    heading_steps++;
    if (value_map[key(x, y)] === undefined) {
      value_map[key(x, y)] = neighbor_sum();
    }
  }
  return get_value(x, y);
}

console.assert(spiral_sum(1) === 1);
console.assert(spiral_sum(2) === 1);
console.assert(spiral_sum(3) === 2);
console.assert(spiral_sum(4) === 4);
console.assert(spiral_sum(5) === 5);

console.assert(spiral_sum(23) === 806);

var expected = [1, 1, 2, 4, 5, 10, 11, 23, 25, 26, 54, 57, 59, 122, 133, 142, 147, 304, 330, 351, 362, 747, 806];
for (var n = 0; n < expected.length; n++) {
  console.assert(spiral_sum(n+1) === expected[n], "expected spiral sum %d for step %d", expected[n], n+1);
}

function larger_sum(target) {
  var step = 1;
  var value;
  do {
    value = spiral_sum(step++);
  } while (value <= target);
  return value;
}
console.assert(larger_sum(1) === 2);
console.assert(larger_sum(2) === 4);
console.assert(larger_sum(4) === 5);
console.assert(larger_sum(805) === 806);

larger_sum(day03input);

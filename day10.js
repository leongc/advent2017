/*
http://adventofcode.com/2017/day/10
--- Day 10: Knot Hash ---
You come across some programs that are trying to implement a software emulation of a hash based on knot-tying. The hash these programs are implementing isn't very strong, but you decide to help them anyway. You make a mental note to remind the Elves later not to invent their own cryptographic functions.

This hash function simulates tying a knot in a circle of string with 256 marks on it. Based on the input to be hashed, the function repeatedly selects a span of string, brings the ends together, and gives the span a half-twist to reverse the order of the marks within it. After doing this many times, the order of the marks is used to build the resulting hash.

  4--5   pinch   4  5           4   1
 /    \  5,0,1  / \/ \  twist  / \ / \
3      0  -->  3      0  -->  3   X   0
 \    /         \ /\ /         \ / \ /
  2--1           2  1           2   5
To achieve this, begin with a list of numbers from 0 to 255, a current position which begins at 0 (the first element in the list), a skip size (which starts at 0), and a sequence of lengths (your puzzle input). Then, for each length:

Reverse the order of that length of elements in the list, starting with the element at the current position.
Move the current position forward by that length plus the skip size.
Increase the skip size by one.
The list is circular; if the current position and the length try to reverse elements beyond the end of the list, the operation reverses using as many extra elements as it needs from the front of the list. If the current position moves past the end of the list, it wraps around to the front. Lengths larger than the size of the list are invalid.

Here's an example using a smaller list:

Suppose we instead only had a circular list containing five elements, 0, 1, 2, 3, 4, and were given input lengths of 3, 4, 1, 5.
*/
function makeList(size) {
  var result = [];
  for (let i = 0; i < size; i++) {
    result[i] = i;
  }
  return result;
}
console.assert(makeList(5).toString() == [0,1,2,3,4].toString());
/*
The list begins as [0] 1 2 3 4 (where square brackets indicate the current position).
The first length, 3, selects ([0] 1 2) 3 4 (where parentheses indicate the sublist to be reversed).
After reversing that section (0 1 2 into 2 1 0), we get ([2] 1 0) 3 4.
*/
function copyAround(original, start, replacement) {
  var result = Array.from(original);
  for (let i=0; i < replacement.length; i++) {
    result[(start + i) % result.length] = replacement[i];
  }
  return result;
}
console.assert(copyAround(makeList(4), 2, [7, 8, 9]).toString() == [9, 1, 7, 8].toString());

function twist(list, lengths) {
  var head = 0;
  var skip = 0;
  var result = list;
  for (let i = 0; i < lengths.length; i++) {
    var len = lengths[i];
    var sub;
    if (head + len <= result.length) {
      sub = result.slice(head, head+len);
    } else {
      sub = result.slice(head).concat(result.slice(0, head + len - result.length));
    }
    result = copyAround(result, head, sub.reverse());
    head = (head + len + skip) % result.length;
    skip++;
  }
  return result;
}
console.assert(twist(makeList(5), [3]).toString() == [2, 1, 0, 3, 4].toString());
/*
Then, the current position moves forward by the length, 3, plus the skip size, 0: 2 1 0 [3] 4. Finally, the skip size increases to 1.
The second length, 4, selects a section which wraps: 2 1) 0 ([3] 4.
The sublist 3 4 2 1 is reversed to form 1 2 4 3: 4 3) 0 ([1] 2.
*/
console.assert(twist(makeList(5), [3, 4]).toString() == [4, 3, 0, 1, 2].toString());
/*
The current position moves forward by the length plus the skip size, a total of 5, causing it not to move because it wraps around: 4 3 0 [1] 2. The skip size increases to 2.
The third length, 1, selects a sublist of a single element, and so reversing it has no effect.
The current position moves forward by the length (1) plus the skip size (2): 4 [3] 0 1 2. The skip size increases to 3.
*/
console.assert(twist(makeList(5), [3, 4, 1]).toString() == [4, 3, 0, 1, 2].toString());
/*
The fourth length, 5, selects every element starting with the second: 4) ([3] 0 1 2. Reversing this sublist (3 0 1 2 4 into 4 2 1 0 3) produces: 3) ([4] 2 1 0.
Finally, the current position moves forward by 8: 3 4 2 1 [0]. The skip size increases to 4.
*/
console.assert(twist(makeList(5), [3, 4, 1, 5]).toString() == [3, 4, 2, 1, 0].toString());

/*
In this example, the first two numbers in the list end up being 3 and 4; to check the process, you can multiply them together to produce 12.

However, you should instead use the standard list size of 256 (with values 0 to 255) and the sequence of lengths in your puzzle input. Once this process is complete, what is the result of multiplying the first two numbers in the list?

http://adventofcode.com/2017/day/10/input
*/
const day10input = [189,1,111,246,254,2,0,120,215,93,255,50,84,15,94,62];
var twisted = twist(makeList(256), day10input);
console.log(twisted[0] * twisted[1]);

/*
http://adventofcode.com/2017/day/24
--- Day 24: Electromagnetic Moat ---
The CPU itself is a large, black building surrounded by a bottomless pit. Enormous metal tubes extend outward from the side of the building at regular intervals and descend down into the void. There's no way to cross, but you need to get inside.

No way, of course, other than building a bridge out of the magnetic components strewn about nearby.

Each component has two ports, one on each end. The ports come in all different types, and only matching types can be connected. You take an inventory of the components by their port types (your puzzle input). Each port is identified by the number of pins it uses; more pins mean a stronger connection for your bridge. A 3/7 component, for example, has a type-3 port on one side, and a type-7 port on the other.

Your side of the pit is metallic; a perfect surface to connect a magnetic, zero-pin port. Because of this, the first port you use must be of type 0. It doesn't matter what type of port you end with; your goal is just to make the bridge as strong as possible.

The strength of a bridge is the sum of the port types in each component. For example, if your bridge is made of components 0/3, 3/7, and 7/4, your bridge has a strength of 0+3 + 3+7 + 7+4 = 24.

For example, suppose you had the following components:

0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
With them, you could make the following valid bridges:

0/1
0/1--10/1
0/1--10/1--9/10
0/2
0/2--2/3
0/2--2/3--3/4
0/2--2/3--3/5
0/2--2/2
0/2--2/2--2/3
0/2--2/2--2/3--3/4
0/2--2/2--2/3--3/5
(Note how, as shown by 10/1, order of ports within a component doesn't matter. However, you may only use each port on a component once.)

Of these bridges, the strongest one is 0/1--10/1--9/10; it has a strength of 0+1 + 1+10 + 10+9 = 31.

What is the strength of the strongest bridge you can make with the components you have available?

http://adventofcode.com/2017/day/24/input
*/

const day24input = [
"48/5",
"25/10",
"35/49",
"34/41",
"35/35",
"47/35",
"34/46",
"47/23",
"28/8",
"27/21",
"40/11",
"22/50",
"48/42",
"38/17",
"50/33",
"13/13",
"22/33",
"17/29",
"50/0",
"20/47",
"28/0",
"42/4",
"46/22",
"19/35",
"17/22",
"33/37",
"47/7",
"35/20",
"8/36",
"24/34",
"6/7",
"7/43",
"45/37",
"21/31",
"37/26",
"16/5",
"11/14",
"7/23",
"2/23",
"3/25",
"20/20",
"18/20",
"19/34",
"25/46",
"41/24",
"0/33",
"3/7",
"49/38",
"47/22",
"44/15",
"24/21",
"10/35",
"6/21",
"14/50"
];

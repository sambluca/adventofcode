import { exercise2 } from ".";
import { data } from "./data";

console.log("res", exercise2(data));
// var parsed = data.split("\n\n");

// var seeds = parsed[0]
//   .split(": ")[1]
//   .split(" ")
//   .map((i) => parseInt(i, 10));

// var maps = parsed.slice(1).map((i) => {
//   var split = i.split("\n");
//   var copy = split.slice(1);
//   return [split[0], copy.map((i) => i.split(" ").map((i) => parseInt(i, 10)))];
// });

// function getLocation(seed) {
//   var current = seed;
//   for (var i = 0; i < maps.length; i++) {
//     var currentMaps = maps[i][1] as any;
//     for (var j = 0; j < currentMaps.length; j++) {
//       var currentMap = currentMaps[j];
//       var lower = currentMap[1];
//       var upper = currentMap[1] + currentMap[2];
//       if (current >= lower && current <= upper) {
//         current = current - lower + currentMap[0];
//         break;
//       }
//     }
//   }
//   return current;
// }

// seeds = seeds.reduce((prev, curr, index) => {
//   if (!(index % 2)) {
//     prev.push([curr]);
//   } else {
//     var popped = prev.pop();
//     popped.push(curr);
//     prev.push(popped);
//   }
//   return prev;
// }, []);

// console.log("seeds", seeds);
// // var lowest = Number.POSITIVE_INFINITY;
// // var theseed = 0;
// // for (var j = 0; j < seeds.length; j++) {
// //   for (var i = seeds[j][0]; i < seeds[j][0] + seeds[j][1]; i++) {
// //     var res = getLocation(i);
// //     if (res < lowest) {
// //       lowest = res;
// //       theseed = i;
// //     }
// //   }
// //   console.log("round", j, lowest);
// // }

// // console.log("done!", lowest);

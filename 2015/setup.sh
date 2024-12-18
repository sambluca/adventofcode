#!/bin/bash
echo "Advent of Code set up"
read -p "day -- " day

mkdir src/$day

DATA=$(curl -H "Cookie: session=53616c7465645f5fe61a32b265563b71c96751cc1a51489fa1f18a5e16d3ba9adb73092d877395b7e0c67a394d08d6065a94fdf398ed7af57289ed8445a52792" "https://adventofcode.com/2015/day/$day/input" -o src/$day/data.txt)

echo "$DATA"
cp template/data.template src/$day/data.ts

sed -i -e "s/REPLACE/$day/g" src/$day/data.ts

rm src/$day/data.ts-e

cp template/index.template src/$day/index.ts
cp template/test.template src/$day/$day.test.ts

echo "Day set up"

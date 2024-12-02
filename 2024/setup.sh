#!/bin/bash
echo "Advent of Code set up"
read -p "day -- " day

mkdir src/$day
cp template/data.template src/$day/data.ts
cp template/index.template src/$day/index.ts
cp template/test.template src/$day/$day.test.ts

echo "Day set up"
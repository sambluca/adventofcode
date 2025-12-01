#!/bin/bash
echo "Advent of Code set up"
read -p "day -- " day

mkdir src/$day

DATA=$(curl -H "Cookie: session=53616c7465645f5fd1be6ca6eb47c701cabdcf15a7c0d41f3b293348cc75b6c407a4decb57283cee88a1f2b0c290b734b00bb47ca3a7789c957b784d2cea56c5" "https://adventofcode.com/2025/day/$day/input" -o src/$day/data.txt)

echo "$DATA"
cp template/data.template src/$day/data.ts

sed -i -e "s/REPLACE/$day/g" src/$day/data.ts

rm src/$day/data.ts-e

cp template/index.template src/$day/index.ts
cp template/test.template src/$day/$day.test.ts

echo "Day set up"

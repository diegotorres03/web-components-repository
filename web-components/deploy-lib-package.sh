#!bin/bash

npm run deploy:prod

echo "moving files"

cp package.json dist/package.json

cp src/global/web-tools.js dist/web-tools.js




# linear-server

How i started

    - npm init -y
    - npm i -D typescript ts-node nodemon @types/node @types/express
    - tsc --init or past same tsconfig.json; - then setup package.json

"scripts": {
"start": "node dist/app.js",
"dev": "nodemon src/app.ts",
"build": "tsc -p ."
},

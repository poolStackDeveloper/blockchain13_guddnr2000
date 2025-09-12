// const {add,a,b,c,comments} = require("./add.js");
const fs = require('fs');
// console.log(add(1,2));
// console.log(a);
// console.log(b);
// console.log(c);

// const commentCopy = comments;

// commentCopy.userId = "guddnr1234";

// console.log(comments);

// console.log(__filename);
// console.log(__dirname);

// const readmePath = path.join(__dirname, "./public/js/README.md");
// const data = readFileSync(__dirname,"utf-8");
// console.log(data);
    
// console.log(process.API_KEY);
console.log(fs.readFileSync("README.md","utf-8"));
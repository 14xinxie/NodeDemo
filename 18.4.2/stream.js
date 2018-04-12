let fs = require("fs");

let ws1 = fs.createWriteStream(__dirname+"/"+"output1.txt","utf-8");

ws1.write("使用Stream1写入文本数据");
ws1.end();

let rs = fs.createReadStream(__dirname+"/"+"output1.txt");
let ws = fs.createWriteStream(__dirname+"/"+"output2.txt");

rs.pipe(ws);

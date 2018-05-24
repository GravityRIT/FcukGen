const express = require("express");
const app = express();
var path = require('path');

const secure = require('express-force-https');
app.use(secure);

app.use(express.json());
app.set("port", process.env.PORT || 3002);
app.use(express.static("static"));

app.get("/gen/:doc",(req,res)=>{
    const gen = require('./functions/generator');
    const result = gen(req.params.doc);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ result: result }));
});
app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname + '/static/404.html'));
});
app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});

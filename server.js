const express = require("express");
const app = express();

app.use(express.json());
app.set("port", process.env.PORT || 3001);
app.use(express.static("static"));

app.get("/gen/:doc",(req,res)=>{
    const gen = require('./functions/generator');
    const result = gen(req.params.doc);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ result: result }));
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
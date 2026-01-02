const express = require('express'); 
const path = require('path');
const app = express();
// const cors = require("cors");

app.use(express.urlencoded({ extended : true })); //from 해석하기 위해 필요
// app.use(cors());
app.use(express.json());
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

let db = []; //임시 데이터베이스

app.get("/", (req,res) => {
    res.render("index", {db});
});

app.get("/PostCreator", (req, res) => {
    res.render("createFile");
});

app.post("/newFile", (req, res) => {
    const text = req.body.text;
    const title = req.body.title;
    console.log(title, text);
    db.push({title: title, text: text});
    res.redirect("/");
});

app.listen(8080, function(){
    console.log("포트 8080에서 서버 대기중");
});
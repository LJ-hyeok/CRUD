const express = require('express'); 
const path = require('path');
const app = express();
// const cors = require("cors");

app.use(express.urlencoded({ extended : true })); //from 해석하기 위해 필요
// app.use(cors());
app.use(express.json());
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

let db = [
    {
        title: "첫 번째 포스트",
        text: "첫 포스트입니당 하하하"
    },
    {
        title: "두 번째",
        text: "우효효효"
    },
]; //임시 데이터베이스

app.get("/", (req,res) => {
    res.render("index", {db});
});

app.get("/PostCreator", (req, res) => {
    res.render("createFile");
});

app.post("/newFile", (req, res) => {
    const text = req.body.text;
    const title = req.body.title;
    db.push({title: title, text: text});
    res.redirect("/");
});

app.get("/detail/:id", (req, res) => {
    const title = req.params.id;
    const index = db.findIndex((item) => item.title === title);
    const text = db[index].text;
    res.render("readFile", {title, text});
});

app.listen(8080, function(){
    console.log("포트 8080에서 서버 대기중");
});
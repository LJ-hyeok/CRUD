const { error } = require('console');
const { name } = require('ejs'); //?
const express = require('express'); 
const mongoose = require('mongoose'); // mongoDB 실습
const path = require('path');
const { title } = require('process');
const app = express();
// const cors = require("cors");

// app.use(cors());
app.use(express.urlencoded({ extended : true })); //from 해석하기 위해 필요
app.use(express.json());
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

mongoose.connect('mongodb://localhost:27017/Blog-data')
.then( () => console.log("성공"))
.catch( err => console.error("연결 실패",err));


const PostSchema = mongoose.Schema({
    title: String,
    content: String,
    //글 주인, 날짜, 등등 기타 정보
})

const Post = mongoose.model('Post', PostSchema);

app.get("/", async(req,res) => {
    try{
        const allPosts = await Post.find();
        res.render("index", {db : allPosts});
    } catch (error){ console.log(error);res.status(500).send("error");}
});

app.post("/PostCreator", (req, res) => {
    res.render("createFile");
});

app.post("/newFile", async (req, res) => {
    try {
        const text = req.body.text;
        const title = req.body.title;
        await Post.create({
            title: title,
            content: text
        });
        res.redirect("/");
    } catch(error){ console.log(error);res.status(500).send("error");}
}); 

app.get("/list/:id", async (req, res) => {
    try{
        const index = req.params.id;
        const foundPost = await Post.findById(index);
        res.render("readFile", {data : foundPost});
    } catch (error){ console.log(error);res.status(500).send("error");}
});

app.post("/PostEdit", async (req,res) => {
    try{
        const index = req.body.index;
        const foundPost = await Post.findById(index);
        res.render("editFile", {data : foundPost});
    } catch (error){ console.log(error);res.status(500).send("error");}
});

app.post("/PostUpdate", async (req, res) => {
    try{
        const index = req.body.index
        await Post.findByIdAndUpdate(index, { // 글 수정 권한 있는지는 생략
            title : req.body.title,
            content : req.body.text
    });
    res.redirect("/");
    } catch (error){ console.log(error);res.status(500).send("error");}
});

app.post("/PostDelete", async (req, res) => {
    try{
        const index = req.body.index;
        await Post.findByIdAndDelete(index);
        res.redirect("/");
    } catch (error){ console.log(error);res.status(500).send("error");}
});

app.listen(8080, function(){
    console.log("포트 8080에서 서버 대기중");
});
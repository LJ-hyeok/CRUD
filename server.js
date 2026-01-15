const { error } = require('console');
const { name } = require('ejs'); //?
const express = require('express'); 
const mongoose = require('mongoose'); // mongoDB 실습
const path = require('path');
const app = express();
// const cors = require("cors");

// app.use(cors());
app.use(express.urlencoded({ extended : true })); //from 해석하기 위해 필요
app.use(express.json());
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

mongoose.connect('mongodb://localhost:27017')
.then( () => console.log("성공"))
.catch( err => console.error("연결 실패",err));

const StudentSchema = mongoose.Schema({
    id: Number,
    name: String,
    major: String
});

const Student = mongoose.model('Student', StudentSchema);


let postId = 1;
let db = [
    {
        id: postId++,
        title: "첫 번째 포스트",
        text: "첫 포스트입니당 하하하"
    },
    {
        id: postId++,
        title: "두 번째",
        text: "우"
    },
]; //임시 데이터베이스


app.get("/", (req,res) => {
    res.render("index", {db});
});

app.post('/students', async (req, res) => {
  try {
    // 클라이언트가 보낸 데이터(req.body)로 새 학생 모델 생성
    const newStudent = new Student(req.body);
    // DB에 저장
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  console.log("저장 완료");
});

app.get('/students/find', async (req, res) => {
    try {
        const students = await Student.find(); // 조건 없이 다 찾기
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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
    res.render("readFile", {title, text, index});
});

app.post("/PostEdit", (req,res) => {
    const index = Number(req.body.index);
    const title = db[index].title;
    const text = db[index].text;
    res.render("editFile", {index, title, text});
});

app.post("/Update", (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const index = req.body.index;
    db[index]={title: title, text: text}
    res.redirect("/");
});

app.post("/PostDelete", (req, res) => {
    const index = req.body.index;
    db.splice(index, 1);
    res.redirect("/");
});

app.listen(8080, function(){
    console.log("포트 8080에서 서버 대기중");
});

//중복 제목 방지에 대한 방법이 필요


//curl -X POST http://localhost:8080/students
//curl http://localhost:8080/students
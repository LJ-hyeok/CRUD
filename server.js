const express = require('express'); 
const app =express();
//const cors = require("cors");

//app.use(express.urlencoded({ extended : true }));
//app.use(cors());
app.use(express.json());
app.set('view engine','ejs');

app.listen(8080, function(){
    console.log("포트 8080에서 서버 대기중");
});

app.get('/search', function(req, res){ 
    const query = req.query.q;
    res.render('get_result', { query });
});
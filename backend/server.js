var express = require('express');
var mysql = require('mysql');
var cors = require('cors')
var app = express();
var port = process.env.port || 5000;
var path = require('path')


//Create connection

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'social-app'
});


//Connect


db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    
    console.log('Mysql connected')
})


app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


app.get('/login', (req,res) => {
    let sql = 'SELECT * FROM user';
    
    db.query(sql, (err,result) => {
        if(err) console.log(err);
        
        res.send(result)
    })
})

app.get("/users", (req, res) => {
    let sql = "SELECT * FROM user u, user_bio b WHERE u.idUser=b.iduser_bio";
    db.query(sql, (err,result) => {
        if(err) console.log(err);
        
        res.send(result)
    })

})

app.get("/comment/:pid", (req, res) => {
    let sql = `SELECT c.content, c.date, u.username FROM comment c, user u WHERE c.idpost=${req.params.pid} && u.idUser=c.idAut`;
    db.query(sql, (err,result) => {
        if(err) console.log(err);
        
        res.send(result)
    })
})

app.post("/chat/:uid1", (req, res) => {
    let sql =`select m.content ,m.idsender from convo c, message m WHERE ((c.user1=${req.params.uid1} && c.user2=${req.body.idUser2}) || (c.user1=${req.body.idUser2} && c.user2=${req.params.uid1})) && m.idconvo=c.idconvo `;
    console.log(sql);
    db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.send(result)
    })
})
app.post('/register', function(req, res){
    
    let sql = "INSERT INTO user (username, email, password, name, surname) VALUES \
     ('"+req.body.username+"','"+req.body.email+"','"+req.body.password+"','"+req.body.name+"','"+req.body.last_name+"')";
    db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.send(result)
    })
})



app.get('/posts', function(req,res){
    
    let sql = "SELECT u.username, p.likes , p.type ,p.caption ,p.idpost  ,p.img_url FROM post p, user u WHERE u.idUser = p.idAut";
    console.log("tu")
    db.query(sql, (err,result) => {
        if(err) console.log('err');
        
        
        res.send(result);
    })
})

app.get('/user/:uid', function(req, res){
    console.log(req)
    let sql = `SELECT * FROM user_bio u WHERE u.iduser_bio=${req.params.uid}`;
    console.log(sql)
    db.query(sql, (err,result) => {
        if(err) console.log('err');
        
        
        res.send(result);
    })
})

app.get('/posts/:uid', function(req, res){
    let sql = `SELECT u.username, p.likes, p.type ,p.img_url, p.caption FROM user u, post p WHERE p.idAut=${req.params.uid} && u.idUser=${req.params.uid}`;
    db.query(sql, (err,result) => {
        if(err) console.log('err');
        
        res.send(result);
    })
})

app.post('/likepost', function(req,res){
    
    let sql = "UPDATE post SET likes =" + req.body.likes + " WHERE idpost = " + req.body.postId;
    console.log(sql)
    db.query(sql, (err,result) => {
        if(err) console.log(err);
        
        res.send(result);
    })
})

app.post('/user', function(req,res){
    let sql ="SELECT * FROM user_bio WHERE iduser_bio=" + req.body.userId +";";
    console.log(sql)
    db.query(sql, (err,result) => {
        if(err) console.log(err);
        
        res.send(result);
    })
})



app.listen(port, () => {
    console.log("Server is running on: " + port)
})



//import add_doctor from "./views/add_doctor.ejs"

const express = require('express')
const app = express()
const port = 3001

///connection with mysql database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'collage_system'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
  }
});

///for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
const connectLivereload = require("connect-livereload");
const { error } = require('console')
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 

app.set('view engine', 'ejs')
app.use(express.static('public'))

//viewsبتعامل كان انا واقف داخل فولدر 
app.get("/", (req, res) => {
    res.render("Home")
});

app.get("/login", (req, res) => {
    res.render("Login")
});
app.get("/student_home", (req, res) => {
  let sql="SELECT * FROM student";
  let query=connection.query(sql,(err,rows)=>{
    if(err) throw err;
    res.render("student_home",{
    student:rows

    });

  });
    
});
app.get("/doctor_home", (req, res) => {
  let sql="SELECT * FROM doctor";
  console.log();
  let query=connection.query(sql,(err,rows)=>{
    if(err) throw err;
    res.render("doctor_home",{
   doctor: rows
    });
  
  });
});


app.get('/editdoctor/:userId',(req,res)=>{
  const userId=req.params.userId;
  let sql=`Select * from doctor where id = ${userId}`;
  let query=connection.query(sql,(err,result) =>{
    if(err) throw err;
    res.render('doctor_edit',{
    doctor:result[0]


    });

  });

});

/*app.get('/deletedoctor/:userId',(req,res)=>{
  const userId=req.params.userId;
  let sql=`delete from doctor where id = ${userId}`;
  let query=connection.query(sql,(err,result) =>{
    if(err) throw err;
    res.redirect("/")

    });
  });*/


  app.get('/add',(req,res)=>{
    res.render("add_doctor")
  });
 app.post("/save",(req,res)=>{
  let data={doctor_Fname:req.params.doctor_Fname,doctor_Lname:req.params.Lname,Email:req.params.Email,
             doctor_password:req.params.doctor_password,Id:req.params.Id};
  let sql="INSERT INTO doctor SET ? "
  let query=connection.query(sql,data,(err,result)=>{
    if(err) throw err;
      res.redirect('doctor_home');
    });
    res.redirect('doctor_home');
  });
 
app.get("/admin_home", (req, res) => {
  let sql="SELECT * FROM admin"
  let query=connection.query(sql,(err,rows)=>{
    if(err) throw err;
    res.render("admin_home",{
    admin:rows  
    })

  })
  
});
app.get("/upload", (req, res) => {
  res.render("upload")
});
app.get("/add_doctor", (req, res) => {
  res.render("add_doctor")
});
app.get("/add_department", (req, res) => {
  res.render("add_department")
});
app.get("/add_cource", (req, res) => {
  res.render("add_material")
});

///404 error
/*app.use((req, res) => {
    res.status(404).send("sorry can't find that!")
});*/
  




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

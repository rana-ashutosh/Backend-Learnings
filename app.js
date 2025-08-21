const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

const userModel = require('./models/user');

app.get('/', (req, res) => {
     bcrypt.compare("ashu", "$2b$10$f5QByTJy/wAo21dRfqoTd.gqtXC5Av1Zi6mrPXSLQu0PA08vcybVi", function(err, result) {
      console.log(result)
});
   });
    
app.post('/create', async (req, res) => {
   let {name, email, image} = req.body;
   
   let createdUser = await userModel.create({
      name, email, image
   })
   
   res.redirect('/read');
});
   
app.get('/read', async(req, res) => {
   let allusers = await userModel.find();

   res.render('read', {allusers});
});
   
app.get('/edit/:userid', async (req, res) => {
   let user = await userModel.findOne({_id: req.params.userid});
   res.render("edit", {user});
});

app.post('/update/:userid', async (req, res) => {
   let {image, name, email} = req.body;
   let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {image, name, email}, {new:true});
   res.redirect("/read");
});

app.get('/delete/:id', async(req, res) => {
   let deleteUser = await userModel.findOneAndDelete({_id: req.params.id});
   res.redirect('/read');
});

app.get('/cookies', function (req, res) {
   res.cookie('name', 'ashutosh');
   res.send('done')
});

app.get('/cookieRead', function (req, res) {
   console.log(req.cookies);
   res.send('read page');
});

app.listen(3000);
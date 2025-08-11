const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// const useModel = require('./userModel');
const userModel = require('./models/user')

app.get('/', (req, res) => {
     res.render('index');
   });
    
// Create, Read, Update, Delete
// app.get('/create', async (req, res) => {
//   let user = await useModel.create({
//     name:"ashu",
//     username: 'ashu@123',
//     email: 'ashu123@gmail.com'
//    });

//    res.send(user);

// });

app.get('/read', async(req, res) => {
   let allusers = await userModel.find();

   res.render('read', {allusers});
});

app.get('/delete/:id', async(req, res) => {
   let deleteUser = await userModel.findOneAndDelete({_id: req.params.id});
   res.redirect('/read');
});

app.post('/create', async (req, res) => {
    let {name, email, image} = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    })

    res.redirect('/read');
})

// app.get('/update', async (req, res) => {
//     let updatedUser = await useModel.findOneAndUpdate({username: 'ashu@123'}, {name: 'Ashutosh Rana'}, {new: true});
    
//     res.send(updatedUser);
   
// });

// app.get('/delete', async (req, res) => {
//     let deleteUser = await userModel.findOneAndDelete({username: 'ashu@123'});

//     res.send(deleteUser);
// });



app.listen(3000);
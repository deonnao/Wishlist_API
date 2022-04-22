//dotevn library

const express = require('express') //express library
const { json } = require('express/lib/response')
const mongoose = require('mongoose') //mongoose library
const app = express() //creates app variable to configure server


//Create connection to database
mongoose.connect('mongodb://localhost/wishlist')
const db = mongoose.connection

//Connect to mongoDB
db.on('error' , (error) => console.error('Could not connect to database')) //did not connect
db.once('open' , (open) => console.log('Database connected')) //successfully connected

//sets up server to accept json
app.use(express.json())
//app.use will allow us to accept any middleware that we want
//.json() allows us to accept json as a body instead of POST, GET, etc

 //items router 
const itemsRouter = require('./routes/itemRoutes')
//--routes all of our item information to the specified path

 //tell our app that we want to use that route on line 19
app.use('/itemRoutes' , itemsRouter)
// /itemsRoutes -- whenever we query this path

 //port we want to listen on. This will display whenever the server starts
 app.listen(3000, () => console.log('Server started'))
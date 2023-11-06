const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')

require('./config/db-setup')

const app = express();
app.use(express.json());

app.use(cookieParser());
const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:3000',
   credentials:true,            
   optionSuccessStatus:200,
   opt:{}
}   
app.use(cors(corsOptions))

// app.use(cookieSession({
//     name: 'ession',
//     keys: ['key1', 'key2'],
//     secret: 'opemgotngotng',
//     resave : false,
//     saveUninitialized: false,
//     cookie : {secure : false},
// }));

dotenv.config({path : './config.env'})
const PORT = process.env.BACKEND_PORT;

const authRoute = require('./routes/auth');
const articleRoute = require('./routes/article');
const commentRoute = require('./routes/comment');

app.get('/', (req, res)=>{
    
})

app.use('/auth', authRoute);
app.use('/article', articleRoute);
app.use('/comment', commentRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}!`);
})
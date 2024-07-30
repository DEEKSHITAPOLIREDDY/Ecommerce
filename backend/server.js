import express from 'express'
import dotenv from 'dotenv'
import connectdb from './db/db.js';
import router from './db/router/authrouter.js';
import cors from 'cors'
dotenv.config();


const app = express();
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    Credentials : true,
  };
   
  app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth',router)
connectdb().then(()=>{
    app.listen(5000,()=>{
        console.log("port running on 5000")
    })
})
 
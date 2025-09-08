import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
    path: "../.env"
});

import dbconnect from './db/dbconnect.js'

dbconnect()
.then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log("server is started");
  })
})
.catch((error)=>{
  console.log("Got an error");
  throw error;
})

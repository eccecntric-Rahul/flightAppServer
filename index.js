import express from "express";
const morgan = require("morgan");
import mongoose from "mongoose";
import fs from "fs";
import cors from "cors";
import formidable from "express-formidable";
import Amadeus from "amadeus";
require("dotenv").config();
const amadeus = new Amadeus({
    clientId: process.env.CLIENT_KEY,
    clientSecret: process.env.CLIENT_SECRET
  });

const app = express();
const port=process.env.PORT||8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(formidable());

// db connection 
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err));

app.get("/",(req,res)=>{req;res.status(400).send("server is running")});
fs.readdirSync("./routes").map((r)=>app.use("/api",require(`./routes/${r}`)));

app.listen(port,()=>console.log(`Server is running on Port ${port}`) );

export default amadeus;
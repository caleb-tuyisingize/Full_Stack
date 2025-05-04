const express=require("express");
const cors = require("cors");
const {Pool} = require("pg");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const pool=new Pool({
    user:"postgres",
    host: "localhost",
    database: "Students",
    password: "Tuyisingize@123",
    port: 5432,
})

app.get('/mevis', async (req,res)=>{
    const result= await pool.query(
       "select * from mevis");
        res.json(result.rows);
});
app.post('/mevis', async (req,res)=>{
    const {mname,mclass}=req.body;

        const result = await pool.query(
            "insert into mevis (mname,mclass)values($1,$2) returning *",[mname,mclass]);
            res.status(201).json(result.rows[0]);
  
    
});
app.put('/mevis/:mid', async (req,res)=>{
    const {mname,mclass} = req.body;
    const {mid}=req.params;
    const result= await pool.query(
        "update mevis set mname= $1, mclass = $2 where mid = $3",[mname,mclass,mid]);
        res.json({message: "Item updated"});
});
app.delete('/mevis/:mid', async (req,res)=>{
    const {mid}=req.params;
    const result= await pool.query(
        "DELETE FROM mevis WHERE mid = $1",[mid]);
        res.json({message: "Item deleted"});
});

app.listen(PORT,"localhost",()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
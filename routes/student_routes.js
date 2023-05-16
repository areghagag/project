import {Router} from "express";
import db from "";
const router = new Router();

router.get("/",(req,res)=>{
    res.render("./studentHomePage");   
})





export default router;
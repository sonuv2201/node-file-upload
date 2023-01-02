import express from 'express';
const app = express();
import cors from 'cors';
import path from 'path';

import multer from 'multer';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.post('/uploads', (req,res)=>{
    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'./uploads')
        },
        filename: function(req,file,cb){
            cb(null, Date.now() + '--' + file.originalname.replace(/\s+/g, '-').toLowerCase())
        }
    })

    const upload = multer({storage: storage}).single("images");
 
    upload(req,res,(err)=>{
        res.send({
            data:`http://localhost:8001/users_imgs/${req.file.filename}`
        })
        console.log(req.file)
    }) 
})

app.use('/users_imgs/',express.static(path.join(__dirname, './uploads/')));



app.listen(8001,()=>{
    console.log("server is runningon http://localhost:8001");
});

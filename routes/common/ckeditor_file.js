const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination : function(req, file, cb){    
        cb(null, 'public/uploads/images/')
    },
  
    filename : function(req, file, cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  });

var upload = multer({ storage: storage });

router.post('/', upload.single('upload') ,async (req, res) =>{
    var html;
    var fs = require('fs');
    fs.readFile(req.file.path, function (err, data) {
        if(err) {
        res.send({error : err})
        }
        else{
            html = "{"
            html += "\"uploaded\": 1,"
            html += "\"fileName\": \"" + req.file.filename + "\","
            html += "\"url\": \"/uploads/images/" + req.file.filename + "\""
            html += "}";
            
            res.send(html);
        }
    });
});

module.exports = router;
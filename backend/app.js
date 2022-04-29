const express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const app = express()
const fs = require('fs')
const http =  require('http')
const port = 8000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.json({
        success: true
    })
})


app.post('/', (req, res) => {
    console.log(req.body)
    res.status(200)
  })

app.post('/upload', upload.single('document'),(req , res) => {
  console.log(req.file, req.body)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
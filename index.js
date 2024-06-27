import express from "express"
import bodyParser from "body-parser"
import { render } from "ejs";  
import promptSync from 'prompt-sync';import { KeyObject } from "crypto";
 const prompt = promptSync(); 


const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let dictionary = {

}


app.get("/", (req, res) =>{
    res.render("index.ejs", {dictionary, dictionary});
});

app.get("/blogs", (req,res) =>{
    res.render("blogs.ejs", {dictionary: dictionary});
})




app.post("/blogs/:key", (req,res) =>{
    const key = req.params.key;
    const newValue = req.body.newValue;
    if(newValue.length > 0){
        dictionary[key] = newValue;
    }
    
    res.redirect("/blogs");
});


app.post("/blogs", (req, res) => {
    if(req.body["title"].length > 0 && req.body["content"]){
        dictionary[req.body["title"]] = req.body["content"];
    }
    
    res.render("blogs.ejs", {dictionary: dictionary});
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs", {dictionary: dictionary}); 
});


app.post('/edit/:key', (req, res) => {
    let key = req.params.key;
    res.render('edit.ejs', {dictionary: dictionary, key: key});
});



app.post('/delete/:key', (req,res) =>{
    const key = req.params.key;
    if(dictionary[key]){
        delete dictionary[key];
    }
    res.redirect('/');
});

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})





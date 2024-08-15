const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        res.render("index.ejs")
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
} )

app.listen(port, () => {
    console.log(`Port Active :`, port);
    
})
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=4000;

app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.get("/feedback", (req, res) => {
    res.render("feedback.ejs", {
        feed: "Submit your Feedback",
    });
});


app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})

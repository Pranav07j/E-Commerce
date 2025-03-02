import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=4000;


const db = new pg.Client({
    user: "postgres",
    database: "world",
    password: "Zails@1980",
    host: "localhost",
    port: 5432
});

db.connect()
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err))



app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.get("/feedback", (req, res) => {
    res.render("feedback.ejs", {
        feed: "Submit your Feedback",
    });
});

app.post("/submit-feedback", async (req, res) => {
    try {
        const { name, email, feedback } = req.body;

        if (!name || !email || !feedback) {
            return res.status(400).json({ error: "All fields are required" });
        }
        await db.query(
            "INSERT INTO feedback (name, email, message) VALUES ($1, $2, $3) RETURNING *",
            [name, email, feedback]
        )
        res.render("index.ejs");

    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})

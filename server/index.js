const express = require('express');
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "6059",
    database: "database",
    host: "localhost",
    port: 3060,
    schema: "chat",
});

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to the webchat server!</h1>`)
})

app.get("/messages", async (req, res) => {
    const response = await pool.query(`SELECT * FROM chat."messages" ORDER BY "id_of_message"`);
    res.json(response.rows);
})

app.put("/sendMessage", async (req, res) => {
    try {
        const sending = await pool.query(`INSERT INTO "chat"."messages" ("text_of_message", "sender_name", "time_of_sending") VALUES ($1, $2, $3)`,
                        [req.body.dataForSending.text, req.body.dataForSending.name, req.body.dataForSending.time]);
        const response = await pool.query(`SELECT * FROM chat."messages" ORDER BY "id_of_message"`);
        res.json(response.rows);
        
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("Server is running on localhost 5000");
})
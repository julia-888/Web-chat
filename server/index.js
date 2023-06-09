const app = require('express')();
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "6059",
    database: "database",
    host: "localhost",
    port: 3060,
    schema: "chat",
});


const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

io.on('connection', (socket) => {
    socket.on('chat', async (payload) => {
        console.log('What is payload', payload);
        try {
            const sending = await pool.query(`INSERT INTO "chat"."messages" ("text_of_message", "sender_name", "time_of_sending") VALUES ($1, $2, $3)`,
                            [payload.text, payload.name, payload.time]);
            const response = await pool.query(`SELECT * FROM chat."messages" ORDER BY "id_of_message" DESC LIMIT 100`);
            io.emit('chat', response.rows);
            
        } catch (err) {
            console.error(err.message)
        }
    })
    socket.on('first', async (payload) => {
        try {
            const response = await pool.query(`SELECT * FROM chat."messages" ORDER BY "id_of_message" DESC LIMIT 100`);
            io.emit('first', response.rows);
            
        } catch (err) {
            console.error(err.message)
        }
    })
})

server.listen(5000, () => {
    console.log("Server is listening")
})


const app = require('express')();
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");

//соединение с БД
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
    //обработка запроса на отправку сообщения
    socket.on('sendMessage', async (data) => {
        try {
            const sending = await pool.query(`INSERT INTO "chat"."messages" ("text_of_message", "sender_name", "time_of_sending", "date_of_sending") VALUES ($1, $2, $3, $4)`,
                            [data.text, data.name, data.time, data.date]);
            const response = await pool.query(`SELECT * FROM chat."messages" ORDER BY "id_of_message" DESC LIMIT 100`);
            io.emit('sendMessage', response.rows);
            
        } catch (err) {
            console.error(err.message)
        }
    })
    //обработка запроса на вход
    socket.on('enter', async (data) => {
        try {
            const response = await pool.query(`SELECT * FROM chat."messages" ORDER BY "id_of_message" DESC LIMIT 100`);
            io.emit('enter', response.rows);
            
        } catch (err) {
            console.error(err.message)
        }
    })
})

server.listen(5000, () => {
    console.log("Server is listening")
})


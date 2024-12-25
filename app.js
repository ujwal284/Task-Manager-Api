const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect.js')
require('dotenv').config()
const notFound = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

// middleware

app.use(express.static('./public'))
app.use(express.json())

// routes

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        console.log(`\n MongoDB connected !!`);
        app.listen(port, console.log(`⚙️  Server is running on port ${port}`))
    } catch (error) {
        console.log("MONGODB connection error", error);

    }
}

start()


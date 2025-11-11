const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const cors = require('cors');

// Router imports
const expenseRoutes = require('./Routers/expenseRoutes.js');

dotenv.config();

// Load env variables
let PORT;
let MONGO_URI;

try {
    PORT = process.env.BACKEND_PORT || 5000; // 5000 port by default
    MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) {
        console.error("Mongo DB URI missing!\n");
        process.exit(1); // No point moving forward if mongo db is not connected
    }
    console.log("Loaded environment variables successfully!\n");
}
catch (error) {
    console.error(`.env file missing!\n\nError: ${error}\n`);
    process.exit(1); // Stop, we dont have an env
}

// Initialise App
const app = express();

// App Middleware
app.use(express.json()); // to parse request with JSON payload and put into req.body
app.use(express.urlencoded({extended : true})); // to parse rquests with URL-encoded payloads, like app/x-www-form-urlencoded
app.use(cors()); // Allow requests from other ports

// Routes
app.use("/expense", expenseRoutes);

// Route to test if server is up
app.get('/', (req, res) => {
    res.send(`Server is live on port backend:  http://localhost:${PORT}\n`);
})

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB Cluster!\n");
    })
    .catch((e) => {
        console.error(`Unable to connect to MongoDB cluster!\n\nError: ${e}\n`);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\n`);
}) 
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// Load env variables
let PORT;
try {
    PORT = process.env.BACKEND_PORT || 5000; // 5000 port by default
    console.log("Loaded environment variables successfully!");
}
catch (error) {
    console.error(`Error: ${error}\nPlease implement a .env file with all the variables in .env.example`);
    process.exit(1); // Stop, we dont have an env
}

// Initialise App
const app = express();

// App Middleware
app.use(express.json()); // to parse request with JSON payload and put into req.body
app.use(express.urlencoded()); // to parse rquests with URL-encoded payloads, like app/x-www-form-urlencoded

// Routes
app.get('/', (req, res) => {
    res.send(`Server is live on port ${PORT}`);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}) 
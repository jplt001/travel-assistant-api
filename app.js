const express = require('express');
const http = require("http");
// Create the Express app
const app = express();
const server = http.createServer(app);
const socketHandler = require('./handlers/socketHandler');
const cors = require('cors');
require("dotenv").config();

const io = socketHandler.init(server);
// Require the route files
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');
const apiTokenValidation = require('./middlewares/apiTokenValidation');
const tokenizedRoutes = require("./routes/tokenizedRoutes");
const generateAPIResponse = require('./helpers/responseHelper');
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/errorHandler");
const handle404 = require("./middlewares/handle404");
app.locals.generateAPIResponse = generateAPIResponse;

app.use(cors());
app.use(bodyParser.json());
// Apply middleware to specific routes
app.use(apiTokenValidation(tokenizedRoutes))

app.use('/api', apiRoutes); // Prefix all API routes with '/api'
app.use('/', webRoutes);   // No prefix for web routes

app.use(errorHandler);
app.use(handle404);


// Use the io instance to define event handlers
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('message', 'Welcome to the chat');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server is running on port 3000');
})
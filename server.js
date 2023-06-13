const app = require("./app");
const http = require('http');
const socketHandler = require('./handlers/socketHandler');
const server = http.createServer(app);
// Apply middleware, routes, and other app configurations

// Initialize Socket.IO
socketHandler.initialize(server);
// Start the server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
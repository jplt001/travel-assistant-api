let io;

module.exports = {
    init: (server) => {
        io = require('socket.io')(server);
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.IO has not been initialized');
        }
        return io;
    }
};
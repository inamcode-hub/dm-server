const WebSocket = require('ws');
const userHandlers = require('./handlers/userHandlers');
const deviceHandlers = require('./handlers/deviceHandlers');
const url = require('url');



const initializeWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ noServer: true });

    server.on('upgrade', (req, socket, head) => {
        const { pathname, query } = url.parse(req.url, true);
        const id = query.id;

        wss.handleUpgrade(req, socket, head, (ws) => {
            if (pathname === '/device') {
                deviceHandlers.setupDevice(ws, id);
            } else if (pathname === '/user') {
                userHandlers.setupUser(ws, id);
            } else {
                socket.destroy();
            }
        });
    });

    return wss;
};


module.exports = initializeWebSocketServer;

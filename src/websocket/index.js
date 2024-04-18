const WebSocket = require('ws');
const userHandlers = require('./handlers/userHandlers');
const deviceHandlers = require('./handlers/deviceHandlers');
const url = require('url');

const userConnections = new Map();
const deviceConnections = new Map();

const initializeWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ noServer: true });

    server.on('upgrade', (req, socket, head) => {
        const { pathname, query } = url.parse(req.url, true);
        const name = query.name;

        wss.handleUpgrade(req, socket, head, (ws) => {
            if (pathname === '/device') {
                deviceConnections.set(name, ws);
                deviceHandlers.setupDevice(ws, name, userConnections, deviceConnections);
            } else if (pathname === '/user') {
                userConnections.set(name, ws);
                userHandlers.setupUser(ws, name, userConnections, deviceConnections);
            } else {
                socket.destroy();
            }
        });
    });

    return wss;
};

module.exports = initializeWebSocketServer;

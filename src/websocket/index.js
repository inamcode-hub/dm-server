const WebSocket = require('ws');
const userHandlers = require('./handlers/userHandlers');
const deviceHandlers = require('./handlers/deviceHandlers');
const url = require('url');

const chatRooms = new Map();
const userConnections = new Map();
const deviceConnections = new Map();

const initializeWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ noServer: true });

    server.on('upgrade', (req, socket, head) => {
        const { pathname, query } = url.parse(req.url, true);
        const id = query.id;

        wss.handleUpgrade(req, socket, head, (ws) => {
            if (pathname === '/device') {
                deviceConnections.set(id, ws);
                deviceHandlers.setupDevice(ws, id, userConnections, deviceConnections);
            } else if (pathname === '/user') {
                userConnections.set(id, ws);
                userHandlers.setupUser(ws, id, userConnections, deviceConnections);
            } else {
                socket.destroy();
            }
        });
    });

    return wss;
};

module.exports = initializeWebSocketServer;

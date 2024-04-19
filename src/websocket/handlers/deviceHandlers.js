// deviceHandlers.js
const WebSocket = require('ws');
const { chatRooms, userConnections, deviceConnections } = require('../stateManager');


const setupDevice = (ws, deviceId) => {
    // Ensure there is a room for the device
    if (!chatRooms.has(deviceId)) {
        chatRooms.set(deviceId, new Set());
    }
    deviceConnections.set(deviceId, ws);

    console.log(`Device connection established: ${deviceId}`);
    console.log(`Number of chat rooms: ${chatRooms.size}`);
    console.log(`Number of device connections: ${deviceConnections.size}`);
    console.log(`Number of user connections: ${userConnections.size}`);
    console.log('-----------------------------------');
    ws.on('message', message => {
        const { type, content } = JSON.parse(message);
        console.log(`Received message of type ${type} from device ${deviceId}`);

        if (type === 'broadcast') {
            const subscribers = chatRooms.get(deviceId) || new Set();
            console.log(`Broadcasting to ${subscribers.size} subscribers in room for device ${deviceId}`);

            subscribers.forEach(userId => {
                const userWs = userConnections.get(userId);
                if (userWs && userWs.readyState === WebSocket.OPEN) {
                    console.log(`Sending broadcast to user ${userId}`);
                    userWs.send(JSON.stringify({ from: deviceId, content }));
                } else {
                    console.log(`Failed to send to user ${userId}: WebSocket not open or does not exist`);
                }
            });
        }
    });

    ws.on('close', () => {
        console.log(`Device connection closed: ${deviceId}`);
        deviceConnections.delete(deviceId);
        // chatRooms.delete(deviceId);  // Also remove the room when device disconnects
    });

    ws.on('error', error => {
        console.error(`WebSocket error for device ${deviceId}:`, error);
    });
};

module.exports = { setupDevice };

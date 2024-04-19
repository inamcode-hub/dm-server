// userHandlers.js
const { chatRooms, userConnections, deviceConnections } = require('../stateManager');

const setupUser = (ws, userId) => {
    userConnections.set(userId, ws);

    console.log(`User connection established: ${userId}`);
    console.log(`Number of chat rooms: ${chatRooms.size}`);
    console.log(`Number of device connections: ${deviceConnections.size}`);
    console.log(`Number of user connections: ${userConnections.size}`);
    console.log('-----------------------------------');

    ws.on('message', message => {
        const { type, targetDevice } = JSON.parse(message);

        if (type === 'joinDeviceRoom' && chatRooms.has(targetDevice)) {
            chatRooms.get(targetDevice).add(userId);
            console.log(`User ${userId} joined room of device ${targetDevice}`);
        } else if (type === 'leaveDeviceRoom' && chatRooms.has(targetDevice)) {
            chatRooms.get(targetDevice).delete(userId);
            console.log(`User ${userId} left room of device ${targetDevice}`);
        }
    });

    ws.on('close', () => {
        userConnections.delete(userId);
        // Remove user from all rooms they are part of
        chatRooms.forEach((subscribers) => {
            subscribers.delete(userId);
        });
    });

    ws.on('error', error => {
        console.error(`WebSocket error for user ${userId}:`, error);
    });
};

module.exports = { setupUser };

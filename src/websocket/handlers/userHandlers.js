// userHandlers.js
const setupUser = (ws, userId, userConnections, deviceConnections) => {
    ws.on('message', message => {
        console.log(`Message from user ${userId}:`, JSON.parse(message));

        const { type, content, targetDevice } = JSON.parse(message);

        if (type === 'sendToDevice' && deviceConnections.has(targetDevice)) {
            const deviceWs = deviceConnections.get(targetDevice);

            deviceWs.send(JSON.stringify({ from: userId, content }));
        }
    });

    ws.on('close', () => {
        console.log(`User connection closed: ${userId}`);
        userConnections.delete(userId);
    });

    ws.on('error', error => {
        console.error(`WebSocket error for user ${userId}:`, error);
    });
};

module.exports = { setupUser };

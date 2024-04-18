// userHandlers.js
const setupUser = (ws, userName, deviceConnections) => {
    ws.on('message', message => {
        console.log(`Message from user ${userName}:`, JSON.parse(message));

        const { type, content, targetDevice } = JSON.parse(message);
        if (type === 'sendToDevice' && deviceConnections.has(targetDevice)) {
            const deviceWs = deviceConnections.get(targetDevice);
            deviceWs.send(JSON.stringify({ from: userName, content }));
        }
    });

    ws.on('close', () => {
        console.log(`User connection closed: ${userName}`);
        userConnections.delete(userName);
    });

    ws.on('error', error => {
        console.error(`WebSocket error for user ${userName}:`, error);
    });
};

module.exports = { setupUser };

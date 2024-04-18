// deviceHandlers.js
const setupDevice = (ws, deviceName, userConnections) => {
    ws.on('message', message => {
        console.log(`Message from device ${deviceName}:`, JSON.parse(message));
        const { type, content, targetUser } = JSON.parse(message);
        if (type === 'sendToUser' && userConnections.has(targetUser)) {
            const userWs = userConnections.get(targetUser);
            userWs.send(JSON.stringify({ from: deviceName, content }));
        }
    });

    ws.on('close', () => {
        console.log(`Device connection closed: ${deviceName}`);
        deviceConnections.delete(deviceName);
    });

    ws.on('error', error => {
        console.error(`WebSocket error for device ${deviceName}:`, error);
    });
};

module.exports = { setupDevice };

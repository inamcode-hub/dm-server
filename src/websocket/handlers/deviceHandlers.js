// deviceHandlers.js
const setupDevice = (ws, deviceId, userConnections, deviceConnections
) => {
    ws.on('message', message => {
        console.log(`Message from device ${deviceId}:`, JSON.parse(message));
        const { type, content, targetUser } = JSON.parse(message);

        if (type === 'sendToUser' && userConnections.has(targetUser)) {
            const userWs = userConnections.get(targetUser);
            console.log(`Sending message to user ${targetUser}:`, content);
            userWs.send(JSON.stringify({ from: deviceId, content }));
        }
    });

    ws.on('close', () => {
        console.log(`Device connection closed: ${deviceId}`);
        deviceConnections.delete(deviceId);
    });

    ws.on('error', error => {
        console.error(`WebSocket error for device ${deviceId}:`, error);
    });
};

module.exports = { setupDevice };

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001', {
    forceNew: true,
});

const subscribeToAutosuggestion = (callback) => {
    const event = 'autosuggest'
    socket.on(event, autosuggestions => callback(autosuggestions))
    return (toSend) => {
        socket.emit(event, toSend)
    }
}

export default subscribeToAutosuggestion
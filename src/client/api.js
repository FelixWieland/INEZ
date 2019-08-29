import openSocket from 'socket.io-client';

const socket = openSocket(process.env.API_URL, {
    forceNew: true,
});

export const subscribeToAutosuggestion = (callback) => {
    const event = 'autosuggest'
    socket.on(event, autosuggestions => callback(autosuggestions))
    return (toSend) => {
        socket.emit(event, toSend)
    }
}

const updateGroceryItem = (grocerylistid, item, callback) => {
    fetch("http://localhost:3000/").then((response) => {
        callback(response)
    })
}

const deleteGroceryItem = (grocerylistid, item, callback) => {
    fetch("http://localhost:3000/").then((response) => {
        callback(response)
    })
}

const createGroceryItem = (grocerylistid, item, callback) => {
    fetch("http://localhost:3000/").then((response) => {
        callback(response)
    })
}

const deleteGroceryListGroup = (grocerylistid, groupname, callback) => {
    fetch("http://localhost:3000/").then((response) => {
        callback(response)
    })
}

const createGroceryListGroup = (grocerylistid, groupname, callback) => {
    fetch("http://localhost:3000/").then((response) => {
        callback(response)
    })
}

const createGroceryList = (listname, callback) => {
    fetch("http://localhost:3000/").then((response) => {
        callback(response)
    })
}

const deleteGroceryList = (listname, callback) => {
    fetch("http://localhost:3000/").then((response) => {
        callback(response)
    })
}
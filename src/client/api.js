import openSocket from 'socket.io-client'

const socket = openSocket(process.env.API_URL, {
    forceNew: true,
})

const uri = 'http://' + process.env.API_URL
const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const subscribeToAutosuggestion = (callback) => {
    const event = 'autosuggest'
    socket.on(event, (autosuggestions) => callback(autosuggestions))
    return (toSend) => {
        socket.emit(event, toSend)
    }
}

const handleJWTUpdate = () => {

}

export const login = (username, password, onSuccess, onError) => {
    fetch(uri + 'api/user/login', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(
            {
                userName: username,
                password: password
            }
        )
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: ;
            case 505: ;
        }
        onError(new Error('login failed'))
    }).then((data) => {
        window.sessionStorage.setItem('jwt', data.jwt)
        window.sessionStorage.setItem('reLogin', "-")
        onSuccess()
    }).catch((err) => onError(err))
}

export const register = (username, password, onSuccess, onError) => {
    fetch(uri + 'api/user/register', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(
            {
                userName: username,
                password: password
            }
        )
    }).then((response) => {
        switch (response.status) {
            case 201: return response.json()
            case 401: ;
            case 505: ;
        }
        onError(new Error('registration failed'))
    }).then((data) => {
        window.sessionStorage.setItem('jwt', data.jwt)
        window.sessionStorage.setItem('register', "-")
        onSuccess()
    }).catch((err) => onError(err))
}

export const logout = (onSuccess, onError) => {
    const key = 'jwt'
    if (window.sessionStorage.getItem(key)) {
        window.sessionStorage.removeItem(key)
        onSuccess()
    } else {
        onError(new Error('not logged in'))
    }
}

export const updateGroceryItem = (grocerylistid, item, callback) => {
    fetch(uri + 'api/demoCall').then((response) => {
        callback(response)
    })
}

export const deleteGroceryItem = (grocerylistid, item, callback) => {
    fetch(uri + 'api/demoCall').then((response) => {
        callback(response)
    })
}

export const createGroceryItem = (grocerylistid, item, onSuccess, onError) => {
    fetch(uri + 'api/demoCall', {
        method: 'GET',
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => onSuccess(data)).catch((err) => onError(err))
}

export const deleteGroceryListGroup = (grocerylistid, groupname, onSuccess, onError) => {
    fetch(uri + 'api/demoCall', {
        method: 'DELETE',
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => onSuccess(data)).catch((err) => onError(err))
}

export const createGroceryListGroup = (grocerylistid, groupname, onSuccess, onError) => {
    fetch(uri + 'api/demoCall', {
        method: 'PUT',
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => onSuccess(data)).catch((err) => onError(err))
}

export const createGroceryList = (listname, onSuccess, onError) => {
    fetch(uri + 'api/demoCall', {
        method: 'PUT',
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => onSuccess(data)).catch((err) => onError(err))
}

export const deleteGroceryList = (listname, onSuccess, onError) => {
    fetch(uri + 'api/demoCall', {
        method: 'DELETE',
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => onSuccess(data)).catch((err) => onError(err))
}

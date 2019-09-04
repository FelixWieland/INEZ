import openSocket from 'socket.io-client'

const socket = openSocket(process.env.API_URL, {
    forceNew: true,
})

const uri = process.env.API_URL.length != 1 ? 'http://' + process.env.API_URL : '/'
const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const createAuthParam = () => {
    return '?jwt=' + window.sessionStorage.getItem('jwt')
}

const authHeader = () => {
    const h = new Headers()
    h.append('Accept', 'application/json')
    h.append('Content-Type', 'application/json')
    h.append('Authorization', window.sessionStorage.getItem('jwt'))
    return h
}

export const subscribeToAutosuggestion = (callback) => {
    const event = 'autosuggest'
    socket.on(event, (autosuggestions) => callback(autosuggestions))
    return (toSend) => {
        socket.emit(event, toSend)
    }
}

const handleJWTUpdate = () => {
    fetch(uri + 'api/user/refreshToken' + createAuthParam(), {
        method: 'POST',
        headers: header,
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: ;
            case 505: ;
        }
        logout(() => {
            window.location = '/login'
        }, (err) => { })
    }).then((data) => {
        if (data.jwt) {
            window.sessionStorage.setItem('jwt', 'Bearer ' + data.jwt)
            window.location.reload()
        }
    }).catch((err) => onError(err))
}

const callIfFilled = (arg, toCall) => {
    if (arg) {
        toCall(arg)
    }
}

export const login = (username, password, onSuccess, onError) => {
    fetch(uri + 'api/user/login', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(
            {
                userName: username,
                password: password,
            }
        ),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: ;
            case 505: ;
        }
        onError(new Error('login failed'))
    }).then((data) => {
        window.sessionStorage.setItem('jwt', 'Bearer ' + data.jwt)
        window.sessionStorage.setItem('reLogin', '-')
        callIfFilled(data, onSuccess)
    }).catch((err) => onError(err))
}

export const register = (username, password, onSuccess, onError) => {
    fetch(uri + 'api/user/register', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(
            {
                userName: username,
                password: password,
            }
        ),
    }).then((response) => {
        switch (response.status) {
            case 201: return response.json()
            case 401: ;
            case 505: ;
        }
        onError(new Error('registration failed'))
    }).then((data) => {
        window.sessionStorage.setItem('jwt', 'Bearer ' + data.jwt)
        window.sessionStorage.setItem('register', '-')
        callIfFilled(data, onSuccess)
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

export const updateGroceryItem = (listname, groupname, item, onSuccess, onError) => {
    fetch(uri + 'api/lists/' + listname + '/' + groupname + createAuthParam(), {
        method: 'POST',
        header: header,
        body: JSON.stringify({
            _id: item.id,
            productname: item.name,
            measure: item.measure,
            amount: item.amount,
            checked: item.checked,
        }),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

export const deleteGroceryItem = (listname, groupname, item, onSuccess, onError) => {
    fetch(uri + 'api/lists/' + listname + '/' + groupname + createAuthParam(), {
        method: 'DELETE',
        header: header,
        body: JSON.stringify({
            productname: item.product,
        }),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

export const createGroceryItem = (listname, groupname, item, onSuccess, onError) => {
    console.log(listname, listname, item)
    fetch(uri + 'api/lists/' + listname + '/' + groupname + createAuthParam(), {
        method: 'PUT',
        header: header,
        body: JSON.stringify({
            productId: '',
            productname: item.product,
            productGroupId: item.productGroupId,
            measure: item.measure,
            amount: item.amount,
            checked: false,
        }),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

export const deleteGroceryListGroup = (listname, groupname, onSuccess, onError) => {
    fetch(uri + 'api/lists/' + listname + '/delete' + createAuthParam(), {
        method: 'DELETE',
        header: header,
        body: JSON.stringify({
            groupname: groupname,
        }),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

export const createGroceryListGroup = (listname, groupname, onSuccess, onError) => {
    fetch(uri + 'api/lists/' + listname + '/create' + createAuthParam(), {
        method: 'PUT',
        header: header,
        body: JSON.stringify({
            groupname: groupname,
        }),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

export const createGroceryList = (listname, onSuccess, onError) => {
    fetch(uri + 'api/lists' + createAuthParam(), {
        method: 'PUT',
        header: header,
        body: JSON.stringify({
            listname: listname,
        }),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

export const deleteGroceryList = (listname, onSuccess, onError) => {
    fetch(uri + 'api/lists' + createAuthParam(), {
        method: 'DELETE',
        header: header,
        body: JSON.stringify({
            listname: listname,
        }),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

export const getGroceryLists = (onSuccess, onError) => {
    fetch(uri + 'api/lists' + createAuthParam(), {
        method: 'GET',
        header: header,
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}


export const getGroceryListItems = (listname, onSuccess, onError) => {
    fetch(uri + 'api/lists/' + listname + createAuthParam(), {
        method: 'GET',
        header: header,
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

export const changeProductGroup = (listname, currentgroupname, newgroupname, item, onSuccess, onError) => {
    fetch(uri + 'api/lists/' + listname + '/' + currentgroupname + '/changegroup/' + newgroupname + createAuthParam(), {
        method: 'POST',
        header: header,
        body: JSON.stringify({
            productname: item.product,
        }),
    }).then((response) => {
        switch (response.status) {
            case 200: return response.json()
            case 401: handleJWTUpdate()
            case 505: ;
        }
        onError()
    }).then((data) => callIfFilled(data, onSuccess)).catch((err) => onError(err))
}

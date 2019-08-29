import FuzzyAutosuggest from './../FuzzyAutosuggest';
import fs from 'fs';
import path from 'path'

let credentials = JSON.parse(fs.readFileSync(path.dirname(require.main.filename) + "/config/credentials.json").toString());
const fuzzyAutosuggest = new FuzzyAutosuggest(credentials.mongo.srv)
fuzzyAutosuggest.runSearch("DUMMYVALUE", (_) => undefined)
credentials = undefined

const emitAutosuggestResponse = (socket, result) => socket.emit('autosuggest', {
    suggestions: result.map((elm) => {
        return {
            label: elm.name,
            portionsizename: elm.portionsizename
        }
    })
})

const onAutosuggest = (socket, data) => {
    //data == { amount: amount, measure: measure, product: product }
    try {
        fuzzyAutosuggest.runSearch(data.product, (result) => emitAutosuggestResponse(socket, result), 10)
    } catch (ex) {
        console.log(ex)
    }
}

export const onConnection = (socket) => {
    socket.on('autosuggest', (data) => onAutosuggest(socket, data))
}
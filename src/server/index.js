import express, { static as staticFiles } from 'express';
import { userInfo } from 'os';
import { connect } from './config/mongoconf';
import fs from 'fs';
import path from 'path'
import FuzzyAutosuggest from './FuzzyAutosuggest';
import cors from 'cors'

const app = express();
app.use(cors());
app.options('*', cors());


let credentials = JSON.parse(fs.readFileSync(path.dirname(require.main.filename) + "/config/credentials.json").toString());
let conn = undefined;
(async () => { conn = await connect(credentials.mongo.srv, "INEZ") })();

const fuzzyAutosuggest = new FuzzyAutosuggest(credentials.mongo.srv)
fuzzyAutosuggest.runSearch("DUMMYVALUE", (_) => undefined)

credentials = undefined;

app.use(staticFiles('dist'))

app.get('/api/getUsername', (req, res) => {
  return res.send({
    username: userInfo().username
  });
})

app.get('/api/demoCall', (req, res) => {
  console.log(req.body)
  res.send({ status: "ok" })
})


let server = app.listen(3001, () => console.log('Listening on port 3000, API on port 3001!'))
let io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  socket.on('autosuggest', function (data) {
    //data == { amount: amount, measure: measure, product: product }
    try {
      fuzzyAutosuggest.runSearch(data.product, (result) => {
        socket.emit('autosuggest', {
          suggestions: result.map((elm) => {
            return {
              label: elm.name,
              portionsizename: elm.portionsizename
            }
          })
        })
      }, 10)
    } catch (ex) {
      console.log(ex)
    }
  });
})
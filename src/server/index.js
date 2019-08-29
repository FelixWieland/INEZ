import express, { static as staticFiles } from 'express';
import { connect } from './config/mongoconf';
import fs from 'fs';
import path from 'path'
import cors from 'cors'
import { onConnection } from './routes/autosuggestSocket'
import socketio from 'socket.io';
import * as routes from './routes/test';

const PORT = process.env.NODE_ENV === 'production' ? 8000 : 3001

//let credentials = JSON.parse(fs.readFileSync(path.dirname(require.main.filename) + "/config/credentials.json").toString());
//let conn = undefined;
//(async () => { conn = await connect(credentials.mongo.srv, "INEZ") })();
//credentials = undefined;

const app = express();

app.use(cors())
app.use(staticFiles('dist'))
app.options('*', cors());

app.get('/api/getUsername', routes.getUsername)
app.get('/api/demoCall', routes.demoCall)

//rewrites non matching routes to index.html
app.all('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')))

let server = app.listen(PORT, () => console.log('Listening on port ' + PORT))
let io = socketio.listen(server);

io.on('connection', onConnection)
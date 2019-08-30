import express, { static as staticFiles } from 'express'
import path from 'path'
import cors from 'cors'
import { onConnection } from './routes/autosuggestSocket'
import socketio from 'socket.io'
import * as routes from './routes/test'

const PORT = process.env.NODE_ENV === 'production' ? 8000 : 3001

const app = express()

app.use(cors())
app.use(staticFiles('dist'))
app.options('*', cors())

app.get('/api/getUsername', routes.getUsername)

app.all('/api/demoCall', routes.demoCall)

// rewrites non matching routes to index.html
if (PORT === 8000) app.all('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')))

const server = app.listen(PORT, () => console.log('Listening on port ' + PORT))
const io = socketio.listen(server)

io.on('connection', onConnection)

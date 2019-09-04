import express, { static as staticFiles } from 'express'
import path from 'path'
import cors from 'cors'
import { onConnection } from './routes/autosuggestSocket'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import * as routes from './routes/test'
import * as userRoutes from './routes/user'
import * as listRoutes from './routes/list'
import { checkAuth } from './check-auth'
import morgan from 'morgan'

const PORT = process.env.NODE_ENV === 'production' ? 8000 : 3001

const app = express()

app.use(cors())
app.use('*', cors())

// bodyparser makes urlencoded and json easily readible
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json(
	{ type: ['application/json', 'text/plain'] }
))


app.use(staticFiles('dist'))

// test
app.get('/api/getUsername', routes.getUsername)

// user
app.post('/api/user/register', userRoutes.register)
app.post('/api/user/login', userRoutes.login)
app.post('/api/user/refreshToken', userRoutes.refreshToken)
app.get('/api/user', checkAuth, userRoutes.getUser)

// //grocerylists
app.get('/api/lists', checkAuth, listRoutes.getGroceryLists)
app.put('/api/lists', checkAuth, listRoutes.createGroceryList)
app.delete('/api/lists', checkAuth, listRoutes.deleteGroceryList)

// list
app.get('/api/lists/:listname', checkAuth, listRoutes.getGroceryListGroups)
app.put('/api/lists/:listname/create', checkAuth, listRoutes.createProductGroup)
app.delete('/api/lists/:listname/delete', checkAuth, listRoutes.deleteProductGroup)

app.put('/api/lists/:listname/:groupname', checkAuth, listRoutes.addProductToGroup)
app.post('/api/lists/:listname/:groupname', checkAuth, listRoutes.updateProduct)
app.delete('/api/lists/:listname/:groupname', checkAuth, listRoutes.deleteProduct)

app.post('/api/lists/:listname/:groupname/changegroup/:newgroupname', checkAuth, listRoutes.changeProductGroup)

// test
app.all('/api/demoCall', routes.demoCall)

// rewrites non matching routes to index.html

if (PORT === 8000) {
	app.all('/*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '../../dist/index.html'))
	)
}

const server = app.listen(PORT, () => console.log('Listening on port ' + PORT))
const io = socketio.listen(server)

io.on('connection', onConnection)

// logger
app.use(morgan('dev'))

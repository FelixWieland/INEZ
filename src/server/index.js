import express, { static as staticFiles } from 'express';
import { userInfo } from 'os';
import { connect } from './config/mongoconf';

const app = express();
let conn = undefined;
(async () => { conn = await connect() });

app.use(staticFiles('dist'))

app.get('/api/getUsername', (req, res) => res.send({
  username: userInfo().username
}))

app.listen(3001, () => console.log('Listening on port 3000, API on port 3001!'))

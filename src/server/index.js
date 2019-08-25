import express, { static as staticFiles } from 'express';
import { userInfo } from 'os';
import { connect } from './config/mongoconf';
import fs from 'fs';
import path from 'path'

const app = express();
let credentials = JSON.parse(fs.readFileSync(path.dirname(require.main.filename) + "/config/credentials.json").toString());
let conn = undefined;
(async () => { conn = await connect(credentials.mongo.srv, "INEZ") })();
credentials = undefined;

app.use(staticFiles('dist'))

app.get('/api/getUsername', (req, res) => {
  console.log(conn)
  return res.send({
    username: userInfo().username
  });
})

app.listen(3001, () => console.log('Listening on port 3000, API on port 3001!'))

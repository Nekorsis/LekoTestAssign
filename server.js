const express = require('express');
const bodyParser = require('body-parser');
const editJsonFile = require('edit-json-file');

const file = editJsonFile(`${__dirname}/mockData.json`);
const app = express();
const http = require('http').Server(app);
const mockData = require('./mockData');

app.use(express.static('./dist'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('./dist/index.html');
});


app.get('/data', (req, res) => {
  res.json(mockData);
});

app.post('/add_data', (request, response) => {
  const data = [...mockData.data, request.body.serverData];
  file.set('data', data);
  file.save();
  response.send(JSON.stringify(file.toObject()));
});

app.post('/delete_data', (request, response) => {
  const deleteIndex = request.body.index;
  const newData = mockData.data.filter(item => item.id !== deleteIndex);
  file.set('data', newData);
  file.save();
  response.send(JSON.stringify(file.toObject()));
});

http.listen(3000, () => {
  console.log('server is up and running');
});

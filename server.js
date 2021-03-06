const express = require('express');
const { predict, loadModel } = require('./image');
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const app = express();
const { removeImage, rankPrediction } = require('./utils');

let model;

app.post('/predict', upload.single('image'), (req, res) => {
  const image = req.file
  
  let result;
  predict('./'+image.path, model)
  .then(prediction => {
    result = rankPrediction(prediction);
    console.log('SUCCESS');
    removeImage(image.filename);
    res.send(result);
  })
  .catch(e => {
    result = {'error': e};
    console.log(e);
    console.log('FAILED');
    removeImage(image.filename);
    res.send(result);
  })
})

app.get('/healthz', (req, res) => {
  res.send("OK");
})

app.listen(80, async () => {
  model = await loadModel(process.env.URL);
  console.log('SERVER START');
})
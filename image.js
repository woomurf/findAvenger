const tf = require('@tensorflow/tfjs-node');
const tmImage = require('@teachablemachine/image');
const {
  createCanvas,
  Image,
} = require('canvas');

global.fetch = require('node-fetch');

global.document = {
  createElement : () =>{
    return createCanvas();
  }
}
global.HTMLVideoElement = String;

exports.loadModel = async function(url) {
  const modelUrl = url + 'model.json';
  const metadataUrl = url + 'metadata.json';

  const model = await tmImage.load(modelUrl, metadataUrl);
  console.log("LOAD MODEL");
  
  return model;
}

exports.predict = async function (image, model) {
  const img = new Image();
  img.src = image;
  console.log('READ IMAGE');
  
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  console.log('DRAW CANVAS');
  
  const predictions = await model.predict(canvas);
  console.log('PREDICT');
  
  const result = {};
  for (let i = 0; i < predictions.length; i++) {
    result[predictions[i].className] = Number(predictions[i].probability.toFixed(2));
    // console.log(predictions[i].className, predictions[i].probability.toFixed(2));
  }
  
  return result;
}
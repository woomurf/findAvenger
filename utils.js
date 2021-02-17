const fs = require('fs');
const { TFEOpAttr } = require('@tensorflow/tfjs-node/dist/tfjs_binding');

exports.removeImage = (filename) => {
  try{
    fs.unlinkSync('./upload/'+filename);
    console.log(`SUCCESS TO REMOVE IMAGE ${filename}`);
  }
  catch (e) {
    console.log(`FAIL TO REMOVE IMAGE ${filename}`);
    console.log(e);
  }
}
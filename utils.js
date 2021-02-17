const fs = require('fs');

exports.rankPrediction = (predictions) => {
  var items = Object.keys(predictions).map(function(key) {
    return [key, predictions[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  const indexes = ['first', 'second', 'third', 'fourth'];
  const ranked = {};
  for (let i = 0; i < indexes.length; i++) {
    ranked[indexes[i]] = `${items[i][0]} ${items[i][1]}`; 
  } 
  return ranked;
}

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
const fs = require('fs')
const path = require('path')

module.exports = {
  getData: function(dataType){
    var dataPath = dataType == 'bienes' ?
                  __dirname + path.join('/data/data.json'):
                  console.log('error en storage');
    return new Promise(function(resolve, reject){
      fs.readFile(dataPath, 'utf8', function(err, readData){
        if(err) reject(err)
        resolve(readData)
      })
    })
  }
}

var express = require('express')
var Storage = require('../Storage')
var Router = express.Router()

Router.get('/bienes', function(req, res){
  Storage.getData('bienes')
         .then(function(dataList){
           res.json(dataList)
         }).catch(function(error){
           res.sendStatus(500).json(error)
         })
})
module.exports = Router

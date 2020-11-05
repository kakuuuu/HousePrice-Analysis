const axios = require('axios');
const config=require('../bin/config.js')
function queryLocation(params) {
  return axios.get(`http://api.map.baidu.com/geocoding/v3/?address=${encodeURI(params)}&output=json&ak=${config.akKey}`)
}

module.exports = queryLocation

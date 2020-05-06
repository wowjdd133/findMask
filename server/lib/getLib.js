const axios = require('axios');

module.exports.getHTML = async (url) => {
  return await axios.get(url);
}
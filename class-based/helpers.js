const fs = require('fs');
const path = require('path');

const getPath = (dir) => {
  return path.join(__dirname, dir);
}

const parseJsonFile = (jsonFile) => {
  const fileResult = fs.readFileSync(jsonFile, "utf8");
  
  return JSON.parse(fileResult)
}

module.exports = { getPath, parseJsonFile }
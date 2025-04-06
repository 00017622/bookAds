const fs = require('fs');
const path = require('path');

const categoryFilePath = path.join(__dirname, '../data/categories.json');

function readCategories() {
  if (!fs.existsSync(categoryFilePath)) {
    fs.writeFileSync(categoryFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(categoryFilePath);
  return JSON.parse(data);
}

function getAllCategories() {
  return readCategories();
}

module.exports = {
    getAllCategories,
  };
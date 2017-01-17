const fs = require('fs');

const oldPath = './dist/docs.min.js';
const newPath = './docs/docs.min.js';

fs.rename(oldPath, newPath, function (err) {
  if (err) {
    throw err;
  }
  console.log('Success');
});
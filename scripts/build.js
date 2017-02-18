/* eslint-disable no-sync */
const fs = require('fs');
const path = require('path');

const projectPath = `${path.dirname(__dirname)}/`;
const srcPath = `${projectPath}src/`;

fs.readdir(srcPath, (err, files) => {
  if (err){
    return;
  }

  let content = files.reduce((acc, file) => {
    let jsCode = fs.readFileSync(srcPath + file, 'utf-8');
    // Removes require
    jsCode = jsCode.replace(/module\.exports\s+=\s+\w+;/g, '');
    jsCode = jsCode.replace(/const\s+\w+\s+=\s+require\([^)]+\);/g, '');

    return acc + jsCode;
  }, '');
  fs.writeFileSync(`${projectPath}bundle.js`, content);
})
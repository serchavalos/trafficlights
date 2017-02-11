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
    // Removes require and import
    jsCode = jsCode.replace(/module\.exports\s+=\s+\w+;/, '');
    jsCode = jsCode.replace(/const\s+\w+\s+=\s+require\([^)]+\);/, '');

    return acc + jsCode;
  }, '');
  fs.writeFileSync(`${projectPath}bundle.js`, content);
})
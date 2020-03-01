const prettier = require('prettier');
const path = require('path');

prettier.getFileInfo(path.join(__dirname, 'src/app/newtab.tsx')).then(info => {
  console.log('test.js..()', JSON.stringify(info));
});

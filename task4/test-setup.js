const fs = require('fs');
const path = require('path');
const vm = require('vm');

global.chai = require('chai');

const code = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
vm.runInThisContext(code);

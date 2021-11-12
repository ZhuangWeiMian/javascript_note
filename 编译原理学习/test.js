const {tokenizer, parser} = require('./compiler');

const a= tokenizer(`1 + 12- 2 * 4+6`);
console.log(JSON.stringify(a), '=====aa=====');

const b = parser(a);
console.log(JSON.stringify(b), '======bb====');
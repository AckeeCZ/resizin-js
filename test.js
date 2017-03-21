var manager = require("./index.js").buildSource;

var tapitoBuilder = manager.bind(null, 'https://ack.ee', "tapito");

console.log(tapitoBuilder('mojeid', {width: 250, left: '20', filter: 'sepia', rotate: 90, border: [10, 20]}))

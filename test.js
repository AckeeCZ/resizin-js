var manager = require("./index.js").buildSource;
var uploadImage = require("./index.js").uploadImage;

var fs = require('fs');

var tapitoBuilder = manager.bind(null, 'https://ack.ee', "tapito");

console.log(tapitoBuilder('mojeid', {width: 250, left: '20', filter: 'sepia', rotate: 90, border: [10, 20]}))




var bucketUploader = uploadImage.bind(null, "https://imageserver-admin-api.ack.ee/api/v1/image/upload", "b26f3588e2179aca6eb153644b4dcc");

var file = fs.createReadStream(__dirname + '/test.png');

bucketUploader("bibrovo", file);




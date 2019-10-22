# node-resizin
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/node-resizin.svg)](https://bundlephobia.com/result?p=node-resizin)

[`resizin`](https://www.npmjs.com/package/resizin) package for Node.js environment.

## Table of contents

* [Installation](#installation)
* [Quick start](#quickstart)
* [API](#api)
    * [`uploadFactory`](#uploadfactoryoptions-options-functionfile-imageid)

## Installation

Using npm:

```sh
npm i -s node-resizin
```

Using yarn:

```sh
yarn add node-resizin
```
## Quick start

```js
const { uploadFactory } = require('node-resizin');

const fs = require('fs');
const config = require('../config');

const upload = uploadFactory({
    serverUrl: 'https://api.resizin.com', 
    apiKey: config.RESIZIN_API_KEY,
});

const file = fs.createReadStream(__dirname + '/myfile.png');

resizin.upload(file).then(() => {
    ...      
});
```

---

[**Upload factory documentation**](../../docs/Upload.md)
*  There is also third parametr, available only for Node.js, that determines file mime type. The mime type is optional and defaults to `application/octet-stream`.

    ```js
    const { uploadFactory } = require('node-resizin');

    const fs = require('fs');
    const config = require('../config');

    const upload = uploadFactory({
        apiKey: config.RESIZIN_API_KEY,
    });

    const file = fs.createReadStream('/tmp/feedback.pdf');

    upload(file, null, "application/pdf").then(fileDetails => {
        console.log(fileDetails);
    });
    ```


## License

[MIT](http://opensource.org/licenses/MIT)

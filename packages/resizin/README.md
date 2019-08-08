# Package is currently being revitalised

![](http://static1.1.sqspcdn.com/static/f/207938/4844797/1258911333857/12345under.jpg)


# resizin
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/resizin.svg)](https://bundlephobia.com/result?p=resizin@0.1.0)

Core package for uploading images and building url of images from [Resizin](https://resizin.com).

## Table of contents

* [Installation](#installation)
* [Quick start](#quick-start)
* [API](#api)
    * [`buildUrl(serverUrl, bucket, imageId, options)`](#build-url)
    * [`buildUrlFactory(options)`](#clientfactory)
    * [Modifiers](#modifiers)
    * [`upload(serverUrl, apiKey, imageId, file)`](#upload)
    * [`uploadFactory(options)`](#upload-factory)

## Installation

Using npm:

```sh
npm i -s @ackee/resizin
```

Using yarn:

```sh
yarn add @ackee/resizin
```

## Quick start

```javascript
import { buildUrlFactory, uploadFactory } from 'resizin';
import config from '../config';

// Building image url
const buildUrl = buildUrlFactory({
    bucket: 'ackee',
});
 
const imageUrl = buildUrl('walle',  { width: 250,  });

// Uploading image
const upload = uploadFactory({
    apiKey: config.RESIZIN_API_KEY
})

upload(client.upload("Walle on the road", files[0]);
```

## API

### `buildUrl(serverUrl, bucket, imageId, options?: Options): string`

Return url of the image that is available at image server modified according to provided options.  

To avoid repeating information that doesn't change acroos an app like `serverUrl` and `bucket`, take a look at [`buildUrlFactory`](#build-factory).

```js
import { buildUrl } from 'resizin';

const image = buildUrl(
    'https://img.resizin.com',
    'ackee',
    'walle', 
    {
        width: 250, 
        filter: 'sharpen', 
        backgroundColor: '00bcd4',
        border: [10, 60, 10, 10]
    }
)
```

And result image is  
![Example image 1](https://img.resizin.com/ackee/image/w_250-f_sharpen-b_10_10_10_60-bg_00bcd4/walle)

For a complete list of modifiers look at the standalone [modifiers](#modifiers) section.

___

### `buildUrlFactory(options: ClientOptions): function`

```typescript
interface ClientOptions {
    serverUrl?: string;
    bucket: string;
}
```

Returns [`buildUrl`]() method with shortened interface `buildUrl(imageId: string, options: options)`

```js
import { buildUrlFactory } from 'resizin';

const buildUrl = buildUrlFactory({
    serverUrl: 'https://img.resizin.com',
    bucket: 'ackee',
});
 
const imageUrl = buildUrl('walle',  { width: 250, top: 20, left: 50 });
const secondImageUrl = buildUrl('walle',  { filter: 'negative', rotate: 180 });
```

You can omit `serverUrl` option when it's  `https://img.resizin.com` as it is a default value

```js
import { buildUrlFactory } from 'resizin';

const buildUrl = buildUrlFactory({ bucket: 'ackee' });
```

___

### Modifiers
You can try all modifiers at <a href="https://resizin.com/" target="_blank">Interactive documentation</a>.

| Modifier   |       Available options |
|----------|:-------------:|------:|
| width | |
| height | |
| filter | sepia, grayscale, sharpen, blur, negative, edge, gauss |
| size | |
| gravity | north, south, east, center, west, northeast, southeast, southwest, face |
| crop | fill, fit, pad, scale, cut, face |
| left | |
| top | |
| rotate | 90, 180, 270, 360 |
| border | [top, right, bottom, left] |
| backgroundColor | #hexColor, rgb() |
| quality | |
| upscale | |

___


### `upload(serverUrl, apiKey, imageId, file): Promise`

```js
import { upload } from 'resizin';

upload(
    'https://api.resizin.com',
    config.RESIZIN_API_KEY,
    'Walle on the road',
    files[0]
).then(() => {
    ...
});
```

To avoid repeating information that doesn't change acroos an app like `serverUrl` and `apiKey`, take a look at [`uploadFactory`](#upload-factory).

    
Examples from the wild:

#### Upload in client (get file using jQuery)

Assume you have a file input in your page

```HTML
<input type="file" id="fileinput" />
```

then

```js
import { upload } from 'resizin';

$('#fileinput').live('change', function(){ 
    var files = $('#fileinput').prop('files');
    
    upload(
        'https://api.resizin.com',
        config.RESIZIN_API_KEY,
        'imageid', 
        files[0]
    ).then(() => {
        ...      
    });
});
```

#### Upload in Node.js
```js
const resizin = require('resizin');
const fs = require('fs');
const config = require('../config');

const file = fs.createReadStream(__dirname + '/myfile.png');
var promise = resizin.upload(
    'https://api.resizin.com',
    config.RESIZIN_API_KEY,
    'imageid', 
    file
);
```

### `uploadFactory(options: Options): function`

```typescript
interface Options {
    serverUrl?: string;
    apiKey: string;
}
```

```js
import { uploadFactory } from 'resizin';

const upload = uploadFactory({
    serverUrl: 'https://api.resizin.com', 
    apiKey: config.RESIZIN_API_KEY,
});

upload("Walle on the road", files[0]);
```

You can omit `serverUrl` option when it's  `https://api.resizin.com` as it is a default value

```js
import { uploadFactory } from 'resizin';

const upload = uploadFactory({ apiKey: config.RESIZIN_API_KEY });
```

## License

[MIT](http://opensource.org/licenses/MIT)

Jakub Baierl & Jiří Šmolík

# resizin
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/resizin.svg)](https://bundlephobia.com/result?p=resizin)

Core package for uploading images and building url of images from [Resizin](https://resizin.com).

## Table of contents

* [Installation](#installation)
* [Quick start](#quick-start)
* [API](#api)
    * [`buildUrlFactory(options)`](#buildurlfactoryoptions-clientoptions-function)
    * [Modifiers](#modifiers)
    * [`upload(serverUrl, apiKey, imageId, file, options)`](#uploadserverurl-apikey-imageid--null-file-uploadoptions-options-promise)
    * [`uploadFactory(options)`](#uploadfactoryoptions-options-function)

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

// Uploading image
const upload = uploadFactory({
    apiKey: config.RESIZIN_API_KEY,
})

upload(files[0]);

// Building image url
const buildUrl = buildUrlFactory({
    bucket: 'ackee',
});
 
const imageUrl = buildUrl('walle',  {
    width: 250,
});
```

## API

### `buildUrlFactory(options: ClientOptions): function`

```typescript
interface ClientOptions {
    serverUrl?: string;
    bucket: string;
}
```

Result of factory is **`buildUrl`** function with interface **`buildUrl(imageId: string, modifiers: object)`**. The function returns url of the image that is available at image server adjust according to provided modifiers.  

```js
import { buildUrl } from 'resizin';

const buildUrl = buildUrlFactory({
    serverUrl: 'https://img.resizin.com',
    bucket: 'ackee',
});

const imageUrl = buildUrl(
    'walle', 
    {
        width: 250, 
        filter: 'sharpen', 
        backgroundColor: '00bcd4',
        border: [10, 60, 10, 10]
    }
);

const secondImageUrl = buildUrl('walle',  { filter: 'negative', rotate: 180 });
```

Here's how result images look like
<figure style="width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-f_sharpen-b_10_10_10_60-bg_00bcd4/walle" alt="Example image 1">
  <figcaption style="text-align:center"><code>imageUrl</code></figcaption>
</figure>

<figure style="width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/f_negative-r_180/walle" alt="Example image 2">
  <figcaption style="text-align:center"><code>secondImageUrl</code></figcaption>
</figure>

For a complete list of usable modifiers look at the standalone [modifiers](#modifiers) section.

#### Usage tips 

* You can omit `serverUrl` option when it's  `https://img.resizin.com` as it is a default value

    ```js
    import { buildUrlFactory } from 'resizin';

    const buildUrl = buildUrlFactory({ bucket: 'ackee' });
    ```

* `buildUrlFactory` is also default export from the package sou you can choose from two ways of importing it

    ```js
    import { buildUrlFactory } from 'resizin';
    
    // is the same as a
    
    import buildUrlFactory from 'resizin';
    ```

    That gives you an ability to name the factory whatever you like at the phase of importing it.

___

### Modifiers
You can try all modifiers at <a href="https://resizin.com/" target="_blank">Interactive documentation</a>.

| name | value |  example | notes |
|----------|:------:|:------:|:--------------|
| `width` | integer  | `width: 160` |
| `height` | integer | `height: 80` | 
| `filter` | one of `sepia`, `grayscale`, `sharpen`, `blur`, `negative`, `edge`, `gauss`| `filter: 'blur'` |
| `square` | integer| `square: 40` | Sets equal value of image width and height at once.
| `gravity` | one of `north`, `south`, `east`, `center`, `west`, `northeast`, `southeast`, `southwest`, `face` | `gravity: 'center'` |
| `crop` | one of `fill`, `fit`, `pad`, `scale`, `cut`, `face`| `crop: pad` |
| `left` | integer| `left: 25`  |
| `top` | integer| `top: 30`  |
| `rotate` | one of `90`, `180`, `270`, `360` | `rotate: 270` |
| `border` | array [top, right, bottom, left]| `border: [20, 30, 20, 20]`  |
| `backgroundColor` | #hexColor or rgb() | `backgroundColor:'#00ff00'` `backgroundColor:'rgb(0,255,0)'` | Determines border color
| `quality` | integer | `quality: 6`  | Image quality
| `upscale` | boolean | `upscale: true`  |

___

### `upload(serverUrl, apiKey, imageId = null, file, uploadOptions: Options): Promise`

```typescript
interface Options {
    fileType?: 'image'|'file'; // default is 'image'
    autoId?: boolean;          // default is true 
}
```

Usage

```js
import { upload } from 'resizin';

upload(
    'https://api.resizin.com',
    config.RESIZIN_API_KEY,
    null,
    files[0],
).then(() => {
    ...
});
```

To avoid repeating information that doesn't change across an app like `serverUrl` and `apiKey`, **take a look at [`uploadFactory`](#uploadfactoryoptions-options-function)**.

    
Examples from the wild:

#### Upload in client (React example)


```js
import React from 'react';
import { upload } from 'resizin';

const uploadFile = file =>
    upload(
        'https://api.resizin.com',
        config.RESIZIN_API_KEY,
        null,
        files[0]
    ).then(() => {
        ...      
    });


const UploadImageInput = () => (
    <input type="file" id="fileinput" onChange={e => uploadFile(e.target.files[0])} />
);
```

#### Upload in client (jQuery example)

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
        null,
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
    null, 
    file
);
```

### `uploadFactory(options: Options): function`

```typescript
interface Options {
    serverUrl?: string;
    apiKey: string;
    autoId?: boolean;
}
```

the factory returns function **`upload(file, imageId?)`**

```js
import { uploadFactory } from 'resizin';

const upload = uploadFactory({
    serverUrl: 'https://api.resizin.com', 
    apiKey: config.RESIZIN_API_KEY,
});

upload("Walle on the road", files[0]);
```

#### Usage tips

* You can omit `serverUrl` option when it's  `https://api.resizin.com` as it is a default value

    ```js
    import { uploadFactory } from 'resizin';

    const upload = uploadFactory({ apiKey: config.RESIZIN_API_KEY });
    ```

* If you set `autoId` option to `false`, you prevent auto generating image id, **but you must to provide it by yourself!**

    ```js
    import { uploadFactory } from 'resizin';

    const upload = uploadFactory({ apiKey: config.RESIZIN_API_KEY, autoId: false });

    upload(files[0], 'id-image-1');
    upload(files[1], 'id-image-2');
    ```

## License

[MIT](http://opensource.org/licenses/MIT)

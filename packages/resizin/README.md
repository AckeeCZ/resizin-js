# Package is currently being revitalised

![](http://static1.1.sqspcdn.com/static/f/207938/4844797/1258911333857/12345under.jpg)


# resizin
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/resizin.svg)](https://badgen.net/bundlephobia/minzip/resizin)

Core package for uploading images and building url of images from [Resizin](https://resizin.com).

## Table of contents

* [Installation](#installation)
* [API](#api)
    * [`clientFactory(options)`](#clientfactory)
    * [`buildUrl(serverUrl, bucket, imageId, options)`](#build-url)
    * [Modifiers](#modifiers)
    * [`upload(serverUrl, apiKey, imageId, file)`](#upload)

## <a name="installation"></a>Installation

Using npm:

```sh
npm i -s @ackee/resizin
```

Using yarn:

```sh
yarn add @ackee/resizin
```

## API

### `clientFactory(options: ClientOptions): ResizinClient`

```typescript
interface ClientOptions {
    serverUrl?: string;
    bucket?: string;
    apiKey?: string;
}
```


```typescript
interface ResizinClient {
    buildUrl(imageId, options);
    upload(imageId, file);
}
```

#### Building image url

```js
import clientFactory from 'resizin';

const client = clientFactory({
    serverUrl: 'https://img.resizin.com',
    bucket: 'ackee',
});
 
const image = client.buildUrl('walle',  { width: 250 });
```

You can omit `serverUrl` option when it's  `https://img.resizin.com`, because it's a default value:

```js
import clientFactory from 'resizin';

const client = clientFactory({ bucket: 'ackee' });
```

#### Uploading image

TBD

```js
import clientFactory from 'resizin';

const client = clientFactory({
    uploadUrl: 'https://api.resizin.com/api/v1/image/upload', 
            api_key = "56ebbff9276e563e008687d1",
    bucket: 'ackee',
});

client.upload()
```

___

### `buildUrl(serverUrl, bucket, imageId, options?: Options): string`

```js
const image = client.buildUrl(
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

### `upload(serverUrl, apiKey, imageId, file: string)`

TBD

```javascript
        const bucketUploader = uploadImage.bind(
            null, 
            url = "https://imageserver-admin-api.ack.ee/api/v1/image/upload", 
            api_key = "56ebbff9276e563e008687d1"
        );
```
    
### Upload
* Upload in browser (get file using jQuery)
    ```javascript
        $('#fileinput').live('change', function(){ 
          	var files = $('#fileinput').prop('files');
            var promise = bucketUploader( 
                id = "File name", 
                files[0]
            );
        });
    ```
    
    ```HTML
        <input type="file" id="fileinput" />
    ```

* Upload in Node.js
    ```javascript
        const fs = require('fs');

        const file = fs.createReadStream(__dirname + '/myfile.png');
        var promise = bucketUploader(
            'imageid', 
            file
        );
    ```


## License

[MIT](http://opensource.org/licenses/MIT)

Jakub Baierl & Jiří Šmolík

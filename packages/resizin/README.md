# resizin
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/resizin.svg)](https://bundlephobia.com/result?p=resizin)

Core package for uploading images and building url of images from [Resizin](https://resizin.com).

## Table of contents

* [Installation](#installation)
* [Quick start](#quick-start)
* [API](#api)
    * [`buildUrlFactory`](#buildurlfactoryoptions-clientoptions-functionimageid-modifiers)
    * [Modifiers](#modifiers)
    * [`uploadFactory`](#uploadfactoryoptions-options-functionfile-imageid)

## Installation

Using npm:

```sh
npm i -s resizin
```

Using yarn:

```sh
yarn add resizin
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

### `buildUrlFactory`


**`buildUrlFactory(options: ClientOptions): function(imageId, modifiers)`**

```typescript
interface ClientOptions {
    serverUrl?: string;
    bucket: string;
}
```

The factory returns **`buildUrl(imageId: string, modifiers: object)`** function.  
The function returns url of an image that is available at image server adjusted according to a provided modifiers.  

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

[Modifiers](../../docs/Modifiers.md)

___

[Upload](../../docs/Upload.md)


## License

[MIT](http://opensource.org/licenses/MIT)

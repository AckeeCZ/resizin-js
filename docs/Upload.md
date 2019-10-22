### `uploadFactory(options: Options): function(file, imageId?)`

```typescript
interface Options {
    serverUrl?: string;
    apiKey: string;
    autoId?: boolean;   // default is true
    fileType?: 'image'|'file'; // default is 'image'
}
```

- `serverUrl` - url of your Resizin
- `apiKey` - your Resizin api key that permits you to upload to the server
- `autoId` - wheter random identificator should be generated for each uploaded image
- `fileType` -  determines whether you will work only with images or with files. 
    - `file` - when selected you can still upload images
    - `image` - there are restrictions about uploaded file

the factory returns function **`upload(file, imageId?): Promise`**

```js
import { uploadFactory } from 'resizin';

const upload = uploadFactory({
    serverUrl: 'https://api.resizin.com', 
    apiKey: config.RESIZIN_API_KEY,
});

upload(files[0], "Walle on the road");
```

#### Usage tips

* You can omit `serverUrl` option when it's  `https://api.resizin.com` as it is a default value

    ```js
    import { uploadFactory } from 'resizin';

    const upload = uploadFactory({ apiKey: config.RESIZIN_API_KEY });
    ```

* If you set `autoId` option to `false`, you prevent auto generating image id, **but you must provide the id by yourself!**

    ```js
    import { uploadFactory } from 'resizin';

    const upload = uploadFactory({ apiKey: config.RESIZIN_API_KEY, autoId: false });

    upload(files[0], 'id-image-1');
    upload(files[1], 'id-image-2');
    ```

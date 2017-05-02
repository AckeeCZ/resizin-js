# SDK for Image Server services

Contains uploading component for upload images and build component to easily building URL for getting chosen image from server.
Interactive documentation <a href="https://imageserver.ack.ee/" target="_blank">here</a>.

## Upload component

* Package import
    * `var uploadImage = require("ackee-image-server").uploadImage;`
    * ES6: `import { uploadImage } from "ackee-image-server";`
     
* Initialization
    ```
        var bucketUploader = uploadImage.bind(null, url = "http://imageserver-admin-api.ack.ee/api/v1/image/upload", api_key = "56ebbff9276e563e008687d1");
    ```

* Upload
    ```
        bucketUploader(id = "File name", your_file);
    ```

## Build URL component

* Package import
    * `var buildSource = require("ackee-image-server").buildSource;`
    * ES6: `import { buildSource } from "ackee-image-server";`
     
* Bucket initialization
    ```
        var bucketBuilder = buildSource.bind(null, url = 'https://nocdnimg.ack.ee', bucket_alias = "test");
    ```

* Building URL
    ```
        bucketBuilder(id = 'pepus', {width: 250, left: '20', filter: 'sepia', rotate: 90, border: [10, 20]})
    ```

## Result

Built URL in a HTML element `<img>`

![alt tag](https://nocdnimg.ack.ee/test/image/w_250-x_20-f_sepia-r_90-b_10_20/pepus)


## License

[MIT](http://opensource.org/licenses/MIT)

Jakub Baierl & Jiří Šmolík

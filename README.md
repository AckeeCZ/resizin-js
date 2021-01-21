# Package is currently being revitalised

> This package is not maintained anymore. Use one of these packages instead
> * [resizin](https://www.npmjs.com/package/resizin)
> * [react-resizin](https://www.npmjs.com/package/react-resizin)
> * [node-resizin](https://www.npmjs.com/package/node-resizin)

![](http://static1.1.sqspcdn.com/static/f/207938/4844797/1258911333857/12345under.jpg)

# SDK for Image Server services

Contains uploading component for upload images and build component to easily building URL for getting chosen image from server.
Interactive documentation <a href="https://imageserver.ack.ee/" target="_blank">here</a>.

## Upload component

* Package import
    ``` javascript
        ES5: const uploadImage = require("ackee-image-server").uploadImage; 
        ES6: import { uploadImage } from "ackee-image-server";
    ```
     
* Initialization
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

## Build URL component

* Package import
    ```javascript
        ES5: const buildSource = require("ackee-image-server").buildSource;
        ES6: import { buildSource } from "ackee-image-server";
    ```

* Bucket initialization
    ```javascript
        const bucketBuilder = buildSource.bind(
            null, 
            url = 'https://img.ack.ee', 
            bucket_alias = "test"
        );
    ```

* Building URL
    ```javascript
        var url = bucketBuilder(
            id = 'pepus', 
            {
                width: 250, 
                left: '20', 
                filter: 'sepia', 
                rotate: 90, 
                border: [10, 20]
            }
        )
    ```

* Result

Built URL in a HTML element `<img>`

![alt tag](https://img.ack.ee/test/image/w_250-x_20-f_sepia-r_90-b_10_20/pepus)

* Modifiers
List of available modifiers.

| Modifier   |      Shortcut      |  Available options |
|----------|:-------------:|------:|
| width | w | |
| height | h | |
| filter | f | sepia, grayscale, sharpen, blur, negative, edge, gauss |
| size | s | |
| gravity | g | north, south, east, center, west, northeast, southeast, southwest, face |
| crop | c | fill, fit, pad, scale, cut, face |
| left | l | |
| top | t | |
| rotate | r | 90, 180, 270, 360 |
| border | b | [top, right, bottom, left] |
| backgroundColor | bg | #hexColor, rgb() |
| quality | q | |
| upscale | u | |

Modifiers usage demo <a href="https://imageserver.ack.ee/" target="_blank">here</a>.

## License

[MIT](http://opensource.org/licenses/MIT)

Jakub Baierl & Jiří Šmolík

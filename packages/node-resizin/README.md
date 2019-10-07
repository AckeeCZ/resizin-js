# Node.js SDK for Resizin

Node.js wrapper around Resizin api.

## Import

* Package import and initialization
    ``` javascript
        //when defining all params
        const upload = require("node-sdk-image-server")('apikey', 'baseurl', 'type'); 
        //simple usage
        const upload = require("node-sdk-image-server")('apikey'); 
    ```

 - `baseUrl` contains default value which serves resizin production server
 - `type`  can be `image` or ```file``` and defines whether you will work only with images or with files. When `file` is selected you can still upload images. Restrictions are only for `image` type.


    
### Upload
* Upload file in code
    ```javascript
    const fs = require('fs');
    const file = fs.createReadStream('/tmp/feedback.pdf');
    upload("myId", file, "application/pdf").then(fileDetails => {
    console.log(fileDetails);
    });
    ```

function takes 3 parameters `id` of the file `file` file it self which is stream or buffer and `mime-type`. If not specified `mime-type` defaults to `application/octet-stream` client / browser should provide you with correct mime-type. Or you should know the type of file from somewhere else.    
## License

[MIT](http://opensource.org/licenses/MIT)

Dominik Veselý

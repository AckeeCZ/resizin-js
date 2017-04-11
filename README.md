# SDK pro obsluhu dotazů na Image Server

Jednodušší skladba URL pro získání daného obrázku z image serveru.
Dokumentace <a href="https://imageserver.ack.ee/" target="_blank">zde</a>

## Použití

* Import balíčku
    * `var buildSource = require("ackee-image-server").buildSource;`
    * ES6: `import { buildSource } from "ackee-image-server";`
     
* Inicializace daného bucketu
    ```
        var bucketBuilder = buildSource.bind(null, 'https://nocdnimg.ack.ee', "test");
    ```

* Skladba URL
    ```
        bucketBuilder('pepus', {width: 250, left: '20', filter: 'sepia', rotate: 90, border: [10, 20]})
    ```

## Výsledek

Výsledná url v html tagu `<img>`

![alt tag](https://nocdnimg.ack.ee/test/image/w_250-x_20-f_sepia-r_90-b_10_20/pepus)


## License

[MIT](http://opensource.org/licenses/MIT)

Jakub Baierl & Jiří Šmolík

### Modifiers
You can try all modifiers at <a href="https://resizin.com/" target="_blank">Interactive documentation</a>.

* [`width`](#width)
* [`height`](#height)
* [`filter`](#filter)
* [`square`](#square)
* [`gravity`](#gravity)
* [`crop`](#crop)
* [`left`](#left)
* [`top`](#top)
* [`rotate`](#rotate)
* [`border`](#border)
* [`backgroundColor`](#backgroundcolor)
* [`quality`](#quality)
* [`upscale`](#upscale)
* [`format`](#format)

#### `width`
Determines width of an image.  
If height not set, it's counted according to the width value preserving aspect ratio.

```js
{
    width: 160
}
```

![Width example](https://img.resizin.com/ackee/image/w_160/walle)

#### `height`
Determines height of an image.  
If width not set, it's counted according to the height value preserving aspect ratio.

```js
{
    height: 80
}
```

![Height example](https://img.resizin.com/ackee/image/h_80/walle)

#### `filter`
Determines if any adjusting filter should be applied to an image.  
Value is one of **`sepia`**, **`greyscale`**, **`sharpen`**, **`blur`**, **`negative`**, **`edge`**, **`gauss`**.

```js
{
    width: 250,
    filter: 'blur',
}
```

<figure style="margin: 5px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250/walle" alt="No Filter Example sepia">
  <figcaption style="text-align:center"><code>No filter</code></figcaption>
</figure>

<figure style="margin: 5px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-f_sepia/walle" alt="Filter Example sepia">
  <figcaption style="text-align:center"><code>Sepia</code></figcaption>
</figure>

<figure style="margin: 5px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-f_greyscale/walle" alt="Filter Example greyscale">
  <figcaption style="text-align:center"><code>Greyscale</code></figcaption>
</figure>

<figure style="margin: 5px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-f_Sharpen/walle" alt="Filter Example Sharpen">
  <figcaption style="text-align:center"><code>Sharpen</code></figcaption>
</figure>

<figure style="margin: 5px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-f_blur/walle" alt="Filter Example blur">
  <figcaption style="text-align:center"><code>Blur</code></figcaption>
</figure>

<figure style="margin: 5px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-f_negative/walle" alt="Filter Example negative">
  <figcaption style="text-align:center"><code>Negative</code></figcaption>
</figure>

<figure style="margin: 5px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-f_edge/walle" alt="Filter Example edge">
  <figcaption style="text-align:center"><code>Edge</code></figcaption>
</figure>

<figure style="margin: 5px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-f_gauss/walle" alt="Filter Example gauss">
  <figcaption style="text-align:center"><code>Gauss</code></figcaption>
</figure>

#### `square`
Determines height and width of an image at once.  

```js
{
    square: 150
}
```

![Square example](https://img.resizin.com/ackee/image/s_150/walle)

#### `gravity`
Determines if any adjusting filter should be applied to an image.  
Value is one of **`north`**, **`south`**, **`east`**, **`center`**, **`west`**, **`northeast`**, **`southeast`**, **`southwest`**, **`face`**.

```js
{
    width: 250,
    height: 100,
    crop: 'cut',
    gravity: 'center',
}
```

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut/walle" alt="Gravity Example face">
  <figcaption style="text-align:center"><code>No gravity</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut-g_north/walle" alt="Gravity Example north">
  <figcaption style="text-align:center"><code>North</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut-g_south/walle" alt="Gravity Example south">
  <figcaption style="text-align:center"><code>South</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut-g_east/walle" alt="Gravity Example east">
  <figcaption style="text-align:center"><code>East</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut-g_center/walle" alt="Gravity Example center">
  <figcaption style="text-align:center"><code>Center</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut-g_west/walle" alt="Gravity Example west">
  <figcaption style="text-align:center"><code>West</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut-g_northeast/walle" alt="Gravity Example northeast">
  <figcaption style="text-align:center"><code>Northeast</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut-g_southeast/walle" alt="Gravity Example southeast">
  <figcaption style="text-align:center"><code>Southeast</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-h_100-c_cut-g_southwest/walle" alt="Gravity Example southwest">
  <figcaption style="text-align:center"><code>Southwest</code></figcaption>
</figure>

<figure style="margin: 5px; width: 250px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_250-g_face/walle" alt="Gravity Example face">
  <figcaption style="text-align:center"><code>Face</code></figcaption>
</figure>

#### `crop`
Determines if any adjusting filter should be applied to an image.  
Value is one of **`fill`**, **`fit`**, **`pad`**, **`scale`**, **`cut`**, **`face`**.

```js
{
    width: 150,
    height: 250,
    crop: 'pad',
}
```

* `fit` - maintain original proportions, resize so image fits wholly into new dimensions
* `fill` - maintain original proportions, resize via smallest dimension, crop the largest
* `cut` - maintain original proportions, no resize, crop to gravity or x/y
* `scale` - do not maintain original proportions, force image to be new dimensions (squishing the image)
* `pad` - maintain original proportions, resize so image fits wholly into new dimensions. Padding added on top/bottom or left/right as needed.
* `face` - crops photo around face, if size is specified image is resized after cropping

Default value is usually `fit`.   
If one of the following conditions is met then default value is `fill`:
  * square modifier is used
  * gravity is used and its value is not equal to center

<figure style="margin: 5px; width: 150px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_150-h_250-c_fill/walle" alt="Crop Example fill">
  <figcaption style="text-align:center"><code>fill</code></figcaption>
</figure>

<figure style="margin: 5px; width: 150px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_150-h_250-c_fit/walle" alt="Crop Example fit">
  <figcaption style="text-align:center"><code>fit</code></figcaption>
</figure>

<figure style="margin: 5px; width: 150px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_150-h_250-c_pad/walle" alt="Crop Example pad">
  <figcaption style="text-align:center"><code>pad</code></figcaption>
</figure>

<figure style="margin: 5px; width: 150px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_150-h_250-c_scale/walle" alt="Crop Example scale">
  <figcaption style="text-align:center"><code>scale</code></figcaption>
</figure>

<figure style="margin: 5px; width: 150px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_150-h_250-c_cut/walle" alt="Crop Example cut">
  <figcaption style="text-align:center"><code>cut</code></figcaption>
</figure>

<figure style="margin: 5px; width: 150px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_150-h_250-c_face/walle" alt="Crop Example face">
  <figcaption style="text-align:center"><code>face</code></figcaption>
</figure>

#### `left` | integer| `left: 25`  |
Determines horizontal image position.  

```js
{
    left: 35
}
```

![Left example](https://img.resizin.com/ackee/image/w_150-h_100-x_35/walle)

#### `top`
Determines vertical image position.  

```js
{
    top: 40
}
```

![Top example](https://img.resizin.com/ackee/image/w_150-h_100-y_40/walle)


#### `rotate`
Determines how much is image rotated.  
Value is one of **`90`**, **`180`**, **`270`**.
 
 
```js
{
    width: 150,
    rotate: 180,
}
```

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/h_150-r_90/walle" alt="Rotate Example 1">
  <figcaption style="text-align:center"><code>Rotation 90°</code></figcaption>
</figure>

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_150-r_180/walle" alt="Rotate Example 2">
  <figcaption style="text-align:center"><code>Rotation 180°</code></figcaption>
</figure>

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/h_150-r_270/walle" alt="Rotate Example 3">
  <figcaption style="text-align:center"><code>Rotation 270°</code></figcaption>
</figure>

#### `border`
Determines border of an image.  
Value is an array of border widths for a particular sides in order **top, right, bottom, left**.  
 Border color is set by [`backgroundColor`](#backgroundcolor) property.

```js
{
    width: 150,
    border: [10, 30, 60, 100],
    backgroundColor: '00bcd4',
}
```

![Border example](https://img.resizin.com/ackee/image/w_150-b_10_30_60_100-bg_00bcd4/walle)



#### `backgroundColor`
Determines border color if border set, or image background color if cropped to `pad`.  
Value is RGBA style color.

```js
{
    width: 250,
    height: 120,
    crop: 'pad',
    backgroundColor:'00bcd4',
}
```

![backgroundColor example 1](https://img.resizin.com/ackee/image/w_250-h_120-c_pad-bg_00bcd4/walle)

```js
{
    width: 250,
    border: [10, 10, 10, 10],
    backgroundColor:'00bcd4',
}
```

![backgroundColor example 1](https://img.resizin.com/ackee/image/w_250-b_10_10_10_10-bg_00bcd4/walle)

#### `quality`
Determines pixel quality of an image.  
Value is a number from 1 to N where higher value gives a better quality.
 
```js
{
    width: 350,
    quality: 36,
}
```

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_350-q_9/walle" alt="Quality Example 1">
  <figcaption style="text-align:center"><code>9</code></figcaption>
</figure>

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_350-q_27/walle" alt="Quality Example 2">
  <figcaption style="text-align:center"><code>27</code></figcaption>
</figure>

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_350-q_81/walle" alt="Quality Example 3">
  <figcaption style="text-align:center"><code>81</code></figcaption>
</figure>



#### `upscale`

Value is `true` or `false`.

```js
{
    width: 350,
    upscale: true,
}
```

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_350/walle" alt="upscale Example 1">
  <figcaption style="text-align:center"><code>Upscale false</code></figcaption>
</figure>

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_350-u_1/walle" alt="upscale Example 2">
  <figcaption style="text-align:center"><code>Upscale true</code></figcaption>
</figure>

#### `format`

Allows you to specify the file type, accepts one of the following strings: `jpg`, `jpeg`, `png`, `webp`, `tiff`

Default format is the original format of the image when it was uploaded. 

```js
{
    width: 350
    format: 'png',
}
```

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_350-o_png/walle" alt="upscale Example 1">
  <figcaption style="text-align:center"><code>Format png</code></figcaption>
</figure>

<figure style="margin: 10px; display: inline-block">
  <img src="https://img.resizin.com/ackee/image/w_350-o_jpg/walle" alt="upscale Example 1">
  <figcaption style="text-align:center"><code>Format jpg</code></figcaption>
</figure>

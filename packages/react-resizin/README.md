# react-resizin
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/react-resizin.svg)](https://bundlephobia.com/result?p=react-resizin)

React components for easy displaying images from [`Resizin`](https://www.npmjs.com/package/resizin) image server.

## Table of contents

* [Installation](#installation)
* [Quick start](#quickstart)
* [API](#api)
    * [`ResizinProvider`](#resizinprovider)
    * [`Image`](#image)
    * [`useImage`](#use-image)

## Installation

Using npm:

```sh
npm i -s react-resizin
```

Using yarn:

```sh
yarn add react-resizin
```

## Quick start

```jsx
const { ResizinProvider, Image } = require('react-resizin');

const App = () => (
    <ResizinProvider bucket="ackee">
        <Image
            imgId="walle"
            options={{
                width: 400,
                filter: "greyscale",
            }}
            alt="Walle image" 
        />
    </ResizinProvider>
);

React.render(<App>, document.body);
```

---

## API

### `ResizinProvider`

You typically need only one provider in your app. It cares about supplying Resizin to all [`Image`](#image) components that it contains.

#### Props

* **bucket** - Name of your image server instance bucket.
* **serverUrl** - Image server url. It's optional and defaults to `https://img.resizin.com`.

[**ResizinProvider examples**](./docs/ProviderComponent.md)

### `Image`

Render image as a standard `img` tag (unless you provide children func, see below).

#### Props

* **imgId** - Image identificator.
* **options** - Image modifiers as defined at [docs](https://github.com/AckeeCZ/resizin-js/tree/master/docs/Modifiers.md).
* All other props are passed over to the `img` element.
* **children** - If you need to render image in different way than as an `img`, provide a function as a component children. The function has the image url as a first argument.

[**Image examples**](./docs/ImageComponent.md)

### `useImage`

Image url can also be generated with this React hook. It has a signature

```js
useImage(imageId, imgOptions)
```

and can be used as

```jsx
import { ResizinProvider, useImage } from 'react-resizin';

const MyContent = () => {
    const url = useImage('walle', {
        filter: 'blur',
        width: 300,
        height: 200,
    });
    return (
        <div
            style={{
                backgroundImage: `url(${url})`
            }}
        >
            I'm Wall-E
        </div>
    )
}

render(
    <ResizinProvider bucket="ackee">
        <MyContent>
    </ResizinProvider>
)
```

## License

[MIT](http://opensource.org/licenses/MIT)

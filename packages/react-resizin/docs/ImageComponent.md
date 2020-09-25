Basic usage:

```jsx
import { ResizinProvider, Image } from 'react-resizin';

<ResizinProvider bucket="ackee">
    <Image
        imgId="walle"
        options={{
            filter: 'greyscale',
            backgroundColor: '005500',
            border: [60, 60, 60, 260],
        }}
        height="200" 
        format="o_webp"
    />
</ResizinProvider>
```

Using children func for more custom render:

```jsx
import { ResizinProvider, Image } from 'react-resizin';

<ResizinProvider bucket="ackee">
    <Image
        imgId="walle"
        options={{
            filter: 'blur',
            width: 300,
            height: 200,
        }}
    >
        {url => (
            <div 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: 300,
                    height: 200,
                    backgroundImage: `url(${url})`,
                    font: '30px bold',
                }}>
                Has blured image as a background
            </div>
        )}
    </Image>
</ResizinProvider>
```

Passing ref to access image element:

```jsx
import { ResizinProvider, Image } from 'react-resizin';

let imageRef;
<ResizinProvider bucket="ackee">
    <button 
        onClick={() => alert(`Image dimensions are ${imageRef.width}x${imageRef.height}`)}
        style={{ display: 'block', marginBottom: '1rem' }}
    >
        Obtain button dimensions
    </button>
    
    <Image
        imgId="walle"
        options={{
            filter: 'greyscale',
            backgroundColor: '005500',
            border: [60, 60, 60, 260],
        }}
        height="200"
        innerRef={ref => {imageRef = ref}}
    />
</ResizinProvider>
```

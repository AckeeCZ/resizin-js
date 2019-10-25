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

import React from 'react';
import { Options } from 'resizin';

import ResizinContext from '../components/ResizinContext';

const useImage = (imageId: string, options: Options): string => {
    const buildImageUrl = React.useContext(ResizinContext);

    return buildImageUrl(imageId, options);
};

export default useImage;


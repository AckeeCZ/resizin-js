import React from 'react';
import { BuildUrlFnc } from 'resizin';

import ResizinContext from '../components/ResizinContext';

const useResizinContext = (): BuildUrlFnc => {
    const buildImageUrl = React.useContext(ResizinContext);

    if (!buildImageUrl) {
        throw new Error(
            'could not find Resizin context value; please ensure the component is wrapped in a <ResizinProvider>',
        );
    }

    return buildImageUrl;
};

export default useResizinContext;

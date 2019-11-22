import React from 'react';
import ResizinContext from '../ResizinContext';

const useResizin = () => {
    const buildImageUrl = React.useContext(ResizinContext);
    return buildImageUrl;
};

export default useResizin;

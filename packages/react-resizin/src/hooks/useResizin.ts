import React from 'react';
import ResizinContext from '../components/ResizinContext';

const useResizin = () => {
    const buildImageUrl = React.useContext(ResizinContext);
    return buildImageUrl;
};

export default useResizin;

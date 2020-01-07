import { Options } from 'resizin';

import useResizinContext from './useResizinContext';

const useImage = (imageId: string, options?: Options): string => {
    const buildImageUrl = useResizinContext();

    return buildImageUrl(imageId, options);
};

export default useImage;


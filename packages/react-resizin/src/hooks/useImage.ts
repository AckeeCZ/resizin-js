import { Options } from 'resizin';

import useResizinContext from './useResizinContext';

const useImage = (imageId: string, options?: Options): string|null => {
    const buildImageUrl = useResizinContext();

    return imageId ? buildImageUrl(imageId, options) : null;
};

export default useImage;

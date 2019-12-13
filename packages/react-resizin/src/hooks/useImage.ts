import { Options } from 'resizin';
import useResizin from './useResizin';

const useImage = (imageId: string, options: Options): string => {
    const buildImageUrl = useResizin();
    return buildImageUrl(imageId, options);
};

export default useImage;


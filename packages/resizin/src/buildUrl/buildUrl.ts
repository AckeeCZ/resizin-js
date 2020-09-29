import { serializeOptions, Options } from '../options';
import { Formats } from '../formats';

const buildUrl = (serverUrl: string, bucket: string, imageId: string, options?: Options, format: Formats = '') => {
    let serializedOptions = serializeOptions(options);

    if (serializedOptions) {
        serializedOptions += '/';
    }
    if (imageId.charAt(0) === '/') {
        imageId = imageId.substr(1);
    }
    if (format) {
        format += '-';
    }

    return `${serverUrl}/${bucket}/image/${format}${serializedOptions}${imageId}`;
};

export default buildUrl;

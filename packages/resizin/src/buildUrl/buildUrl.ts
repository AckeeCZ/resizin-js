import { serializeOptions, Options } from '../options';

const buildUrl = (serverUrl: string, bucket: string, imageId: string, options?: Options) => {
    let serializedOptions = serializeOptions(options);

    if (serializedOptions) {
        serializedOptions += '/';
    }
    if (imageId.charAt(0) === '/') {
        imageId = imageId.substr(1);
    }

    return `${serverUrl}/${bucket}/image/${serializedOptions}${imageId}`;
};

export default buildUrl;

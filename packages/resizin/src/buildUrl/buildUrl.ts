import { serializeOptions, Options } from '../options';

const buildUrl = (serverUrl: string, bucket: string, imageId: string, options?: Options) => {
    let serializedOptions = serializeOptions(options);
    if (serializedOptions) {
        serializedOptions += '/';
    }
    return `${serverUrl}/${bucket}/image/${serializedOptions}${imageId}`;
};

export default buildUrl;

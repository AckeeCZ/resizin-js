import { serializeOptions, Options } from './options';

const buildUrl = (imageServerUrl: string, bucket: string, imageId: string, options?: Options) => {
    let serializedOptions = serializeOptions(options);
    if (serializedOptions) {
        serializedOptions += '/';
    }
    return `${imageServerUrl}/${bucket}/image/${serializedOptions}${imageId}`;
};

export default buildUrl;

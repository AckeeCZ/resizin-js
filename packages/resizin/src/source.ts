import { serializeOptions } from './options';

export const buildSource = (base, bucket, imageId, options) => {
    let serializedOptions = serializeOptions(options);
    if (serializedOptions) {
        serializedOptions += '/';
    }
    return `${base}/${bucket}/image/${serializedOptions}${imageId}`;
};

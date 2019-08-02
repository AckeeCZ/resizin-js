import { serializeOptions, Options } from './options';

export const buildSource = (base: string, bucket: string, imageId: string, options?: Options) => {
    let serializedOptions = serializeOptions(options);
    if (serializedOptions) {
        serializedOptions += '/';
    }
    return `${base}/${bucket}/image/${serializedOptions}${imageId}`;
};

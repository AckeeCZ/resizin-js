import { DEFAULT_SERVER_URL } from '../constants';
import { Options } from '../options';

import buildUrl from './buildUrl';

export interface ClientOptions {
    serverUrl?: string;
    bucket: string;
}

export type BuildUrlFnc = (imageId: string, buildOptions?: Options) => string;

const buildUrlFactory = (options: ClientOptions): BuildUrlFnc => {
    if (!options.bucket) {
        throw new Error('You did not provide bucket name, which is required for building image url');
    }

    const serverUrl = options.serverUrl || DEFAULT_SERVER_URL;

    return (imageId: string, buildOptions?: Options) =>
        buildUrl(serverUrl, options.bucket, imageId, buildOptions);
};

export default buildUrlFactory;

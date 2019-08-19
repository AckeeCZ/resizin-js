import { DEFAULT_SERVER_URL } from '../constants';
import { Options } from '../options';

import buildUrl from './buildUrl';

export interface ClientOptions {
    serverUrl?: string;
    bucket: string;
}

const buildUrlFactory = (options: ClientOptions) => (imageId: string, buildOptions?: Options) => {
    if (!options.bucket) {
        throw new Error('You did not provide bucket name, which is required for building iamge url');
    }

    const serverUrl = options.serverUrl || DEFAULT_SERVER_URL;

    buildUrl(serverUrl, options.bucket, imageId, buildOptions);
};

export default buildUrlFactory;

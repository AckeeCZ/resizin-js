import buildUrl from './buildUrl';
import upload from './upload';
import { Options } from './options';
import { DEFAULT_SERVER_URL } from './constants';

interface ClientOptions {
    serverUrl?: string;
    bucket?: string;
    apiKey?: string;
}

function clientFactory(options: ClientOptions  = {}) {
    const serverUrl = options.serverUrl || DEFAULT_SERVER_URL;

    return {
        buildUrl(imageId: string, buildOptions?: Options) {
            if (!options.bucket) {
                throw new Error('You did not provided bucket name, which is required for building iamge url');
            }

            buildUrl(serverUrl, options.bucket, imageId, buildOptions);
        },
        upload(imageId: string, file: string) {
            if (!options.apiKey) {
                throw new Error('You did not provided api key, which is required for image uploading');
            }

            upload(serverUrl, options.apiKey, imageId, file);
        },
    };
}

export default clientFactory;

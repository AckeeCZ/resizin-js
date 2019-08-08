import buildUrl from './buildUrl';
import upload from './upload';
import { Options } from './options';
import { DEFAULT_SERVER_URL } from './constants';

interface ClientOptions {
    serverUrl?: string;
    uploadUrl?: string;
    bucket?: string;
    apiKey?: string;
}

function clientFactory(options: ClientOptions  = {}) {
    return {
        buildUrl(imageId: string, buildOptions?: Options) {
            if (!options.bucket) {
                throw new Error('You did not provide bucket name, which is required for building iamge url');
            }

            const serverUrl = options.serverUrl || DEFAULT_SERVER_URL;

            buildUrl(serverUrl, options.bucket, imageId, buildOptions);
        },
        upload(imageId: string, file: string) {
            if (!options.uploadUrl) {
                throw new Error('You did not provide Resizin url for image uploading');
            }

            if (!options.apiKey) {
                throw new Error('You did not provide api key, which is required for image uploading');
            }

            upload(options.uploadUrl, options.apiKey, imageId, file);
        },
    };
}

export default clientFactory;

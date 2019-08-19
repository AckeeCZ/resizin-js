import upload from '../upload';
import { DEFAULT_API_URL } from '../constants';

interface ClientOptions {
    serverUrl?: string;
    apiKey: string;
}

const uploadFactory = (options: ClientOptions) => (imageId: string, file: string) => {
    const serverUrl = options.serverUrl || DEFAULT_API_URL;

    if (!options.apiKey) {
        throw new Error('You did not provide api key, which is required for image uploading');
    }

    upload(serverUrl, options.apiKey, imageId, file);
};

export default uploadFactory;

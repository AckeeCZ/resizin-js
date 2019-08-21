import upload from './upload';
import { DEFAULT_API_URL } from '../constants';

interface ClientOptions {
    serverUrl?: string;
    apiKey: string;
}

const uploadFactory = (options: ClientOptions = {} as ClientOptions) => (imageId: string, file: string) => {
    const serverUrl = options.serverUrl || DEFAULT_API_URL;

    return upload(serverUrl, options.apiKey, imageId, file);
};

export default uploadFactory;

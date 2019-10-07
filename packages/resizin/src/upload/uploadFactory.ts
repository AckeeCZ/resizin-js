import upload, { FileType } from './upload';
import { DEFAULT_API_URL } from '../constants';

interface ClientOptions {
    serverUrl?: string;
    apiKey: string;
    fileType?: FileType;
}

const uploadFactory = (options: ClientOptions = { apiKey: '' }) => (
    imageId: string,
    file: string,
    mime: string,
) => {
    const serverUrl = options.serverUrl || DEFAULT_API_URL;

    return upload(serverUrl, options.apiKey, imageId, file, { fileType: options.fileType, mime });
};

export default uploadFactory;

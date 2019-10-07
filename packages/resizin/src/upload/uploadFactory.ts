import upload, { FileType } from './upload';
import { DEFAULT_API_URL } from '../constants';

interface ClientOptions {
    serverUrl?: string;
    apiKey: string;
    fileType?: FileType;
    autoId?: boolean;
}

const uploadFactory = (options: ClientOptions = { apiKey: '' }) => (
    file: string|Blob,
    imageId?: string,
    mime?: string,
) => {
    const serverUrl = options.serverUrl || DEFAULT_API_URL;

    return upload(serverUrl, options.apiKey, imageId || null, file, {
        fileType: options.fileType,
        mime,
        autoId: options.autoId,
    });
};

export default uploadFactory;

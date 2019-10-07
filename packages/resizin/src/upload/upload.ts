import { defaults } from 'lodash';
import fetch from 'isomorphic-fetch';
import Promise from 'promise-polyfill';
import getUniqueId from 'uuid/v1';

const type = {
    IMAGE: 'image',
    FILE: 'file',
};

const mimeByType = {
    [type.IMAGE]: 'image/png',
    [type.FILE]: 'application/octet-stream',
};

export type FileType = 'file' | 'image';

interface UploadOptions {
    fileType?: FileType;
    mime?: string;
    autoId?: boolean;
}

const defaultOptions = { fileType: type.IMAGE, autoId: true };

const uploadImage = (
    serverUrl: string,
    apiKey: string,
    imageId: string|null,
    file: string|Blob,
    uploadOptions?: UploadOptions,
) => {
    return Promise.resolve().then(() => {
        const options = defaults(uploadOptions, defaultOptions);

        if (!serverUrl) {
            throw new Error('Url is missing!');
        }
        if (!apiKey) {
            throw new Error('API KEY is missing!');
        }
        if (!imageId && !options.autoId) {
            throw new Error('Image id is missing!');
        }
        if (!file) {
            throw new Error('File is missing!');
        }

        const fileType = options.fileType === type.IMAGE ? options.fileType : type.FILE;
        const fetchOptions: any = {
            method: 'POST',
            headers: {
                Authorization: 'Key ' + apiKey,
            },
        };

        const formData = new FormData();
        const id = options.autoId && !imageId ? getUniqueId() : imageId as string;

        // TODO - how to deal with FormData having different interface in different environments.
        // At Browser app there is a native FormData which accepts only filename as a third parameter
        // whereas at Node.js there is commnunity implementiion of the FormData and has more complex
        // third parameter (including contentType).
        const fileMeta = {
            contentType: options.mime || mimeByType[fileType],
        } as any;

        formData.append('id', id);
        formData.append('file', file, fileMeta);
        fetchOptions.body = formData;

        const url = `${serverUrl}/api/v1/${fileType}/upload`;

        return fetch(url, fetchOptions).then(response => {
            return response.json().then(res => {
                if (response.status >= 400) {
                    throw new Error(res.message || 'Bad response from server!');
                }
                return res;
            });
        });
    });
};

export default uploadImage;

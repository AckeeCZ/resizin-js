import fetch from 'isomorphic-fetch';
import NodeFormData from 'form-data';
import Promise from 'promise-polyfill';

const uploadImage = (serverUrl: string, apiKey: string, imageId: string, file: string) => {
    return Promise.resolve().then(() => {
        if (!serverUrl) {
            throw new Error('Url is missing!');
        }
        if (!apiKey) {
            throw new Error('API KEY is missing!');
        }
        if (!imageId) {
            throw new Error('Name is missing!'); // TODO - change to "Id is missing"
        }
        if (!file) {
            throw new Error('Body is missing!'); // TODO - change to "File is missing"
        }

        const options: any = {
            method: 'POST',
            headers: {
                Authorization: 'Key ' + apiKey,
            },
        };

        // TODO - polyfill FormData in node-resizing package
        let formData;
        if (typeof window === 'undefined') {
            formData = new NodeFormData();
        } else {
            formData = new FormData();
        }

        formData.append('id', imageId);
        formData.append('file', file);
        options.body = formData;

        return fetch(serverUrl, options).then((response) => {
            return response.json().then((res) => {
                if (response.status >= 400) {
                    throw new Error(res.message || 'Bad response from server!');
                }
                return res;
            });
        });
    });
};

export default uploadImage;

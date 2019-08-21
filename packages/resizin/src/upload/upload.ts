import fetch from 'isomorphic-fetch';
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

        const formData = new FormData();

        formData.append('id', imageId);
        formData.append('file', file);
        options.body = formData;

        const url = `${serverUrl}/api/v1/image/upload`;

        return fetch(url, options).then((response) => {
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

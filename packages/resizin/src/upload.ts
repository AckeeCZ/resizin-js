import fetch from 'isomorphic-fetch';
import NodeFormData from 'form-data';
import Promise from 'promise-polyfill';

export const uploadImage = (url?: string, api_key?: string, id?: string, file?: string) => {
    return Promise.resolve().then(() => {
        if (!url) {
            throw new Error('Url is missing!');
        }
        if (!api_key) {
            throw new Error('API KEY is missing!');
        }
        if (!id) {
            throw new Error('Name is missing!'); // TODO - change to "Id is missing"
        }
        if (!file) {
            throw new Error('Body is missing!'); // TODO - change to "File is missing"
        }

        let options: any = {
            method: 'POST',
            headers: {
                Authorization: 'Key ' + api_key,
            },
        };

        // TODO - polyfill FormData in node-resizing package
        let formData;
        if (typeof window === 'undefined') {
            formData = new NodeFormData();
        } else {
            formData = new FormData();
        }

        formData.append('id', id);
        formData.append('file', file);
        options.body = formData;

        return fetch(url, options).then(function(response) {
            return response.json().then(function(res) {
                if (response.status >= 400) {
                    throw new Error(res.message || 'Bad response from server!');
                }
                return res;
            });
        });
    });
};

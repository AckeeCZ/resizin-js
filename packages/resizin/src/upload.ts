import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import NodeFormData from 'form-data';

export const uploadImage = (url, api_key, id, file) => {
    return Promise.resolve()
        .then(() => {
            if(!url){
                throw new Error("Url is missing!");
            }
            if(!id){
                throw new Error("Name is missing!");
            }
            if(!api_key){
                throw new Error("API KEY is missing!");
            }
            if(!file){
                throw new Error("Body is missing!");
            }

            let options = {
                "method": "POST",
                "headers": {
                    "Authorization": "Key " + api_key
                }
            }

            let formData;
            if (typeof window === 'undefined') {
                formData = new NodeFormData();
            } else {
                formData = new FormData();
            }

            formData.append('id', id);
            formData.append('file', file);
            options.body = formData;

            return fetch(url, options)
                .then(function(response) {
                    return response.json()
                    .then(function(res) {
                        if (response.status >= 400) {
                            throw new Error(res.message || "Bad response from server!");
                        }
                        return res;
                    })
                });
        });
};

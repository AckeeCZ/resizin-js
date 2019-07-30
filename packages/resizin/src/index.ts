import _ from 'lodash';
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import NodeFormData from 'form-data';

const TRANSFORMS = {
    string(v) {
        return String(v || '');
    },
    array(v) {
        switch (true) {
            case _.isArray(v):
                return _.map(v, TRANSFORMS.string).join('_');
            default:
                return TRANSFORMS.string(v);
        }
    },
    enu(options) {
        return (v) => _.find(options, ((x) => (x == v))); // eslint-disable-line eqeqeq
    },
    int(v) {
        return TRANSFORMS.string(_.parseInt(v) || '');
    },
    intArray(v) {
        return TRANSFORMS.array(_.map(_.castArray(v), TRANSFORMS.int));
    }
};

const OPTION_TRANSFORMS = {
    // Default is string
    gravity: TRANSFORMS.enu(['north', 'south', 'east', 'center', 'west', 'northeast', 'southeast', 'southwest', 'face']),
    crop: TRANSFORMS.enu(['fill', 'fit', 'pad', 'scale', 'cut', 'face']),
    width: TRANSFORMS.int,
    height: TRANSFORMS.int,
    filter: TRANSFORMS.enu(['sepia', 'grayscale', 'sharpen', 'blur', 'negative', 'edge', 'gauss']),
    rotate: TRANSFORMS.enu([90, 180, 270, 360]),
    left: TRANSFORMS.int,
    top: TRANSFORMS.int,
    upscale: TRANSFORMS.int,
    quality: TRANSFORMS.int,
    border: TRANSFORMS.intArray,
};

const OPTIONS = {
    width: 'w',
    height: 'h',
    filter: 'f',
    size: 's',
    gravity: 'g',
    crop: 'c',
    left: 'x',
    top: 'y',
    rotate: 'r',
    border: 'b',
    backgroundColor: 'bg',
    quality: 'q',
    upscale: 'u',
};

const normalizeOptionValue = (value, option) => {
    if (_.isString(value)) {
        return value;
    }
    return (OPTION_TRANSFORMS[option] || TRANSFORMS.string)(value);
};

export const serializeOptions = (_options) => {
    if (!_options) {
        return '';
    }
    if (_.isEmpty(_options)) {
        return '';
    }

    const opts = [];
    _.map(_options, (value, option) => {
        if (OPTIONS[option]) {
            const normalized = normalizeOptionValue(value, option);
            if (normalized) {
                opts.push(`${OPTIONS[option]}_${normalized}`);
            }
        }
    });
    return opts.join('-');
};

export const buildSource = (base, bucket, imageId, options) => {
    let serializedOptions = serializeOptions(options);
    if (serializedOptions) {
        serializedOptions += '/';
    }
    return `${base}/${bucket}/image/${serializedOptions}${imageId}`;
};

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

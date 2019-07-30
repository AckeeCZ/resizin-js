import { isArray, map, find, castArray, isString, isEmpty } from 'lodash';

export declare type Options = {[key: string]: any};

const TRANSFORMS = {
    string(v: string|number) {
        return String(v || '');
    },
    array(v: any) {
        switch (true) {
            case isArray(v):
                return map(v, TRANSFORMS.string).join('_');
            default:
                return TRANSFORMS.string(v);
        }
    },
    enum(options: number[]|string[]) {
        // TODO - why do we need weak comparation?
        return (v: string|number) => find(options, x => x == v);
    },
    int(v: string) {
        return TRANSFORMS.string(parseInt(v, 10) || '');
    },
    intArray(v: string|string[]) {
        return TRANSFORMS.array(map(castArray(v), TRANSFORMS.int));
    },
};

const OPTION_TRANSFORMS: {[key: string]: (value: any) => any} = {
    width: TRANSFORMS.int,
    height: TRANSFORMS.int,
    filter: TRANSFORMS.enum(['sepia', 'grayscale', 'sharpen', 'blur', 'negative', 'edge', 'gauss']),
    square: TRANSFORMS.int,
    gravity: TRANSFORMS.enum([
        'north',
        'south',
        'east',
        'center',
        'west',
        'northeast',
        'southeast',
        'southwest',
        'face',
    ]),
    crop: TRANSFORMS.enum(['fill', 'fit', 'pad', 'scale', 'cut', 'face']),
    left: TRANSFORMS.int,
    top: TRANSFORMS.int,
    rotate: TRANSFORMS.enum([90, 180, 270, 360]),
    border: TRANSFORMS.intArray,
    quality: TRANSFORMS.int,
    upscale: TRANSFORMS.int,
};

const OPTIONS: {[key: string]: string} = {
    width: 'w',
    height: 'h',
    filter: 'f',
    square: 's',
    gravity: 'g',
    crop: 'c',
    left: 'x',
    top: 'y',
    rotate: 'r',
    border: 'b',
    backgroundColor: 'bg',
    quality: 'q',
    upscale: 'u', // TODO - not present in https://gitlab.ack.ee/Ackee/image-server#modifiers
    // external: 'e', TODO - missing, defined in https://gitlab.ack.ee/Ackee/image-server#modifiers
};

const normalizeOptionValue = (value: string|number|string[]|number[], option: string) => {
    // TODO - this is nonsense - it breaks enu or int transform validation
    if (isString(value)) {
        return value;
    }
    return (OPTION_TRANSFORMS[option] || TRANSFORMS.string)(value);
};

export const serializeOptions = (options: Options = {}) => {
    if (!options || isEmpty(options)) {
        return '';
    }

    const opts: string[] = [];
    map(options, (value, option) => {
        if (OPTIONS[option]) {
            const normalized = normalizeOptionValue(value, option);
            if (normalized) {
                opts.push(`${OPTIONS[option]}_${normalized}`);
            }
        }
    });
    return opts.join('-');
};

import { isArray, map, find, castArray, isEmpty } from 'lodash';

export interface Options {
    width?: number;
    height?: number;
    filter?: 'sepia' | 'greyscale' | 'sharpen' | 'blur' | 'negative' | 'edge' | 'gauss';
    square?: number;
    gravity?: 'north' | 'south' | 'east' | 'center' | 'west' | 'northeast' | 'southeast' | 'southwest' | 'face';
    crop?: 'fill' | 'fit' | 'pad' | 'scale' | 'cut' | 'face';
    left?: number;
    top?: number;
    rotate?: 90 | 180 | 270 | 360;
    border?: number;
    backgroundColor?: string;
    quality?: number;
    upscale?: boolean;
}

declare type Transformation<T = any> = (value: T) => string;

interface OptionDefinition<T = any> {
    identifier: string;
    transform?: Transformation<T>;
}

const TRANSFORMS = {
    string: (v: any): string => (v || '').toString(),
    array: (v: any): string => {
        switch (true) {
            case isArray(v):
                return map(v, TRANSFORMS.string).join('_');
            default:
                return TRANSFORMS.string(v);
        }
    },
    enum: (options: number[] | string[]) => (v: string | number) => {
        const val = find(options, option => option === v);

        return TRANSFORMS.string(val);
    },
    int: (v: string): string => TRANSFORMS.string(parseInt(v, 10) || ''),
    intArray: (v: string | string[]): string => {
        const values = map(castArray(v), TRANSFORMS.int);
        return values.some(isEmpty) ? '' : TRANSFORMS.array(values);
    },
    bool: (v: boolean) => (v ? '1' : ''),
};

const OPTIONS: { [key: string]: OptionDefinition } = {
    width: { identifier: 'w', transform: TRANSFORMS.int },
    height: { identifier: 'h', transform: TRANSFORMS.int },
    filter: {
        identifier: 'f',
        transform: TRANSFORMS.enum(['sepia', 'greyscale', 'sharpen', 'blur', 'negative', 'edge', 'gauss']),
    },
    square: { identifier: 's', transform: TRANSFORMS.int },
    gravity: {
        identifier: 'g',
        transform: TRANSFORMS.enum([
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
    },
    crop: { identifier: 'c', transform: TRANSFORMS.enum(['fill', 'fit', 'pad', 'scale', 'cut', 'face']) },
    left: { identifier: 'x', transform: TRANSFORMS.int },
    top: { identifier: 'y', transform: TRANSFORMS.int },
    rotate: { identifier: 'r', transform: TRANSFORMS.enum([90, 180, 270, 360]) },
    border: { identifier: 'b', transform: TRANSFORMS.intArray },
    backgroundColor: { identifier: 'bg' },
    quality: { identifier: 'q', transform: TRANSFORMS.int },
    upscale: { identifier: 'u', transform: TRANSFORMS.bool },
};

const serializeOption = (value: any, optionName: string) => {
    const option = OPTIONS[optionName];

    if (!option) {
        return '';
    }

    const transform = option.transform || TRANSFORMS.string;
    const normalizedValue = transform(value);

    return normalizedValue ? `${option.identifier}_${normalizedValue}` : '';
};

export const serializeOptions = (options: Options = {}) => {
    if (!options || isEmpty(options)) {
        return '';
    }

    return map(options, serializeOption)
        .filter(Boolean)
        .join('-');
};

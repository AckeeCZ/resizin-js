import _ from 'lodash';

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
        // TODO - why do we need weak comparation?
        return v => _.find(options, x => x == v);
    },
    int(v) {
        return TRANSFORMS.string(_.parseInt(v) || '');
    },
    intArray(v) {
        return TRANSFORMS.array(_.map(_.castArray(v), TRANSFORMS.int));
    },
};

const OPTION_TRANSFORMS = {
    width: TRANSFORMS.int,
    height: TRANSFORMS.int,
    filter: TRANSFORMS.enu(['sepia', 'grayscale', 'sharpen', 'blur', 'negative', 'edge', 'gauss']),
    gravity: TRANSFORMS.enu([
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
    crop: TRANSFORMS.enu(['fill', 'fit', 'pad', 'scale', 'cut', 'face']),
    left: TRANSFORMS.int,
    top: TRANSFORMS.int,
    rotate: TRANSFORMS.enu([90, 180, 270, 360]),
    border: TRANSFORMS.intArray,
    quality: TRANSFORMS.int,
    upscale: TRANSFORMS.int,
};

const OPTIONS = {
    width: 'w',
    height: 'h',
    filter: 'f',
    size: 's', // TODO - i think this should also have int transform
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

const normalizeOptionValue = (value, option) => {
    // TODO - this is nonsense - it breaks enu or int transform validation
    if (_.isString(value)) {
        return value;
    }
    return (OPTION_TRANSFORMS[option] || TRANSFORMS.string)(value);
};

export const serializeOptions = options => {
    if (!options) {
        return '';
    }
    if (_.isEmpty(options)) {
        return '';
    }

    const opts = [];
    _.map(options, (value, option) => {
        if (OPTIONS[option]) {
            const normalized = normalizeOptionValue(value, option);
            if (normalized) {
                opts.push(`${OPTIONS[option]}_${normalized}`);
            }
        }
    });
    return opts.join('-');
};

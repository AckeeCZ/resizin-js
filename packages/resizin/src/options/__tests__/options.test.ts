import { serializeOptions } from '../options';

describe('Options serialization', () => {
    it('should return empty string if options not supplied', () => {
        expect(serializeOptions()).toEqual('');
    });

    it('should return empty string if options are empty', () => {
        expect(serializeOptions({})).toEqual('');
    });

    it('should omit unknown option', () => {
        expect(serializeOptions({ unknown: '35' })).toEqual('');
        expect(serializeOptions({ widthh: '40' })).toEqual('');
    });

    describe('option value normalization', () => {
        it('should transform integer value of width to string', () => {
            expect(serializeOptions({ width: 30 })).toContain('w_30');
        });

        it('should omit width parameter if value is not valid integer', () => {
            expect(serializeOptions({ width: NaN })).toEqual('');
            expect(serializeOptions({ width: Infinity })).toEqual('');
            expect(serializeOptions({ width: 'a4b' })).toEqual('');
        });

        it('should transform integer value of height to string', () => {
            expect(serializeOptions({ height: 60 })).toEqual('h_60');
        });

        it('should omit height parameter if value is not valid integer', () => {
            expect(serializeOptions({ height: NaN })).toEqual('');
            expect(serializeOptions({ height: Infinity })).toEqual('');
            expect(serializeOptions({ height: 'c90d' })).toEqual('');
        });

        it('should transform integer value of square to string', () => {
            expect(serializeOptions({ square: 40 })).toEqual('s_40');
        });

        it('should omit square parameter if value is not valid integer', () => {
            expect(serializeOptions({ height: NaN })).toEqual('');
            expect(serializeOptions({ height: Infinity })).toEqual('');
            expect(serializeOptions({ height: 'a4d' })).toEqual('');
        });

        it('should use filter value if it is one of allowed', () => {
            expect(serializeOptions({ filter: 'sepia' })).toEqual('f_sepia');
            expect(serializeOptions({ filter: 'greyscale' })).toEqual('f_greyscale');
            expect(serializeOptions({ filter: 'sharpen' })).toEqual('f_sharpen');
            expect(serializeOptions({ filter: 'blur' })).toEqual('f_blur');
            expect(serializeOptions({ filter: 'negative' })).toEqual('f_negative');
            expect(serializeOptions({ filter: 'edge' })).toEqual('f_edge');
            expect(serializeOptions({ filter: 'gauss' })).toEqual('f_gauss');
        });

        it('should omit filter value if it is not one of allowed', () => {
            expect(serializeOptions({ filter: 'sepiaa' })).toEqual('');
            expect(serializeOptions({ filter: 'my-filter' })).toEqual('');
            expect(serializeOptions({ filter: 15 })).toEqual('');
        });

        it('should use gravity value if it is one of allowed', () => {
            expect(serializeOptions({ gravity: 'north' })).toEqual('g_north');
            expect(serializeOptions({ gravity: 'south' })).toEqual('g_south');
            expect(serializeOptions({ gravity: 'east' })).toEqual('g_east');
            expect(serializeOptions({ gravity: 'center' })).toEqual('g_center');
            expect(serializeOptions({ gravity: 'west' })).toEqual('g_west');
            expect(serializeOptions({ gravity: 'northeast' })).toEqual('g_northeast');
            expect(serializeOptions({ gravity: 'southeast' })).toEqual('g_southeast');
            expect(serializeOptions({ gravity: 'southwest' })).toEqual('g_southwest');
            expect(serializeOptions({ gravity: 'face' })).toEqual('g_face');
        });

        it('should omit gravity value if it is not one of allowed', () => {
            expect(serializeOptions({ gravity: 'westerous' })).toEqual('');
            expect(serializeOptions({ gravity: 'my-gravity' })).toEqual('');
            expect(serializeOptions({ gravity: 56 })).toEqual('');
        });

        it('should use crop value if it is one of allowed', () => {
            expect(serializeOptions({ crop: 'fill' })).toEqual('c_fill');
            expect(serializeOptions({ crop: 'fit' })).toEqual('c_fit');
            expect(serializeOptions({ crop: 'pad' })).toEqual('c_pad');
            expect(serializeOptions({ crop: 'scale' })).toEqual('c_scale');
            expect(serializeOptions({ crop: 'cut' })).toEqual('c_cut');
            expect(serializeOptions({ crop: 'face' })).toEqual('c_face');
        });

        it('should omit crop value if it is not one of allowed', () => {
            expect(serializeOptions({ crop: 'fitttt' })).toEqual('');
            expect(serializeOptions({ crop: 'my-crop' })).toEqual('');
            expect(serializeOptions({ crop: 56 })).toEqual('');
        });

        it('should transform integer value of left to string', () => {
            expect(serializeOptions({ left: 60 })).toEqual('x_60');
        });

        it('should omit left parameter if value is not valid integer', () => {
            expect(serializeOptions({ left: NaN })).toEqual('');
            expect(serializeOptions({ left: Infinity })).toEqual('');
            expect(serializeOptions({ left: 'e14f' })).toEqual('');
        });

        it('should transform integer value of top to string', () => {
            expect(serializeOptions({ top: 60 })).toEqual('y_60');
        });

        it('should omit top parameter if value is not valid integer', () => {
            expect(serializeOptions({ top: NaN })).toEqual('');
            expect(serializeOptions({ top: Infinity })).toEqual('');
            expect(serializeOptions({ top: 'g60h' })).toEqual('');
            expect(serializeOptions({ rotate: 360 })).toEqual('');
        });

        it('should use rotate value if it is one of allowed', () => {
            expect(serializeOptions({ rotate: 90 })).toEqual('r_90');
            expect(serializeOptions({ rotate: 180 })).toEqual('r_180');
            expect(serializeOptions({ rotate: 270 })).toEqual('r_270');
        });

        it('should omit rotate value if it is allowed number but as a string', () => {
            expect(serializeOptions({ rotate: '90' })).toEqual('');
        });

        it('should omit rotate value if it is not one of allowed', () => {
            expect(serializeOptions({ rotate: 56 })).toEqual('');
            expect(serializeOptions({ rotate: '56' })).toEqual('');
            expect(serializeOptions({ rotate: 'invalid-rotation' })).toEqual('');
        });

        it('should transform single value of border to array', () => {
            expect(serializeOptions({ border: 75 })).toEqual('b_75');
        });

        it('should transform array value of border to underscore separated string', () => {
            expect(serializeOptions({ border: [2, 3, 4] })).toEqual('b_2_3_4');
            expect(serializeOptions({ border: ['5', '6', 4] })).toEqual('b_5_6_4');
        });

        it('should omit border parameter if values are not valid numbers', () => {
            expect(serializeOptions({ border: Infinity })).toEqual('');
            expect(serializeOptions({ border: 'i75' })).toEqual('');
            expect(serializeOptions({ border: ['a'] })).toEqual('');
            expect(serializeOptions({ border: [32, 'a', 56] })).toEqual('');
        });

        it('should use default string transform for backgroundColor', () => {
            expect(serializeOptions({ backgroundColor: '333333100' })).toEqual('bg_333333100');
        });

        it('should transform integer value of quality to string', () => {
            expect(serializeOptions({ quality: 75 })).toEqual('q_75');
        });

        it('should omit quality parameter if value is not valid integer', () => {
            expect(serializeOptions({ quality: NaN })).toEqual('');
            expect(serializeOptions({ quality: Infinity })).toEqual('');
            expect(serializeOptions({ quality: 'i75' })).toEqual('');
        });

        it('should use upscale if it is truthy', () => {
            expect(serializeOptions({ upscale: true })).toEqual('u_1');
        });

        it('should omit upscale if it is falsy', () => {
            expect(serializeOptions({ upscale: false })).toEqual('');
        });

        it('should use format value if it is one of allowed', () => {
            expect(serializeOptions({ format: 'jpg' })).toEqual('o_jpg');
            expect(serializeOptions({ format: 'jpeg' })).toEqual('o_jpeg');
            expect(serializeOptions({ format: 'png' })).toEqual('o_png');
            expect(serializeOptions({ format: 'webp' })).toEqual('o_webp');
            expect(serializeOptions({ format: 'tiff' })).toEqual('o_tiff');
        });

        it('should omit format value if it is not one of allowed', () => {
            expect(serializeOptions({ format: 'pneg' })).toEqual('');
            expect(serializeOptions({ format: 'tiggg' })).toEqual('');
            expect(serializeOptions({ format: 56 })).toEqual('');
        });
    });

    it('should return list of serialized options delimited by dash', () => {
        expect(serializeOptions({ width: 15, height: 20, crop: 'fill' })).toBe('w_15-h_20-c_fill');
    });

    it('should return list of serialized options with ommited unknown or invalid options', () => {
        expect(serializeOptions({ width: 45, heit: 50, crop: 45, gravity: 'west' })).toBe('w_45-g_west');
    });
});

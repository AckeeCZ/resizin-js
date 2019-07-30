import { buildSource } from '../source';
import { serializeOptions } from '../options';

jest.mock('../options');

describe('Build source url', () => {
    it('use append slash to serialized options and make the url', () => {
        (serializeOptions as jest.Mock).mockReturnValue('serialized-options-mock');
        expect(buildSource('base', 'test-bucket', 'image1', { width: 14, crop: 'fill' })).toEqual(
            'base/test-bucket/image/serialized-options-mock/image1',
        );
    });

    it('should omit serialized options if they are empty', () => {
        (serializeOptions as jest.Mock).mockReturnValue('');

        expect(buildSource('base', 'test-bucket', 'image2', {})).toEqual('base/test-bucket/image/image2');
    });
});

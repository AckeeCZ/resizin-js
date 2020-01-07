import buildUrl from '../buildUrl';
import { serializeOptions } from '../../options';

jest.mock('../../options');

describe('Build source url', () => {
    it('append slash to serialized options and make the url', () => {
        (serializeOptions as jest.Mock).mockReturnValue('serialized-options-mock');
        expect(buildUrl('base', 'test-bucket', 'image1', { width: 14, crop: 'fill' })).toEqual(
            'base/test-bucket/image/serialized-options-mock/image1',
        );
    });

    it('should omit serialized options if they are empty', () => {
        (serializeOptions as jest.Mock).mockReturnValue('');

        expect(buildUrl('base', 'test-bucket', 'image2', {})).toEqual('base/test-bucket/image/image2');
    });

    it('should prevent doubled slashes when image id starts with slash and there are options', () => {
        (serializeOptions as jest.Mock).mockReturnValue('serialized-options-mock');
        expect(buildUrl('base', 'test-bucket', '/image3', { width: 14, crop: 'fill' })).toEqual(
            'base/test-bucket/image/serialized-options-mock/image3',
        );
    });

    it('should prevent doubled slashes when image id starts with slash and there are no options', () => {
        (serializeOptions as jest.Mock).mockReturnValue('');
        expect(buildUrl('base', 'test-bucket', '/image4' )).toEqual(
            'base/test-bucket/image/image4',
        );
    });

});

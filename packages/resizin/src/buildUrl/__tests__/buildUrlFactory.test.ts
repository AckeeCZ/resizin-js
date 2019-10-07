import buildUrl from '../buildUrl';
import buildUrlFactory from '../buildUrlFactory';
import { DEFAULT_SERVER_URL } from '../../constants';

jest.mock('../buildUrl');

describe('BuildUrl factory', () => {
    beforeEach(() => {
        buildUrl.mockReset();
    });

    it('should use default server url for building image url when no provided', () => {
        const build = buildUrlFactory({ bucket: 'bucket' });

        build('imageId');

        expect(buildUrl).toHaveBeenCalledTimes(1);
        expect(buildUrl.mock.calls[0][0]).toEqual(DEFAULT_SERVER_URL);
    });

    it('should use provided server url for building image url when provided', () => {
        const build = buildUrlFactory({ serverUrl: 'my-resizin.com', bucket: 'bucket' });

        build('imageId');

        expect(buildUrl).toHaveBeenCalledTimes(1);
        expect(buildUrl.mock.calls[0][0]).toEqual('my-resizin.com');
    });
});

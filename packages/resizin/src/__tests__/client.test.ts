import buildUrl from '../buildUrl';
import upload from '../upload';
import clientFactory from '../client';
import { DEFAULT_SERVER_URL } from '../constants';

jest.mock('../upload');
jest.mock('../buildUrl');

describe('Resizin client', () => {
    beforeEach(() => {
        buildUrl.mockReset();
        upload.mockReset();
    });

    it('should use default server url for building image url when no provided', () => {
        const client = clientFactory({ bucket: 'bucket' });

        client.buildUrl('imageId');

        expect(buildUrl).toHaveBeenCalledTimes(1);
        expect(buildUrl.mock.calls[0][0]).toEqual(DEFAULT_SERVER_URL);
    });

    it('should use provided server url for building image url when provided', () => {
        const client = clientFactory({ serverUrl: 'my-resizin.com', bucket: 'bucket' });

        client.buildUrl('imageId');

        expect(buildUrl).toHaveBeenCalledTimes(1);
        expect(buildUrl.mock.calls[0][0]).toEqual('my-resizin.com');
    });

    it('should use provided server url for upload when provided', () => {
        const client = clientFactory({ serverUrl: 'my-resizin.com', apiKey: 'key' });

        client.upload('imageId', 'file');

        expect(upload).toHaveBeenCalledTimes(1);
        expect(upload.mock.calls[0][0]).toEqual('my-resizin.com');
    });

    it('should use default server url for building image url when no provided', () => {
        const client = clientFactory({ apiKey: 'key' });

        client.upload('imageId', 'file');

        expect(upload).toHaveBeenCalledTimes(1);
        expect(upload.mock.calls[0][0]).toEqual(DEFAULT_SERVER_URL);
    });
});

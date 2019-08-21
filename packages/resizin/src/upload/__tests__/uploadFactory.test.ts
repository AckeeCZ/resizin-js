import upload from '../upload';
import uploadFactory from '../uploadFactory';
import { DEFAULT_API_URL } from '../../constants';

jest.mock('../upload');

describe('BuildUpload factory', () => {
    beforeEach(() => {
        upload.mockReset();
    });

    it('should use provided server url for upload when provided', () => {
        const clientUpload = uploadFactory({ serverUrl: 'my-resizin.com', apiKey: 'key' });

        clientUpload('imageId', 'file');

        expect(upload).toHaveBeenCalledTimes(1);
        expect(upload.mock.calls[0][0]).toEqual('my-resizin.com');
    });

    it('should use default api url for upload when none provided', () => {
        const clientUpload = uploadFactory({ apiKey: 'key' });

        clientUpload('imageId', 'file');

        expect(upload).toHaveBeenCalledTimes(1);
        expect(upload.mock.calls[0][0]).toEqual(DEFAULT_API_URL);
    });

    it('should supply file type to upload function', () => {
        const clientUpload = uploadFactory({ apiKey: 'key', fileType: 'file' });

        clientUpload('imageId', 'file');

        expect(upload).toHaveBeenCalledTimes(1);
        expect(upload.mock.calls[0][4]).toEqual({ fileType: 'file' });
    });

    it('should supply none file type to upload function when none received', () => {
        const clientUpload = uploadFactory({ apiKey: 'key' });

        clientUpload('imageId', 'file');

        expect(upload).toHaveBeenCalledTimes(1);
        expect(upload.mock.calls[0][4]).toEqual({ fileType: undefined });
    });
});

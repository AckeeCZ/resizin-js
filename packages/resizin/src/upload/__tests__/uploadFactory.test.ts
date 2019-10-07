import upload from '../upload';
import uploadFactory from '../uploadFactory';
import { DEFAULT_API_URL } from '../../constants';

jest.mock('../upload');

const uploadMock = upload as jest.Mock<upload>;

describe('BuildUpload factory', () => {
    beforeEach(() => {
        uploadMock.mockReset();
    });

    it('should use provided server url for upload when provided', () => {
        const clientUpload = uploadFactory({ serverUrl: 'my-resizin.com', apiKey: 'key' });

        clientUpload('file', 'imageId');

        expect(uploadMock.mock.calls[0][0]).toEqual('my-resizin.com');
    });

    it('should use default api url for upload when none provided', () => {
        const clientUpload = uploadFactory({ apiKey: 'key' });

        clientUpload('file', 'imageId');

        expect(uploadMock.mock.calls[0][0]).toEqual(DEFAULT_API_URL);
    });

    it('should supply file type to upload function', () => {
        const clientUpload = uploadFactory({ apiKey: 'key', fileType: 'file' });

        clientUpload('file', 'imageId');

        expect(uploadMock.mock.calls[0][4]).toHaveProperty('fileType', 'file');
    });

    it('should supply provided imageId to the underlying upload function', () => {
        const clientUpload = uploadFactory({ apiKey: 'key', fileType: 'file' });

        clientUpload('file', 'image_id_1');

        expect(uploadMock.mock.calls[0][2]).toEqual('image_id_1');
    });

    it('should supply null to the underlying upload function if imageId not provided', () => {
        const clientUpload = uploadFactory({ apiKey: 'key', fileType: 'file' });

        clientUpload('file');

        expect(uploadMock.mock.calls[0][2]).toEqual(null);
    });

    it('should supply none file type to upload function when none received', () => {
        const clientUpload = uploadFactory({ apiKey: 'key' });

        clientUpload('file', 'imageId');

        expect(uploadMock.mock.calls[0][4]).toHaveProperty('fileType', undefined);
    });

    it('should supply autoId option to the underlying upload function', () => {
        const clientUpload = uploadFactory({ apiKey: 'key', autoId: true });
        const clientUpload2 = uploadFactory({ apiKey: 'key' });

        clientUpload('file', 'imageId');
        clientUpload2('file', 'imageId');

        expect(uploadMock).toHaveBeenCalledTimes(2);
        expect(uploadMock.mock.calls[0][4]).toHaveProperty('autoId', true);
        expect(uploadMock.mock.calls[1][4]).toHaveProperty('autoId', undefined);
    });
});

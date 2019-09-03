import uploadImage from '../upload';
import fetch from 'isomorphic-fetch';

jest.mock('isomorphic-fetch');
jest.mock('form-data');

const fetchMock = fetch as jest.Mock<fetch>;

describe('Upload image', () => {
    class FormDataMock {
        append = jest.fn();
    }

    let responseObj;

    beforeEach(() => {
        (global as any).FormData = FormDataMock;
        responseObj = {
            json: jest.fn(),
            status: null,
        };
        fetchMock.mockReset();
    });

    it('should reject if url is not provided', () => {
        return expect(uploadImage()).rejects.toThrow('Url is missing');
    });

    it('should reject if api key is not provided', () => {
        return expect(uploadImage('img.resizin.com')).rejects.toThrow('API KEY is missing');
    });

    it('should reject if image id is not provided', () => {
        return expect(uploadImage('img.resizin.com', 'asdf12ja55ls5djfl')).rejects.toThrow('Image id is missing');
    });

    it('should reject if file is not provided', () => {
        return expect(uploadImage('img.resizin.com', 'asdf12ja55ls5djfl', '14')).rejects.toThrow('File is missing');
    });

    it('use different url for custom file type', () => {
        const opts = {
            fileType: 'my-type',
        };
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage('resizin-url.com', 'asdf12ja55ls5djfl', '14', 'adsfjlsadjf', opts).then(() => {
            expect(fetchMock.mock.calls[0][0]).toEqual('resizin-url.com/api/v1/file/upload');
        });
    });

    it('use image type when opts does not contain file type', () => {
        const opts = {};
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage('resizin-url.com', 'asdf12ja55ls5djfl', '14', 'adsfjlsadjf', opts).then(() => {
            expect(fetchMock.mock.calls[0][0]).toEqual('resizin-url.com/api/v1/image/upload');
        });
    });

    it('pass url and options to fetch', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage('resizin-url.com', 'asdf12ja55ls5djfl', '15', '465aas4ad').then(() => {
            expect(fetchMock.mock.calls[0][0]).toEqual('resizin-url.com/api/v1/image/upload');
            expect(fetchMock.mock.calls[0][1]).toHaveProperty('headers.Authorization', 'Key asdf12ja55ls5djfl');

            const formData = fetchMock.mock.calls[0][1].body;
            expect(formData).toBeInstanceOf(FormDataMock);
            expect(formData.append).toHaveBeenCalledTimes(2);
            expect(formData.append.mock.calls[0]).toEqual(['id', '15']);
            expect(formData.append.mock.calls[1][0]).toEqual('file');
            expect(formData.append.mock.calls[1][1]).toEqual('465aas4ad');
        });
    });

    it('use default mime type for image file type', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage('asdf12ja55ls5djfl', 'resizin-url.com', '16', 'puopuihoh').then(() => {
            const formData = fetchMock.mock.calls[0][1].body;
            expect(formData.append.mock.calls[1][1]).toEqual('puopuihoh');
            expect(formData.append.mock.calls[1][2]).toHaveProperty('contentType', 'image/png');
        });
    });

    it('use default mime type for custom file type', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage('asdf12ja55ls5djfl', 'resizin-url.com', '15', 'bncvbcvb', { fileType: 'my-type' }).then(
            () => {
                const formData = fetchMock.mock.calls[0][1].body;
                expect(formData.append.mock.calls[1][1]).toEqual('bncvbcvb');
                expect(formData.append.mock.calls[1][2]).toHaveProperty('contentType', 'application/octet-stream');
            },
        );
    });

    it('use custom mime type', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage('asdf12ja55ls5djfl', 'resizin-url.com', '15', 'asdasf89', { mime: 'image/jpeg' }).then(
            () => {
                const formData = fetchMock.mock.calls[0][1].body;
                expect(formData.append.mock.calls[1][1]).toEqual('asdasf89');
                expect(formData.append.mock.calls[1][2]).toHaveProperty('contentType', 'image/jpeg');
            },
        );
    });

    it('should reject if request for upload fail with status code higher than 400', () => {
        responseObj.status = 500;
        responseObj.json.mockResolvedValue({ message: 'Image server is currently unavailable' });
        fetchMock.mockResolvedValue(responseObj);

        return expect(uploadImage('img.resizin.com', 'asdf12ja55ls5djfl', '14', 'adsfjlsadjf')).rejects.toThrow(
            'Image server is currently unavailable',
        );
    });

    it('should reject if request for upload fail with status code higher than 400', () => {
        responseObj.status = 403;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return expect(uploadImage('img.resizin.com', 'asdf12ja55ls5djfl', '14', 'adsfjlsadjf')).rejects.toThrow(
            'Bad response from server!',
        );
    });

    it('should resolve with returned json if uplaod was successful', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({ uploaded: true });
        fetchMock.mockResolvedValue(responseObj);

        return expect(uploadImage('img.resizin.com', 'asf4a6d', '16', 'ads4f6f46as')).resolves.toEqual({
            uploaded: true,
        });
    });
});

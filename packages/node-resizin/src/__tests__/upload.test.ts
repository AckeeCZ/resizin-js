import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import uploadImage from '../';

jest.mock('isomorphic-fetch');
jest.mock('form-data');

const FormDataMock = (FormData as unknown) as jest.Mock<FormData>;
const fetchMock = fetch as jest.Mock<fetch>;

describe('Upload image', () => {
    let responseObj;

    beforeEach(() => {
        responseObj = {
            json: jest.fn(),
            status: null,
        };
        FormDataMock.mockReset();
        fetchMock.mockReset();
    });

    it('should reject if api key is not provided', () => {
        return expect(uploadImage()('13')).rejects.toThrow('API KEY is missing');
    });

    it('should reject if image id is not provided', () => {
        return expect(uploadImage({ apiKey: 'asdf12ja55ls5djfl' })()).rejects.toThrow('Name is missing');
    });

    it('should reject if file is not provided', () => {
        return expect(uploadImage({ apiKey: 'asdf12ja55ls5djfl' })('14')).rejects.toThrow('Body is missing');
    });

    it('pass url and options to fetch', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage({ apiKey: 'asdf12ja55ls5djfl', serverUrl: 'resizin-url.com' })('14', 'adsfjlsadjf').then(
            () => {
                expect(fetchMock.mock.calls[0][0]).toEqual('resizin-url.com/api/v1/image/upload');
                expect(fetchMock.mock.calls[0][1]).toHaveProperty('headers.Authorization', 'Key asdf12ja55ls5djfl');
                const formData = fetchMock.mock.calls[0][1].body;
                expect(formData).toBeInstanceOf(FormDataMock);
                expect(formData.append).toHaveBeenCalledTimes(2);
                expect(formData.append.mock.calls[0]).toEqual(['id', '14']);
                expect(formData.append.mock.calls[1][0]).toEqual('file');
                expect(formData.append.mock.calls[1][1]).toEqual('adsfjlsadjf');
            },
        );
    });

    it('use different url for custom file type', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage({ apiKey: 'asdf12ja55ls5djfl', serverUrl: 'resizin-url.com', fileType: 'my-type' })(
            '14',
            'adsfjlsadjf',
        ).then(() => {
            expect(fetchMock.mock.calls[0][0]).toEqual('resizin-url.com/api/v1/file/upload');
        });
    });

    it('use default mime type for image file type', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage({ apiKey: 'asdf12ja55ls5djfl', serverUrl: 'resizin-url.com' })('16', 'puopuihoh').then(
            () => {
                const formData = fetchMock.mock.calls[0][1].body;
                expect(formData.append.mock.calls[1][1]).toEqual('puopuihoh');
                expect(formData.append.mock.calls[1][2]).toHaveProperty('contentType', 'image/png');
            },
        );
    });

    it('use default mime type for custom file type', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage({ apiKey: 'asdf12ja55ls5djfl', serverUrl: 'resizin-url.com', fileType: 'my-type' })(
            '15',
            'bncvbcvb',
        ).then(() => {
            const formData = fetchMock.mock.calls[0][1].body;
            expect(formData.append.mock.calls[1][1]).toEqual('bncvbcvb');
            expect(formData.append.mock.calls[1][2]).toHaveProperty('contentType', 'application/octet-stream');
        });
    });

    it('use custom mime type', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return uploadImage({ apiKey: 'asdf12ja55ls5djfl', serverUrl: 'resizin-url.com' })(
            '15',
            'asdasf89',
            'image/jpeg',
        ).then(() => {
            const formData = fetchMock.mock.calls[0][1].body;
            expect(formData.append.mock.calls[1][1]).toEqual('asdasf89');
            expect(formData.append.mock.calls[1][2]).toHaveProperty('contentType', 'image/jpeg');
        });
    });

    it('should reject if request for upload fail with status code higher than 400', () => {
        responseObj.status = 500;
        responseObj.json.mockResolvedValue({ message: 'Image server is currently unavailable' });
        fetchMock.mockResolvedValue(responseObj);

        return expect(
            uploadImage({ apiKey: 'asdf12ja55ls5djfl', serverUrl: 'resizin-url.com' })('14', 'adsfjlsadjf'),
        ).rejects.toThrow('Image server is currently unavailable');
    });

    it('should reject if request for upload fail with status code higher than 400', () => {
        responseObj.status = 403;
        responseObj.json.mockResolvedValue({});
        fetchMock.mockResolvedValue(responseObj);

        return expect(
            uploadImage({ apiKey: 'asdf12ja55ls5djfl', serverUrl: 'resizin-url.com' })('14', 'adsfjlsadjf'),
        ).rejects.toThrow('Bad response from server!');
    });

    it('should resolve with returned json if uplaod was successful', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({ uploaded: true });
        fetchMock.mockResolvedValue(responseObj);

        return expect(
            uploadImage({ apiKey: 'asf4a6d', serverUrl: 'resizin-url.com' })('16', 'ads4f6f46as'),
        ).resolves.toEqual({
            uploaded: true,
        });
    });
});

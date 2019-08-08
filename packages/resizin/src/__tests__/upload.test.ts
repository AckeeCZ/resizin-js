import uploadImage from '../upload';
import fetch from 'isomorphic-fetch';

jest.mock('isomorphic-fetch');
jest.mock('form-data');

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
    });

    it('should reject if url is not provided', () => {
        return expect(uploadImage()).rejects.toThrow('Url is missing');
    });

    it('should reject if api key is not provided', () => {
        return expect(uploadImage('img.resizin.com')).rejects.toThrow('API KEY is missing');
    });

    it('should reject if image id is not provided', () => {
        return expect(uploadImage('img.resizin.com', 'asdf12ja55ls5djfl')).rejects.toThrow('Name is missing');
    });

    it('should reject if file is not provided', () => {
        return expect(uploadImage('img.resizin.com', 'asdf12ja55ls5djfl', '14')).rejects.toThrow('Body is missing');
    });

    it('pass url and options to fetch', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({});
        fetch.mockResolvedValue(responseObj);

        return uploadImage('resizin-url.com', 'asdf12ja55ls5djfl', '14', 'adsfjlsadjf').then(() => {
            expect(fetch.mock.calls[0][0]).toEqual('resizin-url.com');
            expect(fetch.mock.calls[0][1]).toHaveProperty('headers.Authorization', 'Key asdf12ja55ls5djfl');
            expect(fetch.mock.calls[0][1].body).toBeInstanceOf(FormDataMock);
            expect(fetch.mock.calls[0][1].body.append).toHaveBeenCalledTimes(2);
            expect(fetch.mock.calls[0][1].body.append).toHaveBeenNthCalledWith(1, 'id', '14');
            expect(fetch.mock.calls[0][1].body.append).toHaveBeenNthCalledWith(2, 'file', 'adsfjlsadjf');
        });
    });

    it('should reject if request for upload fail with status code higher than 400', () => {
        responseObj.status = 500;
        responseObj.json.mockResolvedValue({ message: 'Image server is currently unavailable' });
        fetch.mockResolvedValue(responseObj);

        return expect(uploadImage('img.resizin.com', 'asdf12ja55ls5djfl', '14', 'adsfjlsadjf')).rejects.toThrow(
            'Image server is currently unavailable',
        );
    });

    it('should reject if request for upload fail with status code higher than 400', () => {
        responseObj.status = 403;
        responseObj.json.mockResolvedValue({});
        fetch.mockResolvedValue(responseObj);

        return expect(uploadImage('img.resizin.com', 'asdf12ja55ls5djfl', '14', 'adsfjlsadjf')).rejects.toThrow(
            'Bad response from server!',
        );
    });

    it('should resolve with returned json if uplaod was successful', () => {
        responseObj.status = 200;
        responseObj.json.mockResolvedValue({ uploaded: true });
        fetch.mockResolvedValue(responseObj);

        return expect(uploadImage('img.resizin.com', 'asf4a6d', '16', 'ads4f6f46as')).resolves.toEqual({
            uploaded: true,
        });
    });
});

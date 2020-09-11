import { uploadFactory } from 'resizin';
import FormDataPolyfill from 'form-data';

global.FormData = FormDataPolyfill as any;

module.exports = uploadFactory;

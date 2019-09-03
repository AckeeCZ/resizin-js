import { uploadFactory } from 'resizin';
import FormData from 'form-data';

(global as any).FormData = FormData;

module.exports = uploadFactory;

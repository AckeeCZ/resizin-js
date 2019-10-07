import { uploadFactory } from 'resizin';
import FormData from 'form-data';

declare type ExtendedNodeJSGlobal = NodeJS.Global & { FormData: typeof FormData };

(global as ExtendedNodeJSGlobal).FormData = FormData;

module.exports = uploadFactory;

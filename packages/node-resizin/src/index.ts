/**
 * Created by dominik on 30/05/2017.
 */

const FormData = require('form-data');
const fetch = require('isomorphic-fetch');

module.exports = (apiKey, base = 'https://api.resizin.com', type = 'image') => {
  const subPath = type === 'image' ? type : 'file';
  const defaultMime = type === 'image' ? 'image/png' : 'application/octet-stream';
  const url = `${base}/api/v1/${subPath}/upload`;
  return (id, file, mime = defaultMime) => {
    return Promise.resolve().then(() => {
      if (!url) {
        throw new Error('URL is missing!');
      }
      if (!id) {
        throw new Error('id is missing!');
      }
      if (!apiKey) {
        throw new Error('API KEY is missing!');
      }
      if (!file) {
        throw new Error('File is missing!');
      }

      let options = {
        method: 'POST',
        headers: {
          Authorization: 'Key ' + apiKey,
        },
      };

      let formData = new FormData();
      formData.append('id', id);
      formData.append('file', file, {
        filename: 'file', // FIXME: filename is dummy
        contentType: mime, // FIXME: server validation issue
      });
      options.body = formData;

      return fetch(url, options).then(function(response) {
        return response.json().then(function(res) {
          if (response.status >= 400) {
            throw new Error(res.message || 'Bad response from server!');
          }
          return res;
        });
      });
    });
  };
};

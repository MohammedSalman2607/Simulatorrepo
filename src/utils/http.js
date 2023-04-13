const { omitBy, isNil } = require('lodash');
const requestPromise = require('request-promise');

exports.request = async ({ method, uri, headers = null, form = null, formData = null, body = null, qs = null, json = null }) => {
   try {
      // console.log(method, uri, headers, form, formData, body, qs)
      let options = omitBy({ method, uri, headers, form, formData, body, qs }, isNil);
      options.json = json ? json : true;
      if (!options.method && !options.uri) {
         return new Error('Invalid request Object');
      }
      return requestPromise(options)
   } catch (error) {
      throw error;
   }
}

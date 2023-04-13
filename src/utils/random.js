const digits = '0123456789';
const alphabets = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = alphabets.toUpperCase();
const specialChars = '#!&@';

module.exports = {
   rand(min, max) {
      const random = Math.random();
      return Math.floor(random * (max - min) + min);
   },
   generate(length, options) {
      length = length || 5;
      const generateOptions = options || {};

      generateOptions.digits = generateOptions.hasOwnProperty('digits') ? options.digits : false;
      generateOptions.alphabets = generateOptions.hasOwnProperty('alphabets') ? options.alphabets : true;
      generateOptions.upperCase = generateOptions.hasOwnProperty('upperCase') ? options.upperCase : false;
      generateOptions.specialChars = generateOptions.hasOwnProperty('specialChars') ? options.specialChars : false;

      const allowsChars = ((generateOptions.digits || '') && digits) +
         ((generateOptions.alphabets || '') && alphabets) +
         ((generateOptions.upperCase || '') && upperCase) +
         ((generateOptions.specialChars || '') && specialChars);
      let password = '';
      for (let index = 0; index < length; ++index) {
         const charIndex = module.exports.rand(0, allowsChars.length - 1);
         password += allowsChars[charIndex];
      }
      return password;
   },

};

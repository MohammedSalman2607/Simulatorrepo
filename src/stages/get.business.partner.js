const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')

exports.start = async (handler, data) => {
   // console.log(handler)
   Logger.info('Get businesspartner')
   try {
      Utils.request({ method: Admin_config.get_business_partner.method, uri: Admin_config.get_business_partner.url, headers: { Authorization: `bearer ${handler.accessToken}` } })
         .then((response) => {
            Logger.verbose('Get business partner successfully')
            handler.businessPartner = response
            handler.emit('GET_BUSINESS_PARTNER_SUCCESS', handler, {})
         }).catch((err) => {
            Logger.verbose('businessPartner not exist, creating new')
            handler.emit('CREATE_BUSINESS_PARTNER', handler, {})
         })
   } catch (error) {
      handler.emit('FAILURE', error)
      console.log(error)
   }
}
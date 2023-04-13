const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')

exports.start = async (handler, data) => {
   Logger.info('Create new businesspartner')
   try {
        let body = Admin_config.create_business_partner.body
        Utils.request({ method: Admin_config.create_business_partner.method, uri: Admin_config.create_business_partner.url, body: body, headers: { Authorization: `bearer ${handler.platformToken}` } })
        .then((response) => {
            Logger.verbose('Created business partner successfully')
            handler.businessPartner = response
            handler.emit('GET_BUSINESS_PARTNER_SUCCESS', handler, {})
        }).catch((err) => {
            console.log(err.message)
            handler.emit('FAILURE', err)
        })
   } catch (error) {
        handler.emit('FAILURE', error)
        console.log(error)
   }
}
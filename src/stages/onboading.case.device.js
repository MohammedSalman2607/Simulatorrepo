
const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')

exports.start = async (handler, data) => {
   for (let caseDevice of handler.caseDevices) {
      Logger.info('Onboarding case device')
      let url = Admin_config.onboard_case_device.url
      url = url.replace(":caseDevice", caseDevice.id)
      try {
         await Utils.request({
            method: Admin_config.onboard_case_device.method,
            uri: url, headers: { Authorization: `bearer ${handler.accessToken}` }
         })
            .then((response) => {
               handler.onboarding = response
               Logger.verbose('Onboarding case device successfully')
            }).catch((err) => {
               handler.emit('FAILURE', err)
            })
      } catch (error) {
         handler.emit('FAILURE', error)
         console.log(error)
      }
   }
   handler.emit('ONBOARDING_CASE_DEVICE_SUCCESS', handler, {})
}

const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')

exports.start = async (handler, data) => {
   // console.log(handler)
   Logger.info('Get device')
   try {
      Utils.request({ method: Admin_config.get_device.method, uri: Admin_config.get_device.url, headers: { Authorization: `bearer ${handler.accessToken}` } })
         .then((response) => {
            if (response.count > 0) {
               handler.device = response.devices[0]
               Logger.verbose('Get device successful')
               handler.emit('GET_DEVICE_SUCCESS', handler, {})
            } else {
               Logger.verbose('device does not exist, creating new')
               handler.emit('CREATE_DEVICE', handler, {})
            }
         }).catch((err) => {
            handler.emit('FAILURE', err)
         })
   } catch (error) {
      handler.emit('FAILURE', error)
      console.log(error)
   }
}
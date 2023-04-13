
const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')

exports.start = async (handler, data) => {
   // console.log(handler)
   Logger.info('Get device vendor')
   try {
      Utils.request({ method: Admin_config.get_device_vendor.method, uri: Admin_config.get_device_vendor.url, headers: { Authorization: `bearer ${handler.accessToken}` } })
         .then((response) => {
            if (response.count > 0) {
               handler.deviceVendor = response.deviceVendors[0]
               Logger.verbose('Get device vendor successfully')
               handler.emit('GET_DEVICE_VENDOR_SUCCESS', handler, {})
            } else {
               Logger.verbose('Device vendor not exist,creating new')
               handler.emit('CREATE_DEVICE_VENDOR', handler, {})
            }
         }).catch((err) => {
            handler.emit('FAILURE', err)
         })
   } catch (error) {
      handler.emit('FAILURE', error)
      console.log(error)
   }
}
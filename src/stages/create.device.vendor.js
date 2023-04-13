const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    // console.log(handler)
    Logger.info('Create device vendor channel')
    try {
        let body = Admin_config.create_vendor.body
        Utils.request({ method: Admin_config.create_vendor.method, uri: Admin_config.create_vendor.url, body: body, headers: { Authorization: `bearer ${handler.accessToken}` } })
            .then((response) => {
                Logger.verbose('Created device vendor successfully')
                handler.deviceVendor = response
                handler.emit('GET_DEVICE_VENDOR_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                handler.emit('FAILURE', err)
            })
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE',error)
    }
}
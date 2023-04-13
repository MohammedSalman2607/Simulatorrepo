const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('CREATING Device')
        let body = Admin_config.create_device.body
        body.vendor = handler.deviceVendor._id ? handler.deviceVendor._id :  handler.deviceVendor.id
        body.maximumMonitoringCapability = handler.monitoringPeriod._id ?handler.monitoringPeriod._id :handler.monitoringPeriod.id
        Utils.request({ method: Admin_config.create_device.method, uri: Admin_config.create_device.url, body: body, headers: { Authorization: `bearer ${handler.accessToken}` } })
            .then((response) => {
                Logger.verbose('Created device successfully')
                handler.device = response
                handler.emit('GET_DEVICE', handler, {})
            }).catch((err) => {
                console.log(err.message)
                // handler.emit('FAILURE', {})
            })
    } catch (error) {
        console.log(error)
    }
}
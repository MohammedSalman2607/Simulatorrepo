const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    // console.log(handler)
    Logger.info('Create monitoring period channel')
    try {
        let body = Admin_config.create_monitoringPeriod.body
        Utils.request({ method: Admin_config.create_monitoringPeriod.method, uri: Admin_config.create_monitoringPeriod.url, body: body, headers: { Authorization: `bearer ${handler.accessToken}` } })
            .then((response) => {
                Logger.verbose('Created monitoring period successfully')
                handler.monitoringPeriod = response
                handler.emit('GET_MONITORING_PERIOD_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                // handler.emit('FAILURE', {})
            })
    } catch (error) {
        console.log(error)
    }
}
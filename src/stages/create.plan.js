const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Creating plan')
        let body = Admin_config.create_plan.body
        body.symptomChecker = handler.package.symptomChecker
        // let device = handler.device.id ? handler.device.id : handler.device._id
        // body.devices = [device]
        body.package = handler.package.id
        body.vitals = handler.package.vitals
        body.devices = handler.package.devices.map(device => device.id)
        Utils.request({ method: Admin_config.create_plan.method, uri: Admin_config.create_plan.url, body: body, headers: { Authorization: `bearer ${handler.platformToken}` } })
            .then((response) => {
                Logger.verbose('Creating plan successfully')
                handler.plan = response
                handler.emit('CREATE_PLAN_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                // handler.emit('FAILURE', {})
            })
    } catch (error) {
        console.log(error)
    }
}
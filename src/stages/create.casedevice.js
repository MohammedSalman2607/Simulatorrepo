const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Creating Case Device')
        let url = Patient_config.create_case_device.url
        url = url.replace(":caseId", handler.case.id)
        let devices = handler.condition.devices
        for (let device of devices) {
            let body = Patient_config.create_case_device.body
            body.deviceTypeId = device.id
            await Utils.request({
                method: Patient_config.create_case_device.method,
                uri: url,
                body: body, headers: { Authorization: `bearer ${handler.customerToken}` }
            })
                .then((response) => {
                    Logger.verbose('Created case device successfully')
                }).catch((err) => {
                    console.log(err.message)
                    handler.emit('FAILURE', {})
                })
        }
        handler.emit('CREATE_CASE_DEVICE_SUCCESS', handler, {})
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', {})
    }
}
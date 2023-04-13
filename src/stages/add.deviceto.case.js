
const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')
const { URI } = require('../../config/admin')

exports.start = async (handler, data) => {
    try {
        let body = Patient_config.add_device_to_case.body
        for (let caseDevice of handler.caseDevices) {
            for (let deviceInstance of handler.instances) {
                if (deviceInstance.device.name === caseDevice.name) {
                    body.patchId = deviceInstance.patchId
                }
            }
            body.deviceId = caseDevice.id
            Logger.info(`Add device to case  ${body.patchId} for case ${JSON.stringify(body)}`)
            let url = Patient_config.add_device_to_case.url
            url = url.replace(":caseId", handler.case.id)
            await Utils.request({ method: Patient_config.add_device_to_case.method, uri: url, body: body, headers: { Authorization: `bearer ${handler.customerToken}` } })
                .then((response) => {
                    Logger.verbose(`Add device to case Success`)
                    handler.add_device_to_case = response
                }).catch((err) => {
                    console.log(err.message)
                    handler.emit('FAILURE', err)
                })
        }
        handler.emit('ADD_DEVICE_TO_CASE_SUCCESS', handler, {})
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', error)
    }
}
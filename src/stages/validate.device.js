
const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')
const { URI } = require('../../config/admin')

exports.start = async (handler, data) => {
    try {
        let validatedDevices = []
        for (let caseDevice of handler.caseDevices) {
            let body = Patient_config.validate_device.body
            for (let deviceInstance of handler.instances) {
                if (deviceInstance.device.name === caseDevice.name) {
                    body.patchId = deviceInstance.patchId
                }
            }
            body.deviceId = caseDevice.id
            Logger.info(`Validating Device  ${body.patchId} for case ${JSON.stringify(body)}`)
            let url = Patient_config.validate_device.url
            url = url.replace(":caseId", handler.case.id)
            await Utils.request({ method: Patient_config.validate_device.method, uri: url, body: body, headers: { Authorization: `bearer ${handler.customerToken}` } })
                .then((response) => {
                    Logger.verbose(`Device Validated Success`)
                    validatedDevices.push(response)
                }).catch((err) => {
                    console.log(err.message)
                    handler.emit('FAILURE', err)
                })
        }
        handler.caseDevices = validatedDevices
        handler.emit('VALIDATE_DEVICE_SUCCESS', handler, {})
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', error)
    }
}
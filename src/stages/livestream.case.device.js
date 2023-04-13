
const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')

exports.start = async (handler, data) => {
    try {
        let body = Patient_config.liveStreaming.body
        for (let caseDevice of handler.caseDevices) {
            body.deviceId = caseDevice.id
            Logger.info(`livestream Device  ${body.deviceId} for case ${JSON.stringify(body)}`)
            let url = Patient_config.liveStreaming.url
            url = url.replace(":caseId", handler.case.id)
            await Utils.request({ method: Patient_config.liveStreaming.method, uri: url, body: body, headers: { Authorization: `bearer ${handler.customerToken}` } })
                .then((response) => {
                    Logger.verbose(`Device livestream Success`)
                    handler.liveStreaming = response
                }).catch((err) => {
                    console.log(err.message)
                    handler.emit('FAILURE', err)
                })
        }
        handler.emit('LIVESTREAMING_SUCCESS', handler, {})
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', error)
    }
}
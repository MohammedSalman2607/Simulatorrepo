const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Updating patient case medical details')
        let body = Patient_config.update_medical_details.body
        let url = Patient_config.update_medical_details.url
        url = url.replace(":caseId",handler.case.id)
        Utils.request({ method: Patient_config.update_medical_details.method, uri: url, body: body ,headers: { Authorization: `bearer ${handler.customerToken}`}})
            .then((response) => {
                Logger.verbose('Updating patient case medical details successfully')
                handler.case = response
                handler.emit('UPDATE_MEDICAL_DETAILS_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                handler.emit('FAILURE', err)
            })
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', error)
    }
}
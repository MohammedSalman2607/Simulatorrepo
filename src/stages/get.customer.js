const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Get Customer')
        let body = Patient_config.get_customer_by_mobile.body
        Utils.request({
            method: Patient_config.get_customer_by_mobile.method,
            headers: Patient_config.get_customer_by_mobile.headers,
            uri: Patient_config.get_customer_by_mobile.url
        })
            .then((response) => {
                if (response.length > 0) {
                    Logger.verbose('Get customer successful')
                    handler.patientId = response[0].patientId
                    handler.customer = response[0]
                }
                handler.emit('GET_CUSTOMER_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                // handler.emit('FAILURE', {})
            })
    } catch (error) {
        console.log(error)
    }
}
const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Creating patient')
        let body = Patient_config.create_login_customer.body
        if (body.patientId) {
            body = { patientId: body.patientId }
        }
        else if (handler.patientId && !body.patientId) {
            body.patientId = handler.patientId
        }
        Utils.request({
            method: Patient_config.create_login_customer.method,
            headers: Patient_config.create_login_customer.headers,
            uri: Patient_config.create_login_customer.url, body: body
        })
            .then((response) => {
                Logger.verbose('Create and login customer successfully')
                handler.customerToken = response.accessToken
                handler.emit('CREATE_LOGIN_CUSTOMER_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                // handler.emit('FAILURE', {})
            })
    } catch (error) {
        console.log(error)
    }
}
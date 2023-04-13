const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Getting Condition')
        let body = Admin_config.get_condition.body

        Utils.request({
            method: Admin_config.get_condition.method,
            uri: Admin_config.get_condition.url,
            body: body, headers: { Authorization: `bearer ${handler.platformToken}` }
        })
            .then((response) => {
                Logger.verbose('Getting condition successful')
                response.id = response._id
                handler.condition = response
                handler.emit('GET_CONDITION_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                handler.emit('FAILURE', {})
            })

    } catch (error) {
        console.log(error)
    }
}
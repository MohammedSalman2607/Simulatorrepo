const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Platform partner LOGIN')
        let body = Admin_config.login_platform_user.body
        Utils.request({ method: Admin_config.login_platform_user.method, uri: Admin_config.login_platform_user.url, body: body })
            .then((response) => {
                handler.platformToken = response.accessToken
                Logger.verbose('LOGIN PLATFORM PARTNER SUCCESS')
                handler.emit('LOGIN_PLATFORM_PARTNER_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                handler.emit('CREATE_PLATFORM_PARTNER', handler, {})
            })
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', error)
    }
}
const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('ADMIN LOGIN')
        let body = Admin_config.login_admin.body
        Utils.request({ method: Admin_config.login_admin.method, uri: Admin_config.login_admin.url, body: body })
            .then((response) => {
                if(response){
                    handler.accessToken = response.accessToken
                    Logger.verbose('LOGIN ADMIN SUCCESS')
                    handler.emit('LOGIN_ADMIN_SUCCESS', handler, {})
                }else{
                    handler.emit('REGISTER_ADMIN', handler, {})
                }
            }).catch((err) => {
                console.log(err.message)
                handler.emit('REGISTER_ADMIN', handler, {})
                // handler.emit('FAILURE', {})
            })
    } catch (error) {
        console.log(error)
    }
}
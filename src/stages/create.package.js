const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Creating package')
        let body = Admin_config.create_package.body

        Utils.request({ method: Admin_config.create_package.method, uri: Admin_config.create_package.url, body: body, headers: { Authorization: `bearer ${handler.platformToken}` } })
            .then((response) => {
                Logger.verbose('Creating package successfully')
                handler.package = response
                handler.emit('CREATE_PACKAGE_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                handler.emit('FAILURE', {})
            })

    } catch (error) {
        console.log(error)
    }
}
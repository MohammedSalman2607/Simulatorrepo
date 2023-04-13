const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Getting package')
        let body = Admin_config.get_package.body

        Utils.request({ method: Admin_config.get_package.method, uri: Admin_config.get_package.url, body: body, headers: { Authorization: `bearer ${handler.platformToken}` } })
            .then((response) => {
                Logger.verbose('Getting package successfully')
                if(response.packages.length){
                    handler.package = response.packages[0]
                    handler.emit('GET_PACKAGE_SUCCESS', handler, {})
                }else{
                    handler.emit('CREATE_PACKAGE', handler, {})
                }
            }).catch((err) => {
                console.log(err.message)
                handler.emit('FAILURE', {})
            })

    } catch (error) {
        console.log(error)
    }
}
const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('mapped Device instance')
        // let url = Admin_config.mapped_device_instance.url
        // console.log(handler)
        // url = url.replace(":instanceId",(handler.instance.id ? handler.instance.id : handler.instance._id) )
        // let body = Admin_config.mapped_device_instance.body
        // Utils.request({ method: Admin_config.mapped_device_instance.method, uri: url, body: body, headers: { Authorization: `bearer ${handler.platformToken}` } })
        //     .then((response) => {
                Logger.verbose('Mapped device instance successfully')
                // handler.instance = response
                handler.emit('MAPPED_DEVICE_INSTANCE_SUCCESS', handler, {})
            // }).catch((err) => {
            //     console.log(err.message)
            //     handler.emit('FAILURE', err)
            // })
    } catch (error) {
        console.log(error)
    }
}
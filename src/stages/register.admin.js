const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
   try {
      Logger.info('Starting admin register')
      let body = Admin_config.register_admin.body
      Utils.request({ method: Admin_config.register_admin.method, uri: Admin_config.register_admin.url, body: body })
         .then((response) => {
            Logger.verbose(`Admin Registered Succesfully`)
            handler.admin = response
            handler.emit('REGISTER_ADMIN_SUCCESS', handler, {})
         }).catch((err) => {
            console.log(err.message)
            handler.emit('FAILURE', {})
         })
   } catch (error) {
      console.log(error)
   }
}
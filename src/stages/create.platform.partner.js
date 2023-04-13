const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
   try {
      Logger.info('Starting paltform partner register')
      let body = Admin_config.Create_platform_user.body
      Utils.request({ method: Admin_config.Create_platform_user.method, uri: Admin_config.Create_platform_user.url, body: body,headers: { Authorization: `bearer ${handler.accessToken}`} })
         .then((response) => {
            Logger.verbose(`Paltform partner Registered Succesfully`)
            handler.platformPartner = response
            setTimeout(()=>{
               handler.emit('CREATE_PLATFORM_PARTNER_SUCCESS', handler, {})
            },1000)
         }).catch((err) => {
            console.log(err.message)
            handler.emit('FAILURE', {})
         })
   } catch (error) {
      console.log(error)
   }
}
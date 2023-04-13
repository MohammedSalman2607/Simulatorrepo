const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')

exports.start = async (handler, data) => {
   // console.log(handler)
   Logger.info('Get case devices')
   let url = Patient_config.get_case_device.url
   url = url.replace(":caseId",handler.case.id)
   try {
      Utils.request({ method: Patient_config.get_case_device.method, uri: url, headers: { Authorization: `bearer ${handler.customerToken}` } })
         .then((response) => {
            if(response){
                handler.caseDevices = response
                Logger.verbose('Get case devices successfully')
                handler.emit('GET_CASE_DEVICES_SUCCESS', handler, {})
            }
         }).catch((err) => {
            handler.emit('FAILURE', err)
         })
   } catch (error) {
         console.log(error)
        handler.emit('FAILURE', error)
   }
}
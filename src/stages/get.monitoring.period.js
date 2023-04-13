
const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')

exports.start = async (handler, data) => {
   // console.log(handler)
   Logger.info('Get monitoring period')
   try {
      Utils.request({ method: Admin_config.get_monitoringPeriod.method, uri: Admin_config.get_monitoringPeriod.url, headers: { Authorization: `bearer ${handler.accessToken}` } })
         .then((response) => {
            if (response.count > 0) {
               handler.monitoringPeriod = response.monitoringPeriods[0]
               Logger.verbose('Get Monitoring period successfully')
               handler.emit('GET_MONITORING_PERIOD_SUCCESS', handler, {})
            } else {
               Logger.verbose('Monitoring period not exist,creating new')
               handler.emit('CREATE_MONITORING_PERIOD', handler, {})
            }
         }).catch((err) => {
            handler.emit('FAILURE', err)
         })
   } catch (error) {
      handler.emit('FAILURE', error)
      console.log(error)
   }
}
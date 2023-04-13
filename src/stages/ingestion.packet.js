const Logger = require('../utils/logger')
const _1ax = require('../devices/1ax')
const vv330 = require('../devices/vv330')
const vv200 = require('../devices/vv200')
const spo2 = require('../devices/spo2')
const bp = require('../devices/bp')
const bp2a = require('../devices/bp2a')

exports.start = async (handler, data) => {
    try {
        let caseNumber = handler.case.caseNumber
        for (let caseDevice of handler.caseDevices) {
            if (caseDevice.name == '1AX') {
                Logger.info('Sending packets for ingestion: ' + caseDevice.name)
                _1ax.start(caseNumber, caseDevice.instance.patchId)
                handler.emit('PACKET_INGESTION_SUCCESS', handler, {})
            }
            if (caseDevice.name == 'VV330') {
                Logger.info('Sending packets for ingestion: ' + caseDevice.name)
                vv330.start(caseNumber, caseDevice.instance.patchId, global.vv330File)
            }
            if (caseDevice.name == 'VV200') {
                Logger.info('Sending packets for ingestion: ' + caseDevice.name)
                vv200.start(caseNumber, caseDevice.instance.patchId)
            }
            if (caseDevice.name == 'Pulse Oximeter' || caseDevice.name == 'O2MAX') {
                Logger.info('Sending packets for ingestion: ' + caseDevice.name)
                spo2.start(caseNumber, caseDevice.instance.patchId)
            }
            if (caseDevice.name == 'BP') {
                Logger.info('Sending packets for ingestion: ' + caseDevice.name)
                bp.start(caseNumber, caseDevice.instance.patchId)
            }
            if (caseDevice.name == 'BP2A') {
                Logger.info('Sending packets for ingestion: ' + caseDevice.name)
                bp2a.start(caseNumber, caseDevice.instance.patchId)
            }
        }
    } catch (error) {
        console.log(error)
    }
}
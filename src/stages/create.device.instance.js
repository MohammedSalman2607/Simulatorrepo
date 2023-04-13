const Utils = require("../utils/http")
const Admin_config = require('../../config/admin')
const Logger = require('../utils/logger')
const vv330 = require('../devices/vv330')
const vv200 = require('../devices/vv200')
const spo2 = require('../devices/spo2')
const bp = require('../devices/bp')
const bp2a = require('../devices/bp2a')
const one_a_x = require('../devices/1ax')

exports.start = async (handler, data) => {
    try {
        Logger.info('Creating Device instances')
        let devices = handler.condition.devices
        let instances = []
        for (let device of devices) {
            let body = Admin_config.create_device_instance.body
            body.vendor = handler.deviceVendor._id ? handler.deviceVendor._id : handler.deviceVendor.id
            body.device = device.id
            body.patchId = getPatchId(device.name)
            body.businessPartner = handler.businessPartner ? handler.businessPartner._id : handler.businessPartner.id
            await Utils.request({
                method: Admin_config.create_device_instance.method,
                uri: Admin_config.create_device_instance.url,
                body: body,
                headers: { Authorization: `bearer ${handler.platformToken}` }
            })
                .then((response) => {
                    Logger.verbose('Created device instance successfully')
                    instances.push(response)
                }).catch((err) => {
                    console.log(err.message)
                    handler.emit('FAILURE', {})
                })
        }
        handler.instances = instances
        handler.emit('CREATE_DEVICE_INSTANCE_SUCCESS', handler, {})
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', {})
    }
}

var getPatchId = (deviceName) => {
    if (deviceName === 'VV330') {
        return vv330.getNewPatchId()
    }
    if (deviceName === 'VV200') {
        return vv200.getNewPatchId()
    }
    if (deviceName === 'Pulse Oximeter' || deviceName === 'O2MAX') {
        return spo2.getNewPatchId()
    }
    if (deviceName === 'BP') {
        return bp.getNewPatchId()
    }
    if (deviceName === 'BP2A') {
        return bp2a.getNewPatchId()
    }
    if (deviceName === '1AX') {
        return one_a_x.getNewPatchId()
    }
}
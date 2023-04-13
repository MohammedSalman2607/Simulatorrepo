const Utils = require("../utils/http")
const Patient_config = require('../../config/patient')
const Logger = require('../utils/logger')
exports.start = async (handler, data) => {
    try {
        Logger.info('Creating patient case')
        let body = Patient_config.create_case.body

        let NURSE_ID, DOCTOR_ID;

        switch (global.env) {
            case 'local-dev':
            case 'local-qa':
                NURSE_ID = '5f71da7f969d1f14bdbca83d';
                DOCTOR_ID = '612326b40e3cda002bfd44de';
                break;
            case 'qa':
                NURSE_ID = '61dd247cf98100002caf14d0';
                DOCTOR_ID = '611e23fd693579001f621148';
                break;
            case 'staging':
                NURSE_ID = '6242fac644f787002bea2e7b';
                DOCTOR_ID = '62f66cf6d95acd002b988e69';
                break;
            case 'prod':
                NURSE_ID = '6214d81d04f616002c4853e2';
                DOCTOR_ID = '6214d7fcbe97e9002ba5641f';
                break;
            default:
                NURSE_ID = '5f71da7f969d1f14bdbca83d';
                DOCTOR_ID = '612326b40e3cda002bfd44de';
        }

        body.nurseId = NURSE_ID
        body.platformPartner = handler.businessPartner.platformPartner
        body.condition = handler.condition
        body.business = {
            id: handler.businessPartner._id,
            name: handler.businessPartner.name
        }
        body.doctor = {
            id: DOCTOR_ID,
            firstName: 'Simulator',
            lastName: 'Doctor'
        }
        body.uhid = 'Simulator'
        body.layoutOccupancy = {
            layout: [
                {
                    layoutName: 'FLOOR',
                    layoutValue: '1',
                },
                {
                    layoutName: 'WARD',
                    layoutValue: 'ICU',
                },
                {
                    layoutName: 'DEPARTMENT',
                    layoutValue: 'Cordio',
                },
                {
                    layoutName: 'BEDNO',
                    layoutValue: '1234',
                }
            ]
        }
        if (global.service === 'SH') {
            body.totalDuration = {
                duration: 60,
                durationUnits: 'MINUTES'
            }
        }

        Utils.request({ method: Patient_config.create_case.method, uri: Patient_config.create_case.url, body: body, headers: { Authorization: `bearer ${handler.customerToken}` } })
            .then((response) => {
                Logger.verbose('Create patient case successful: ' + response.caseNumber)
                handler.case = response
                handler.emit('CREATE_CASE_SUCCESS', handler, {})
            }).catch((err) => {
                console.log(err.message)
                handler.emit('FAILURE', err)
            })
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', error)
    }
}
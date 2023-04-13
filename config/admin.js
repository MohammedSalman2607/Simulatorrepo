const random = require('../src/utils/random')

let URL;

switch (global.env) {
    case 'local-dev':
    case 'local-qa':
        URL = 'http://localhost:3200';
        break;
    case 'qa':
        URL = 'https://api.mvm2.qa.vigocare.com';
        break;
    case 'staging':
        URL = 'https://api.mvm2.staging.vigocare.com';
        break;
    case 'prod':
        URL = 'https://api2.mvm.vigocare.com';
        break;
    default:
        URL = 'https://api.mvm2.dev.vigocare.com';
}

const CONDITION_ID = (() => {
    switch (global.env) {
        case 'qa':
            return (global.service === 'SH') ? '6166b6c474eba30020255322' : '611b8ec12e29f40020dac640';
        case 'local-dev':
        case 'local-qa':
            return '6123411f8fb672002b7d1279';
        case 'staging':
            return '611b8ec12e29f40020dac640';
        case 'prod':
            return '6214a0eb5c7dba002b6d7d5b';
        default:
            return '6123411f8fb672002b7d1279';
    }
})();

const BUSINESS_PARTNER_ID = (() => {
    switch (global.env) {
        case 'qa':
            return '61121fdbcc9224002a4d3cbc';
        case 'local-dev':
        case 'local-qa':
            return '612326938fb672002b7d112c';
        case 'staging':
            return '626a7152035ff5002030f6bc';
        case 'prod':
            return '5f0dbd6f43f92120fe61de2b';
        default:
            return '612326938fb672002b7d112c';
    }
})();


console.log('BUSINESS_PARTNER_ID: ', BUSINESS_PARTNER_ID)

module.exports = {
    URI: URL,
    register_admin: {
        url: `${URL}/v1/admin/users`,
        body: {
            "email": "gk.admin@vigocare.com",
            "password": "superplatform",
            "firstName": "Simulator",
            "lastName": "Simulator",
            "role": "SUPERADMIN"
        },
        method: 'post'
    },
    login_admin: {
        url: `${URL}/v1/admin/auth/login`,
        body: {
            "email": "gk.admin@vigocare.com",
            "password": "superplatform"
        },
        method: 'post'
    },
    Create_platform_user: {
        url: `${URL}/v1/admin/platform/partner`,
        body: {
            "name": `${random.generate(7, {})}`,
            "contact": {
                "firstName": "VigoSimulator",
                "lastName": "care",
                "email": `giribabu.k@vigocare.com`,
                "mobile": {
                    "countryCode": "91",
                    "number": `9849808090`
                }
            },
            "website": "www.vigocare.com",
            "billing": "",
            "branding": "",
            "isActive": "true"
        },
        method: 'post'
    },
    login_platform_user: {
        url: `${URL}/v1/admin/auth/partner/login`,
        body: {
            "email": `giribabu.k@vigocare.com`,
            "password": "pass1234"
        },
        method: 'post'
    },
    get_monitoringPeriod: {
        url: `${URL}/v1/admin/devices/period?lable=simulator`,
        method: 'get'
    },
    get_device_vendor: {
        url: `${URL}/v1/admin/business/vendor?name=simulator`,
        method: 'get'
    },
    create_monitoringPeriod: {
        url: `${URL}/v1/admin/devices/period`,
        body: {
            "label": "simulator",
            "value": "5",
            "duration": 5,
            "durationUnits": "MINUTES"
        },
        method: 'post'
    },
    create_vendor: {
        url: `${URL}/v1/admin/business/vendor`,
        body: {
            "name": `simulator`,
            "contact": {
                "firstName": "simulator",
                "lastName": "simulator",
                "email": "simulator@vigocare.com",
                "mobile": {
                    "countryCode": "91",
                    "number": "9999999999"
                }
            },
            "website": "www.simulator.com",
            "isActive": true
        },
        method: 'post'
    },
    get_device: {
        url: `${URL}/v1/admin/devices/device?name=simulator`,
        method: 'get'
    },
    create_device: {
        url: `${URL}/v1/admin/devices/device`,
        body: {
            "name": "simulator",
            "description": "simulator des",
            "images": [{
                "url": "",
                "description": ""
            }],
            "usageType": "SINGLE",
            "maximumMonitoringCapability": "5ed7b614fb91c827c7a252df",
            "parameters": [{
                "name": "simulator",
                "description": "simulator des",
                "signalFrequency": 20,
                "frequencyUnits": "SECONDS",
                "paramType": "DEVICE_HEALTH"
            }],
            "vendor": "5ed7b329463bdf1fb28093a6"
        },
        method: 'post'
    },
    get_package: {
        url: `${URL}/v1/admin/package?name=Platinum`,
        method: 'get'
    },
    create_package: {
        url: `${URL}/v1/admin/package`,
        body: {
            "name": "Platinum",
            "code": "HR",
            "devices": ["5ee0acc2c96e99563cff06ac", "5ee0ac2dc96e99563cff06a9"], //dev
            // "devices": ["5f167c30c9f08543e163f2d4"], //local
            // "devices": ["5f23ddcde54bea1bb9b9e014"], //qa
            "vitals": [{
                "id": "5ee1f2cbb9968f2127c055b0",
                "monitoringFrequency": {
                    "duration": 50,
                    "durationUnits": "SECONDS",
                    "periodicity": 1,
                    "periodicityUnits": "SECONDS"
                },
                "code": "HR",
                "device": {
                    "id": "5f23ddcde54bea1bb9b9e014",
                    "name": "New23"
                },
                "isMonitored": true
            }],
            "customer": {
                "firstName": "Abhimanyu",
                "lastName": "khosla",
                "email": "admin@vigocare.com",
                "mobile": {
                    "countryCode": "91",
                    "number": "9096445336"
                }
            },
            "price": {
                "currency": "ruppe",
                "value": "1000"
            },
            "payment": {
                "mode": "CASH",
                "isPending": false,
                "amount": "1000"
            }
        },
        method: 'post'
    },
    create_plan: {
        url: `${URL}/v1/admin/plan`,
        body: {
            "package": "608274a35d81570022679929",
            "name": "simulator",
            "devices": ["5ee0acc2c96e99563cff06ac", "5ee0ac2dc96e99563cff06a9"], //dev
            // "devices": ["5ed50d4633ec9e23428f1aba"], //local
            // "devices": ["5f23ddcde54bea1bb9b9e014"], //qa
            "vitals": [{
                "id": "5ed50d4633ec9e23428f1aba",
                "monitoringFrequency": {
                    "duration": 50,
                    "durationUnits": "SECONDS",
                    "periodicity": 1,
                    "periodicityUnits": "SECONDS"
                },
                "device": {
                    "id": "5f23ddcde54bea1bb9b9e014",
                    "name": "New23"
                },
                "code": "HR",
                "isMonitored": true
            }, {
                "id": "5ed50d4633ec9e23428f1aba",
                "monitoringFrequency": {
                    "duration": 100,
                    "durationUnits": "SECONDS",
                    "periodicity": 1,
                    "periodicityUnits": "SECONDS"
                },
                "device": {
                    "id": "5f1699a24c410d6ef16c2a3e",
                    "name": "New23"
                },
                "code": "HR",
                "isMonitored": true
            }],
            "customer": {
                "firstName": "Prathmesh",
                "lastName": "Shivani",
                "email": "admin@vigocare.com",
                "mobile": {
                    "countryCode": "91",
                    "number": "9999999999"
                }
            },
            "price": {
                "currency": "ruppe",
                "value": "1000"
            },
            "payment": {
                "mode": "CASH",
                "isPending": false,
                "amount": "1000"
            },
            "doctor": "5f71da7f969d1f14bdbca83d",
            "business": "5ee0b867a0b26b5968e8fc42",
            // "condition": "5eeb04a2cb1d74186a6dd279"//locla
            // "condition": "5f0dbfd943f92120fe61de87"//qa
            "condition": "5eeb04a2cb1d74186a6dd279"//dev
        },
        method: 'post'
    },
    create_device_instance: {
        url: `${URL}/v1/admin/devices/instance`,
        body: {
            "provisioningStatus": "MAPPED",
            "serialNumber": "111111",
            "batchId": "simulator",
            "monitoringPeriod": "5ed62b817ec8a17a1eee245b",
            "device": "5ed9a4cf3213e64b9956b174",
            "businessPartner": "5ed9b4fb3213e64b9956b181",
            "vendor": "5ed7739c6b162b7f4e934f9e",
            "customer": {
                "id": "5ed7ba9bfb91c827c7a25300",
                "name": "asdas ",
                "contact": {
                    "number": "",
                    "country": ""
                }
            }
        },
        method: 'post'
    },
    mapped_device_instance: {
        url: `${URL}/v1/admin/devices/instance/:instanceId`,
        body: {
            "provisioningStatus": "MAPPED"
        },
        method: 'patch'
    },
    create_business_partner: {
        url: `${URL}/v1/admin/business/partner`,
        body: {
            "contact": {
                "mobile": {
                    "countryCode": "+91",
                    "number": "7894989836"
                },
                "firstName": "Simulator",
                "lastName": "Simulator",
                "email": "Simulator@apollo.com"
            },
            "name": "Simulator",
            "website": "www.Simulator.com"
        },
        method: 'post'
    },
    get_business_partner: {
        url: `${URL}/v1/admin/business/partner/${BUSINESS_PARTNER_ID}`,
        method: 'get'
    },
    onboard_case_device: {
        url: `${URL}/v1/admin/caseDevice/:caseDevice/onboard`,
        method: 'get'
    },
    get_condition: {
        url: `${URL}/v1/admin/conditions/condition/${CONDITION_ID}`,
        method: 'get'
    }
}
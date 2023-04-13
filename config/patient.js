const URL =
    (global.env === 'local-dev') ? `http://localhost:3000` :
        (global.env === 'local-qa') ? `http://localhost:3000` :
            (global.env === 'qa') ? `https://patient.mvm2.qa.vigocare.com` :
                (global.env === 'staging') ? `https://patient.mvm2.staging.vigocare.com` :
                    (global.env === 'prod') ? `https://patient2.mvm.vigocare.com`
                        : `https://patient.mvm2.dev.vigocare.com`;

const apikey = { apikey: 'dmlnb2NhcmU6JDJhJDEwJEhpY0JmS1hhckFoZ2pNMGNFRlZoWWU2ZHA4WkRJVFdXTXltaWUwNGQuWlYuRWFQTkRDNFlH' }
let customer_req_body = {
    mobile: {
        number: "9999999998",
        countryCode: "91"
    },
    firstName: 'Simulator',
    lastName: 'Simulator',
    mobileDeviceInfo: { "fcmId": "simulator" }
}

if (global.patientId) {
    customer_req_body.patientId = global.patientId
}

module.exports = {
    get_customer_by_mobile: {
        url: `${URL}/v1/patient/customer/${customer_req_body.mobile.number}?countryCode=${customer_req_body.mobile.countryCode}`,
        headers: apikey,
        method: 'get'
    },
    create_login_customer: {
        url: `${URL}/v1/patient/auth/register`,
        headers: apikey,
        body: customer_req_body,
        method: 'post'
    },
    create_case: {
        url: `${URL}/v1/patient/case/initialize`,
        body: {
            "doctor": "5f71da7f969d1f14bdbca83d",
            "business": "5ee0b867a0b26b5968e8fc42"
        },
        method: 'post'
    },
    get_medical_details: {
        url: `${URL}/v1/patient/case/:caseId/medical`,
        method: 'get'
    },
    update_medical_details: {
        url: `${URL}/v1/patient/case/:caseId/medical`,
        body: {
            "height": {
                "feet": "6",
                "inches": "2"
            },
            "weight": "23",
            "healthRecords": [{
                "text": "is ok",
                "answer": ["yes", "no"]
            }]
        },
        method: 'patch'
    },
    get_case_device: {
        url: `${URL}/v1/patient/case/:caseId/device`,
        method: 'get'
    },
    validate_device: {
        url: `${URL}/v1/patient/case/:caseId/device`,
        body: {
            "deviceId": "5ef1f29b945c3510d4f8d6ec",
            "patchId": "UAQEH"
        },
        method: 'post'
    },
    add_device_to_case: {
        url: `${URL}/v1/patient/case/:caseId/device/pair`,
        body: {
            "deviceId": "5ef1f29b945c3510d4f8d6ec",
            "patchId": "UAQEH"
        },
        method: 'post'
    },
    liveStreaming: {
        url: `${URL}/v1/patient/case/:caseId/device/liveStream`,
        body: {
            "deviceId": "5f0c7fef4d9a2f0dd8343caa",
            "liveStreamingStartTime": new Date().getTime()
        },
        method: 'post'
    },
    create_case_device: {
        url: `${URL}/v1/patient/case/:caseId/createCaseDevice`,
        body: {
        },
        method: 'post'
    }
}
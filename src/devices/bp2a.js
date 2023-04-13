const random = require('../utils/random')
const vivalnkIngestionClient = require("../communication/client/vivalnk-ingestion")
const moment = require('moment')

exports.start = async (caseNumber, patchId) => {
    setInterval(function timer() {
        let sensorData = []
        let timeStamp = moment()
        for (let i = 0; i < 5; i++) {
            let data = {
                diastolicValue: '' + random.rand(50, 110),
                systolicValue: '' + random.rand(110, 150),
                heartRateValue: '' + random.rand(5, 150),
                timeStamp: '' + timeStamp.valueOf()
            }
            sensorData.push(JSON.stringify(data))
        }
        let packet = {
            caseNumber, patchId, deviceName: 'BP2A', data: sensorData
        }
        
        vivalnkIngestionClient.ingestDataPacket(packet)
        console.log("BP: Ingested 5 packets", caseNumber, patchId)
    }, 300000);
}

exports.getNewPatchId = () => {
    return random.generate(10, {}).toUpperCase()
}
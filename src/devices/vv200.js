const random = require('../utils/random')
const vivalnkIngestionClient = require("../communication/client/vivalnk-ingestion")
const moment = require('moment')

exports.start = async (caseNumber, patchId) => {
    setInterval(function timer() {
        let timeStamp = moment()
        let dataArray = []
        let data = {}
        data.cachedData = [{
            displayTemperature: random.rand(32, 44) + '.' + random.rand(0, 9),
            recordedTime: '' + timeStamp.valueOf()
        }]
        timeStamp = timeStamp.add(12, 'seconds')
        data.temperatureData = {
            displayTemperature: random.rand(32, 44) + '.' + random.rand(0, 9),
            recordedTime: '' + timeStamp.valueOf()
        }
        dataArray.push(JSON.stringify(data))
        let packet = {
            caseNumber, patchId, deviceName: 'VV200', data: dataArray
        }
        vivalnkIngestionClient.ingestDataPacket(packet)
        console.log("VV200: Ingested 2 packets", caseNumber, patchId)
    }, 24000);
}

exports.getNewPatchId = () => {
    return 'C0' + random.rand(1, 9) + '.000' + random.rand(10000, 99999)
}
const random = require('../utils/random')
const vivalnkIngestionClient = require("../communication/client/vivalnk-ingestion")
const moment = require('moment')

exports.start = async (caseNumber, patchId) => {
    setInterval(function timer() {
        let sensorData = []
        let timeStamp = moment()
        for (let i = 0; i < 4; i++) {
            timeStamp = timeStamp.add(500, 'milliseconds')
            // let plethData = getTestData()
            let data = {
                pulse: '' + random.rand(50, 150),
                value: '' + random.rand(90, 100),
                timeStamp: '' + timeStamp.valueOf(),
                plethVar1: ['75', '72', '69', '66', '63', '61', '58', '56', '53', '51', '50', '48', '46', '44', '41', '40', '39', '41', '47', '55', '66', '78', '87', '93', '95', '95', '94', '93', '91', '89'],
                plethVar2: ['9', '8', '7', '7', '6', '5', '5', '4', '4', '3', '3', '2', '2', '1', '1', '0', '0', '1', '2', '3', '6', '9', '11', '12', '13', '13', '13', '12', '12', '11']
            }
            sensorData.push(JSON.stringify(data))
        }
        let packet = {
            caseNumber, patchId, deviceName: 'SPO2', data: sensorData
        }
        vivalnkIngestionClient.ingestDataPacket(packet)
        console.log("SPO2: Ingested 4 packets", caseNumber, patchId)
    }, 2000);
}

exports.getNewPatchId = () => {
    return random.generate(10, {}).toUpperCase()
}

// function getTestData() {
//     let var1 = ['22', '20', '19', '17', '16', '14', '14', '14', '20', '30', '45', '60', '72', '79', '83', '84', '83', '82', '81', '80', '78', '76', '73', '69', '66', '64', '63', '63', '63', '64']
//     let var2 = ['64', '63', '62', '61', '59', '58', '57', '55', '53', '51', '50', '48', '45', '43', '42', '40', '39', '39', '38', '37', '35', '33', '34', '38', '46', '55', '66', '77', '85', '91']

//     return {
//         var1: shuffle(var1),
//         var2: shuffle(var2),
//     }
// }

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

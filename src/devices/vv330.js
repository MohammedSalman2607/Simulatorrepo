const fs = require("fs")
const random = require('../utils/random')
const vivalnkIngestionClient = require("../communication/client/vivalnk-ingestion")
const moment = require('moment')

exports.start = async (caseNumber, patchId, vv330File) => {
    let filePath = __dirname + `/../ecgFile/vv330_VC0001VP4896_1000_sec.json`
    if (vv330File) {
        filePath = vv330File
        console.log("VV330: ECG File to replay: ", filePath)
    }
    var fileData = fs.readFileSync(filePath);
    let StringData = fileData.toString()
    let jsonDataArray = JSON.parse(StringData)
    let rowCnt = 0
    // Replay the case with gaps (If exists in the data file)
    let startTime = Number(jsonDataArray[0].data.time)
    let diffTime = moment().valueOf() - startTime
    console.log("vv330: diffTime: ", diffTime);

    setInterval(function timer() {
        let sensorData = []
        for (let i = 0; i < 5; i++) {
            let data = toString(jsonDataArray[rowCnt].data)
            let sourceTs = data.time
            data.extras.time = '' + (Number(data.extras.time) + diffTime)
            data.time = '' + (Number(data.time) + diffTime)
            data.extras.receiveTime = '' + (Number(data.extras.receiveTime) + diffTime)

            console.log("vv330: Source Timestamp: ", sourceTs, " New Timestamp: ", data.time)

            sensorData.push(JSON.stringify(data))
            rowCnt = rowCnt + 1
            if (rowCnt >= jsonDataArray.length) {
                rowCnt = 0
                // Add Min 4 Sec Gap while rolling over the file to avoid conflicts in analysis
                sensorData = sensorData.slice(0, 1)
                startTime = Number(jsonDataArray[0].data.time)
                diffTime = moment().add(4, 'seconds').valueOf() - startTime
                // diffTime = moment().valueOf() - startTime
                console.log("vv330: diffTime: ", diffTime);
                break;
            }
        }
        let packet = {
            caseNumber, patchId, deviceName: 'VV330', data: sensorData
        }
        console.log(packet)
        vivalnkIngestionClient.ingestDataPacket(packet)
        console.log("VV330: Ingested 5 packets", caseNumber, patchId)
    }, 5000);
}

exports.getNewPatchId = () => {
    return 'ECGRec_' + random.rand(200000, 300000)
        + '/C' + random.rand(700000, 800000)
}

function toString(o) {
    Object.keys(o).forEach(k => {
        if (typeof o[k] === 'object') {
            return toString(o[k]);
        }
        o[k] = '' + o[k];
    });
    return o;
}
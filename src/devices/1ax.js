const fs = require("fs")
const random = require('../utils/random')
const IngestionClient = require("../communication/client/1ax_ingestion")

exports.start = async (caseNumber, patchId) => {
    let filePath = __dirname + `/../ecgFile/LD301.json`
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let StringData = data.toString()
        let jsonDataArray = JSON.parse(StringData)
        for (let i = 1; i < 10002; i++) {
            let arr = jsonDataArray.splice(1, 10)
            if (arr.length) {
                arr = arr.map(ele => {
                    ele['patchId'] = patchId
                    return ele.SensorData
                })
                setTimeout(function timer() {
                    data = [{
                        caseNumber: caseNumber,
                        patchId: patchId,
                        liveStreamStartTime: new Date().getTime(),
                        sensorData: arr
                    }]
                    IngestionClient.IngestData(data)
                }, i * 4000);
            }
        }
    });
}

exports.getNewPatchId = () => {
    return random.generate(5, { alphabets: true }).toUpperCase()
}
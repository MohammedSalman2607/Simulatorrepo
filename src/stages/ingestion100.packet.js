const fs = require("fs")
const Logger = require('../utils/logger')
const IngestionClient = require("../communication/client/1ax_ingestion")
var moment = require('moment');

exports.start = async (handler, data) => {
    try {
        let shouldEmit = true
        for (let caseDevice of handler.caseDevices) {
            if (caseDevice.name === '1AX') {
                Logger.info('sending packets for ingestion and onboarding')
                let caseNumber = handler.case.caseNumber
                let patchId = handler.add_device_to_case.instance.patchId
                let folderName = "1Ax_case1" //1Ax_case1
                let filePath = __dirname + `/../ecgFile/LD301.json`
                fs.readFile(filePath, function (err, data) {
                    if (err) {
                        return console.error(err);
                    }
                    let StringData = data.toString()
                    let jsonDataArray = JSON.parse(StringData)
                    for (let i = 0; i <= 100000000; i++) {
                        if(i<9){
                            let arr = jsonDataArray.splice(0, 10)
                            if (arr.length) {
                                arr = arr.map(ele => {
                                    ele['patchId'] = patchId
                                    return ele.SensorData
                                })
                                setTimeout(function timer() {
                                    console.log(i)
                                    data = [{
                                        caseNumber: caseNumber,
                                        patchId: patchId,
                                        liveStreamStartTime:new Date().getTime(),
                                        sensorData: arr
                                    }]
                                    IngestionClient.LiveStreamData(data)
                                }, i * 2000);
                            }
                        }else {
                            setTimeout(function timer() {
                                Logger.verbose('packet sending for ingestion and onboarding successfully')
                                handler.emit('INGESTION_100_SUCCESS', handler, {})
                            }, i * 2000);
                            shouldEmit = false
                            break;
                            return;
                        }
                    }
                });
            }
        }
        if (shouldEmit) {
            handler.emit('INGESTION_100_SUCCESS', handler, {})
        }
    } catch (error) {
        console.log(error)
    }
}
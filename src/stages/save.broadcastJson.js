const fs = require("fs")
const Logger = require('../utils/logger')
const MissingPacketsClient = require("../communication/client/missingpackets")

exports.start = async (handler, data) => {
    try {
        for (let caseDevice of handler.caseDevices) {
            if (caseDevice.name === '1AX') {
                console.info("Save broadcast json start")
                let caseNumber = handler.case.caseNumber
                let patchId = caseDevice.instance.patchId
                let folderName = "1Ax_case1" //1Ax_case1
                let filePath = __dirname + `/../ecgFile/${folderName}/Broadcast.json`
                await fs.readFile(filePath, function (err, fileData) {
                    if (err) {
                        return console.error(err);
                    }
                    let StringData = fileData.toString()
                    let data = {
                        caseNumber: caseNumber,
                        patchId: patchId,
                        broadcastJsonValue: StringData
                    }
                    MissingPacketsClient.SaveBroadcastJson(data)
                    Logger.verbose('Save broadcast json start successfully')
                });
            }
        }
        handler.emit('BROADCASTJSON_SUCCESS', handler, {})
    } catch (error) {
        console.log(error)
    }
}

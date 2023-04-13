const fs = require("fs")
const Logger = require('../utils/logger')
const MissingPacketsClient = require("../communication/client/missingpackets")

exports.start = async (handler, data) => {
    try {
        let data = {
            startSequence:1,
            endSequence:2,
            caseNumber:"VIGO0034"
        }
        let updatePackets = await MissingPacketsClient.UpdatePackets(data)
    } catch (error) {
        console.log(error)
    }
}

this.start()
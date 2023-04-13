const fs = require("fs")
const Logger = require('../utils/logger')
const MissingPacketsClient = require("../communication/client/missingpackets")

exports.start = async (handler, data) => {
    try {
        let data = {
            start:1,
            limit:2,
            caseNumber:"VIGO0034"
        }
        let missingpackets = await MissingPacketsClient.GetCompletePatchData(data)
    } catch (error) {
        console.log(error)
    }
}

this.start()
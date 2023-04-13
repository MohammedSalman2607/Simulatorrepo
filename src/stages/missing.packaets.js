const fs = require("fs")
const Logger = require('../utils/logger')
const MissingPacketsClient = require("../communication/client/missingpackets")

exports.start = async (handler, data) => {
    try {
        let caseNumber = handler.case.caseNumber
        let j=0;
        for(let i=0;i<100;i++){
            setTimeout( function timer(){
                console.log(`missing packet start ${j} 20`)
                let data = {
                    type:"RANGE",
                    start:i*100,
                    limit:i+20,
                    caseNumber:caseNumber
                }
                MissingPacketsClient.GetMissingPackets(data)
            },i*6000 );
        }
    } catch (error) {
        console.log(error)
    }
}
// this.start()
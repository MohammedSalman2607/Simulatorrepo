const { packeData } = require('../../config/packet')
const Fs = require('fs')
var path = require('path');
const zip = require('adm-zip')()

exports.generateDatapacket = (patchId, seq) => {
   try {
      let SensorData = { "Seq": seq, "PatchId": patchId };
      let totalValues = generateRandomValue(96, 99)
      SensorData['ECG0'] = generateRandomValues(totalValues)
      SensorData['ECG1'] = generateRandomValues(totalValues)
      SensorData["vBat"] = 3025
      SensorData['IAGain'] = 0
      SensorData['LeadStatus'] = 0
      SensorData['RLDInformation'] = 0
      SensorData['TsECG'] = 401408 * seq
      return SensorData
   } catch (error) {
      throw error;
   }
}

exports.generateMQTTDataPacket = (patchId, seq, currentTS, startTS, previousTS) => {
   let SensorData = { "Seq": seq, "PatchId": patchId };
   let totalValues = generateRandomValue(96, 99)
   SensorData['ECG0'] = generateRandomValues(totalValues)
   SensorData['ECG1'] = generateRandomValues(totalValues)
   SensorData["vBat"] = 3025
   SensorData['IAGain'] = 0
   SensorData['LeadStatus'] = 0
   SensorData['RLDInformation'] = 0
   SensorData['TsECG'] = 401408 * seq
   return { msg: { SensorData }, currentTS, startTS, previousTS }
}

exports.generateNDataPackets = (patchId, startSeq, endSeq) => {
   try {
      const packets = []
      for (var i = startSeq; i <= endSeq; i++) {
         const probability = generateRandomValue(1, 10)
         if (probability <= 8) {
            packets.push(this.generateDatapacket(patchId, i))
         } else {
            console.log(`Not adding sequence Number ${i} with probability ${probability}`)
         }
      }
      return packets
   } catch (error) {
      throw error;
   }
}

exports.generateDataPacketsFromArray = (patchId, values) => {
   const packets = values.map(value => this.generateDatapacket(patchId, value))
   return packets
}

exports.createFile = async (data, patch, seq) => {
   try {
      const filePath = path.resolve(__dirname, `../../files/text/${patch}_${seq}.txt`)
      console.log(filePath)
      const file = Fs.writeFileSync(filePath, new Buffer(data, 'utf-8'))
      return filePath
   } catch (error) {
      console.log(error)
   }
}

exports.zipFile = async (filePath, data, patch, seq) => {
   try {
      const zipPath = path.resolve(__dirname, `../../files/zip/${patch}_${seq}_vigo.zip`)
      // var zipper = new zip();
      zip.addLocalFile(filePath);
      zip.writeZip(zipPath)

      return zipPath
   } catch (error) {
      console.log(error)
   }

}

exports.prepareFileData = (packets) => {
   return packets.map(x => JSON.stringify({ "SensorData": x })).join('\n')
}
var generateRandomValues = (count) => {
   try {
      let arr = []
      for (var i = 0; i < count; i++) {
         let value = generateRandomValue(packeData.minValue, packeData.maxValue)
         arr.push(value)
      }
      return arr
   } catch (error) {
      throw error;
   }
}

var generateRandomValue = (min, max) => {
   return Math.floor(Math.random() * (max - min)) + min;
}

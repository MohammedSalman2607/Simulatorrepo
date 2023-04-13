const MQTT = require('mqtt')
const LiveStreaming = require('../stages/livestreaming')
const { mqtt } = require('../../config/mqtt')
const Logger = require('./logger')
const Gateway = require('../stages/getway.operation')

const options = {
   username: mqtt.username,
   password: mqtt.password,
   port: mqtt.port,
   host: mqtt.url
}
let client = MQTT.connect(options)

const connect = () => {
   console.log(`Connecting MQTT`)
   client = MQTT.connect(options)
}


client.on('connect', function () {
   client.subscribe('iamalive', function (err) {
      if (!err) {
         console.log('cms.vigo.mqtt subscribed')
         client.publish('iamalive', 'cms.vigo.mqtt connected')
      } else {
         Logger.error(`Error Subscribing to cms.vigo.mqtt`)
      }
   })
})

client.on('message', function (topic, message) {
   console.log(`topic : ${topic}, message: ${message.toString()}`);
   console.log(message.toString())
   message = message.toString()
   console.log("-------------------")
   console.log("message", typeof message, typeof message == 'string')
   try {

      message = JSON.parse(message)
      if (message && typeof message != 'string' && message.code === 'MONITORING') {
         LiveStreaming.stopLiveStreaming()
      } else if (message && typeof message != 'string' && message.code === 'missingpacket') {
         const rangeFrom = message['data']['rangeFrom']
         const rangeTo = message['data']['rangeTo']
         Gateway.processMissingChunks(rangeFrom, rangeTo)
      }
   } catch (error) {
      console.log(error)
   }

   // if (message == 'MONITORING') {
   //    console.log('MONITORING')
   //    LiveStreaming.stopLiveStreaming()
   // }
})

exports.subscribe = (topic, callback) => {
   return client.subscribe(topic, callback)
}

exports.publish = (topic, payload, qosvalue = 0) => {
   return new Promise((resolve, reject) => {
      let methodLogString = `publish(${topic.toString()}, ${payload}, ${qosvalue})`
      // Logger.info(methodLogString);
      if (!client.connected) {
         connect()
      }
      // Logger.info(`${methodLogString} isClientConnected: `, client.connected)
      let payloadStr = (typeof payload != 'string') ? JSON.stringify(payload) : payload
      client.publish(topic.toString(), payloadStr, {
         qos: qosvalue,
         retain: false
      }, (err, res) => {
         if (err) {
            Logger.error(`${methodLogString} : error publishing: `, err);
            reject(err)
         } else {
            // Logger.verbose(`${methodLogString} : published successfully: `, res);
            resolve(res)
         }
      })
   })

}
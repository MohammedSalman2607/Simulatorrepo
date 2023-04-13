const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const proto = protoLoader.loadSync(path.join(__dirname, "../proto/", "missingpackets.proto"));
const definition = grpc.loadPackageDefinition(proto);
const _ = require('lodash');
// const url = 'pacman.mvm2.qa.vigocare.com:6565' // qa
const url = 'pacman.mvm2.dev.vigocare.com:6565' // dev
var client = new definition.MissingPacketService(url, grpc.credentials.createInsecure())

exports.UpdatePackets = (packet) => {
   return new Promise((resolve, reject) => {
      console.log(packet)
      client.UpdatePackets(packet, function (error, response) {
         if (error) {
            return reject(error)
         }
         console.log(response)
         return resolve(response)
      })
   })
}

exports.GetMissingPackets = (request) => {
    return new Promise((resolve, reject) => {
       console.log(request)
       client.GetMissingPackets(request, function (error, response) {
          if (error) {
             return reject(error)
          }
          console.log(response)
          return resolve(response)
       })
    })
 }

 exports.SaveBroadcastJson = (request) => {
    return new Promise((resolve, reject) => {
       console.log(request)
       client.SaveBroadcastJson(request, function (error, response) {
          if (error) {
             return reject(error)
          }
          console.log(response)
          return resolve(response)
       })
    })
 }

 exports.GetCompletePatchData = (request) => {
    return new Promise((resolve, reject) => {
       console.log(request)
       client.GetCompletePatchData(request, function (error, response) {
          if (error) {
             return reject(error)
          }
          console.log(response)
          return resolve(response)
       })
    })
 }
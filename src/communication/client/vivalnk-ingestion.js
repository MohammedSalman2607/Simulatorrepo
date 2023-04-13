const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const proto = protoLoader.loadSync(path.join(__dirname, "../proto/", "ingestion.proto"));
const definition = grpc.loadPackageDefinition(proto);
console.log(definition);
const _ = require('lodash');

let URL;

switch (global.env) {
   case 'local-dev':
   case 'local-qa':
      URL = 'datastream.mvm2.dev.vigocare.com:50066';
      break;
   case 'qa':
      URL = 'vivalink.mvm2.qa.vigocare.com:50064';
      break;
   case 'staging':
      URL = 'vivalink.mvm2.staging.vigocare.com:50064';
      break;
   case 'prod':
      URL = 'vivalink2.mvm.vigocare.com:50064';
      break;
   default:
      URL = 'datastream.mvm2.dev.vigocare.com:50066';
}
console.log("url:"+URL);

var client = new definition.IngestionService(URL, grpc.credentials.createInsecure())

exports.ingestDataPacket = (packets) => {
   client.ingestDataPacket(packets, (error, response) => {
      console.log(response, error)
   })
}  
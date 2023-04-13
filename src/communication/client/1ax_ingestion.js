const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const proto = protoLoader.loadSync(path.join(__dirname, "../proto/", "1ax_ingestion.proto"));
const definition = grpc.loadPackageDefinition(proto);
const _ = require('lodash');

let URL;
switch (global.env) {
   case 'local-dev':
   case 'local-qa':
      URL = '0.0.0.0:8080';
      break;
   case 'qa':
      URL = 'ingestion.mvm2.qa.vigocare.com:8080';
      break;
   case 'staging':
      URL = 'ingestion.mvm2.staging.vigocare.com:8080';
      break;
   case 'prod':
      URL = 'ingestion2.mvm.vigocare.com:8080';
      break;
   default:
      URL = 'ingestion.mvm2.dev.vigocare.com:8080';
}

var client = new definition.IngestionService(URL, grpc.credentials.createInsecure())

exports.IngestData = (packets) => {
   client.IngestData(packets[0], (error, response) => {
      console.log(error)
      console.log(response)
   })
}

exports.LiveStreamData = (packets) => {
   client.LiveStream(packets[0], (error, response) => {
      console.log(error)
      console.log(response)
   })
}
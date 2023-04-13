const RegisterAdmin = require('../src/stages/register.admin')
const LoginAdmin = require('../src/stages/login.admin')
const CreatePlatformPartner = require("../src/stages/create.platform.partner")
const LogInPlatformPartner = require('../src/stages/login.platform.partner')
const GetCondition = require("../src/stages/get.condition")
const GetDeviceVendor = require("../src/stages/get.device.vendor")
const CreateDeviceVendor = require("../src/stages/create.device.vendor")
const GetMonitoringPeriod = require("../src/stages/get.monitoring.period")
const CreateMonitoringPeriod = require("../src/stages/create.monitoringPeriod")
const CreateDevice = require("../src/stages/create.device")
const GetCustomer = require('../src/stages/get.customer')
const CreateLoginCustomer = require('../src/stages/create.customer')
const CreatePlan = require("../src/stages/create.plan")
const CreatePackage = require("../src/stages/create.package")
const CreateCase = require("../src/stages/create.case")
const CreateCaseDevice = require("../src/stages/create.casedevice")
const UpdateMedicalDetails = require("../src/stages/update.medical.details")
const GetMedicalDetails = require("../src/stages/get.medical.details")
const CreateDeviceInstance = require("../src/stages/create.device.instance")
const MappedDeviceInstance = require("../src/stages/mapped.device.instance")
const GetCaseDevices = require("../src/stages/get.case.devices")
const CreateBusinessPartner = require("../src/stages/create.business.partner")
const GetBusinessPartner = require("../src/stages/get.business.partner")
const ValidateDevice = require("../src/stages/validate.device")
const AddDeviceToCase = require("../src/stages/add.deviceto.case")
const HandlerSaveToFile = require("../src/stages/save.handler.file")
const LiveStreaming = require('../src/stages/livestream.case.device');
const GetPackage = require('../src/stages/get.package');
const PacketIngestion = require("../src/stages/ingestion.packet")
const MissingPacket = require("../src/stages/missing.packaets")
const SaveBroadcastJson = require("../src/stages/save.broadcastJson")
const OnbaordingCaseDevice = require("../src/stages/onboading.case.device")
const Ingestion100 = require("../src/stages/ingestion100.packet")
const GetDevice = require("../src/stages/get.device")

exports.STAGES = {
   "REGISTER_ADMIN": {
      'start': RegisterAdmin.start // Add platformPartnerID and login Not needed
   },
   "LOGIN_ADMIN": {
      'start': LoginAdmin.start // start from here not needed (we need token for create device vendor)
   },
   "CREATE_PLATFORM_PARTNER": {
      'start': CreatePlatformPartner.start
   },
   "LOGIN_PLATFORM_PARTNER": {  // START FROM HERE
      'start': LogInPlatformPartner.start
   },
   'GET_DEVICE_VENDOR': {
      'start': GetDeviceVendor.start  // create device vendor
   },
   'CREATE_DEVICE_VENDOR': {
      'start': CreateDeviceVendor.start
   },
   'GET_MONITORING_PERIOD': {
      'start': GetMonitoringPeriod.start
   },
   'CREATE_MONITORING_PERIOD': {
      'start': CreateMonitoringPeriod.start
   },
   'GET_CONDITION': {
      'start': GetCondition.start
   },
   'GET_DEVICE': {
      'start': GetDevice.start
   },
   'CREATE_DEVICE': {
      'start': CreateDevice.start
   },
   'GET_CUSTOMER': {
      'start': GetCustomer.start
   },
   'CREATE_LOGIN_CUSTOMER': {
      'start': CreateLoginCustomer.start
   },
   'GET_PACKAGE':{
      'start': GetPackage.start
   },
   'CREATE_PACKAGE': {  // GET PACKAGE
      'start': CreatePackage.start
   },
   'CREATE_PLAN': {
      'start': CreatePlan.start
   },
   "CREATE_CASE": {
      'start': CreateCase.start
   },
   "GET_MEDICAL_DETAILS": {
      'start': GetMedicalDetails.start
   },
   "CREATE_CASE_DEVICE" : {
      'start': CreateCaseDevice.start
   },
   "UPDATE_MEDICAL_DETAILS": {
      'start': UpdateMedicalDetails.start
   },
   "CREATE_BUSINESS_PARTNER": {
      'start': CreateBusinessPartner.start
   },
   "GET_BUSINESS_PARTNER": {
      'start': GetBusinessPartner.start
   },
   "CREATE_DEVICE_INSTANCE": {
      'start': CreateDeviceInstance.start
   },
   "MAPPED_DEVICE_INSTANCE": {
      'start': MappedDeviceInstance.start
   },
   "GET_CASE_DEVICES": {
      'start': GetCaseDevices.start
   },
   "VALIDATE_DEVICE": {
      'start': ValidateDevice.start
   },
   "ADD_DEVICE_TO_CASE": {
      'start': AddDeviceToCase.start
   },
   "SAVE_HANDLER_FILE": {
      'start': HandlerSaveToFile.start
   },
   "LIVESTREAMING": {
      'start': LiveStreaming.start
   },
   "PACKET_INGESTION": {
      'start': PacketIngestion.start
   },
   "MISSING_PACKET": {
      'start': MissingPacket.start
   },
   "BROADCASTJSON": {
      'start': SaveBroadcastJson.start
   },
   "INGESTION_100": {
      'start': Ingestion100.start
   },
   "ONBOARDING_CASE_DEVICE": {
      'start': OnbaordingCaseDevice.start
   },
   "FAILURE": {
      'start': (error) => { console.log(error) }
   },
   "SUCCESS": {
      'start': () => { console.log('CYCLE COMPLETED SUCCESSFULLY') }
   }
}

exports.EVENTS = {
   "LOGIN_ADMIN":{
      "nextStage": "LOGIN_ADMIN"
   },
   "REGISTER_ADMIN": {
      "nextStage": "REGISTER_ADMIN"
   },
   "REGISTER_ADMIN_SUCCESS": {
      "nextStage": "LOGIN_ADMIN"
   },
   "LOGIN_ADMIN_SUCCESS": {
      "nextStage": "LOGIN_PLATFORM_PARTNER"
   },
   "CREATE_PLATFORM_PARTNER": {
      "nextStage": "CREATE_PLATFORM_PARTNER"
   },
   "CREATE_PLATFORM_PARTNER_SUCCESS": {
      "nextStage": "LOGIN_PLATFORM_PARTNER"
   },
   "LOGIN_PLATFORM_PARTNER_SUCCESS": {
      "nextStage": "GET_DEVICE_VENDOR"
   },
   "GET_DEVICE_VENDOR_SUCCESS": {
      "nextStage": "GET_MONITORING_PERIOD"
   },
   "GET_MONITORING_PERIOD_SUCCESS": {
      "nextStage": "GET_DEVICE"
   },
   "CREATE_DEVICE":{
      "nextStage": "CREATE_DEVICE"
   },
   "CREATE_DEVICE_VENDOR": {
      "nextStage": "CREATE_DEVICE_VENDOR"
   },
   "CREATE_MONITORING_PERIOD": {
      "nextStage": "CREATE_MONITORING_PERIOD"
   },
   "GET_DEVICE_SUCCESS": {
      "nextStage": "CREATE_LOGIN_CUSTOMER"
   },
   "GET_CUSTOMER_SUCCESS": {
      "nextStage": "CREATE_LOGIN_CUSTOMER"
   },
   "CREATE_LOGIN_CUSTOMER_SUCCESS": {
      "nextStage": "GET_BUSINESS_PARTNER"
   },
   "GET_PACKAGE_SUCCESS":{
      "nextStage": "CREATE_PLAN"
   },
   "CREATE_PACKAGE": {
      "nextStage": "CREATE_PACKAGE"
   },
   "CREATE_PACKAGE_SUCCESS": {
      "nextStage": "GET_PACKAGE"
   },
   "CREATE_PLAN_SUCCESS": {
      "nextStage": "GET_BUSINESS_PARTNER"
   },
   "CREATE_BUSINESS_PARTNER_SUCCESS": {
      "nextStage": "GET_CONDITION"
   },
   "GET_BUSINESS_PARTNER_SUCCESS": {
      "nextStage": "GET_CONDITION"
   },
   "GET_CONDITION_SUCCESS": {
      "nextStage": "CREATE_DEVICE_INSTANCE"
   },
   "CREATE_DEVICE_INSTANCE_SUCCESS": {
      "nextStage": "MAPPED_DEVICE_INSTANCE"
   },
   "MAPPED_DEVICE_INSTANCE_SUCCESS": {
      "nextStage": "CREATE_CASE"
   },
   "CREATE_CASE_SUCCESS": {
      "nextStage": "GET_MEDICAL_DETAILS"
   },
   "GET_MEDICAL_DETAILS_SUCCESS": {
      "nextStage": "UPDATE_MEDICAL_DETAILS"
   },
   "UPDATE_MEDICAL_DETAILS_SUCCESS": {
      "nextStage": "CREATE_CASE_DEVICE"
   },
   "CREATE_CASE_DEVICE_SUCCESS": {
      "nextStage": "GET_CASE_DEVICES"
   },
   "GET_CASE_DEVICES_SUCCESS": {
      "nextStage": "VALIDATE_DEVICE"
   },
   "VALIDATE_DEVICE_SUCCESS": {
      "nextStage": "ADD_DEVICE_TO_CASE"
   },
   "ADD_DEVICE_TO_CASE_SUCCESS": {
      "nextStage": "BROADCASTJSON"
   },
   "BROADCASTJSON_SUCCESS": {
      "nextStage": "LIVESTREAMING"
   },
   "LIVESTREAMING_SUCCESS": {
      "nextStage": "INGESTION_100"
   },
   "INGESTION_100_SUCCESS": {
      "nextStage": "ONBOARDING_CASE_DEVICE"
   },
   "ONBOARDING_CASE_DEVICE_SUCCESS":{
      "nextStage": "SAVE_HANDLER_FILE"
   },
   "SAVE_HANDLER_FILE_SUCCESS": {
      "nextStage": "PACKET_INGESTION"
   },
   "PACKET_INGESTION_SUCCESS": {
      "nextStage": "MISSING_PACKET"
   },
   "FAILURE": {
      "nextStage": "FAILURE"
   },
   "SUCCESS": {
      "nextStage": "SUCCESS"
   },
   "ONLY_INGESTION_100": {
      "nextStage": "INGESTION_100"
   },
}


const EventEmitter = require('events')
const { STAGES, EVENTS } = require('../config/stages')

class Handler extends EventEmitter {
   constructor() {
      super()
      this.registerEvents()
      this.admin = {}
      this.platformPartner = {},
      this.patient = {}
   }
   registerEvents() {
      for (var event in EVENTS) {
         // console.log(event, 'registered')
         this.on(event, STAGES[EVENTS[event]['nextStage']]['start'])
      }
   }
}

module.exports = new Handler();
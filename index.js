const argv = require("yargs/yargs")(process.argv.slice(2))
    .option("env", {
        describe: "Environment - dev/qa"
    })
    .option('vv330', {
        description: 'vv330 exported file to replay',
    })
    .option('service', {
        description: 'service - MVM/SH',
    })
    .option('patientId', {
        description: 'patientId for the case',
    })
    .help().argv;
if (argv.env) {
    global.env = argv.env
} else if (argv._[0]) {
    global.env = argv._[0]
} else {
    global.env = 'dev'
}

if (argv.service) {
    global.service = argv.service
} else {
    global.service = 'MVM'
}

if (argv.patientId) {
    global.patientId = argv.patientId
}

if (argv.vv330) {
    global.vv330File = argv.vv330
    console.log("vv330 patch file: ", global.vv330File)
}

console.log("ENV: ", global.env)

const handler = require('./src/handler');

handler.emit('LOGIN_ADMIN', handler, {})
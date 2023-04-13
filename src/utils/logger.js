const { createLogger, format, transports } = require('winston');
const chalk = require("chalk");
const { combine, printf } = format;


const checkMessageType = (message) => {
    if (message === 'string') {
        return message;
    } else if (typeof message === 'object' && message instanceof Error) {
        return message.message;
    } else {
        return JSON.stringify(message)
    }

}

const myFormat = printf(({ level, message }) => {
    message = checkMessageType(message)
    switch (level) {
        case "info":
            level = chalk.white(level);
            message = chalk.white(message);
            break;

        case "verbose":
            level = chalk.green('success');
            message = chalk.green(message);
            break;

        case "error":
            level = chalk.red(level);
            message = chalk.red(message);

            break;

        default:
            break;
    }
    return `${level}: ${message}`;
});


const logger = createLogger({
    level: 'silly',
    format: combine(
        myFormat
    ),
    transports: [
        new transports.Console()
    ]
})




module.exports = logger;
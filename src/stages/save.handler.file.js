const fs = require('fs');

exports.start = async (handler, data) => {
    try {
        await fs.writeFileSync(`${new Date().toString()}.json`, JSON.stringify(handler));
        handler.emit('SAVE_HANDLER_FILE_SUCCESS', handler, {})
    } catch (error) {
        console.log(error)
        handler.emit('FAILURE', error)
    }
}
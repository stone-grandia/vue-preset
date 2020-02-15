const FtpClient = require('ftp')


class Client {
    constructor() {
        this._client = new FtpClient()
    }

    connect(config) {
        console.info('FTP: connect')
        return new Promise((resolve, reject) => {
            this._client.connect(config)
            this._client.on('ready', (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    disconnect() {
        console.info('FTP: end')
        this._client.end()
    }

    mkdir(target) {
        console.info('FTP: mkdir', target)
        return new Promise((resolve, reject) => {
            this._client.mkdir(target, true, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    rmdir(target) {
        console.info('FTP: rmdir', target)
        return new Promise((resolve, reject) => {
            this._client.rmdir(target, true, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    push(source, target) {
        console.info('FTP: put', target)
        return new Promise((resolve, reject) => {
            this._client.put(source, target, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}

module.exports = async function (config) {
    let client = new Client()
    await client.connect(config)
    return client
}
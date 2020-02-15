const fs = require('fs')
const path = require('path')
const ftpBuilder = require('./ftp')

async function createFtp() {
    const config = {
        host: process.env.FTP_HOST,
        port: process.env.FTP_PORT,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS
    }
    return await ftpBuilder(config)
}

async function upload(ftp, sourceDir, targetDir) {
    let files = fs.readdirSync(sourceDir)
    for (let i = 0; i < files.length; i++) {
        let name = files[i]
        let source = path.join(sourceDir, name)
        let target = targetDir + '/' + name
        let stat = fs.statSync(source)
        if (stat.isDirectory()) {
            await ftp.mkdir(target)
            await upload(ftp, source, target)
        } else {
            if (/\.map$/.test(name)) {

            } else {
                await ftp.push(source, target)
            }
        }
    }
}

async function start(target = '') {
    console.info('start upload to ftp...')

    const sourceDir = path.join(__dirname, '../dist')
    const targetDir = target
    const ftp = await createFtp()

    await upload(ftp, sourceDir, targetDir)
    ftp.disconnect()
    console.info('mission complete!')
}

start(process.argv[2]);
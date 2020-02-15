const fs = require('fs')

module.exports = function (api, options, rootOptions) {
    api.render('./template')
    api.extendPackage({
        dependencies: {
            "axios": "^0.19.2",
            "tinytime": "^0.2.6",
        },
    })

    let next = [];

    if (options.postcss) {
        api.extendPackage({
            devDependencies: {
                "postcss-px-to-viewport": "^1.1.1"
            }
        })
    } else {
        next.push(function () {
            rm(api.resolve('postcss.config.js'))
        })
    }

    if (options.deploy) {
        api.extendPackage({
            devDependencies: {
                "ftp": "^0.3.10"
            }
        })
        next.push(function () {
            mv(api.resolve('deploy/index.ts'), api.resolve('deploy/index.js'))
            mv(api.resolve('deploy/ftp.ts'), api.resolve('deploy/ftp.js'))
        })
    } else {
        next.push(function () {
            rm(api.resolve('deploy/index.ts'))
            rm(api.resolve('deploy/ftp.ts'))
            rm(api.resolve('deploy'), true)
            rm(api.resolve('.gitlab-ci.yml'))
        })
    }

    api.onCreateComplete(clear.bind(null, api, next))
}

function clear(api, next) {
    rm(api.resolve('public/favicon.ico'))
    rm(api.resolve('src/assets/logo.png'))
    rm(api.resolve('src/assets'), true)
    rm(api.resolve('src/components/HelloWorld.vue'))
    rm(api.resolve('src/components'), true)
    rm(api.resolve('src/router/index.ts'))
    rm(api.resolve('src/router'), true)
    rm(api.resolve('src/views/About.vue'))
    rm(api.resolve('src/views/Home.vue'))
    rm(api.resolve('src/App.vue'))
    rm(api.resolve('src/shims-tsx.d.ts'))

    for (let fun of next) {
        fun()
    }
}

function rm(file, dir = false) {
    if (fs.existsSync(file)) {
        if (dir) {
            fs.rmdirSync(file)
        } else {
            fs.unlinkSync(file)
        }
    }
}

function mv(source, target) {
    fs.renameSync(source, target)
}
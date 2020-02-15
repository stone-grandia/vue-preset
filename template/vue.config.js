module.exports = {
    publicPath: './',
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "src/views/style/config.scss";`
            }
        }
    }
}

module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-px-to-viewport': {
            viewportWidth: 750,
            unitPrecision: 3,
            unitToConvert: 'px',
            viewportUnit: 'vw',
            propList: ['*'],
            selectorBlackList: ['desktop'],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: [],
            landscape: false,
            landscapeUnit: 'vw',
            landscapeWidth: 1134
        }
    }
}
import tinytime from 'tinytime'
import _Vue from 'vue'

const tinyTimeOptions = {
    padMonth: true,
    padDays: true,
    padHours: true
}

function n2(value: number) {
    return value < 10 ? `0${value}` : value;
}

export const date = function (value: any) {
    let format = '{YYYY}-{Mo}-{DD}'
    if (value) {
        const template = tinytime(format, tinyTimeOptions)
        return template.render(new Date(+value))
    } else {
        return '--'
    }
}

export const datetime = function (value: any, noYear = false) {
    if (value) {
        let format = noYear ? '{Mo}-{DD} {H}:{mm}' : '{YYYY}-{Mo}-{DD} {H}:{mm}'
        const template = tinytime(format, tinyTimeOptions)
        return template.render(new Date(+value))
    }
}

export default {
    install(Vue: typeof _Vue) {
        Vue.filter('date', date);
        Vue.filter('datetime', datetime);
    }
}
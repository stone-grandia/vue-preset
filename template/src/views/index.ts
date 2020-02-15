import './style/base.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import PageContext from './PageContext'
import components from './components'
import filters from './filters'
import routes from './routes'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(components)
Vue.use(filters)

export default function () {
    new Vue({
        provide: {
            context: new PageContext(parseQuery())
        },
        router: new VueRouter({ routes }),
        render: h => h('RouterView')
    }).$mount('#app')
}


function parseQuery(): Mapping<string> {
    let query: Mapping<string> = {}
    if (window.location.search) {
        window.location.search.substr(1).split('&').forEach(str => {
            let ks = str.split('=')
            query[ks[0]] = ks[1]
        })
    }
    return query
}
import _Vue from 'vue'
import Avatar from './Avatar.vue'

export default {
    install(Vue: typeof _Vue) {
        Vue.component('Avatar', Avatar);
    }
}
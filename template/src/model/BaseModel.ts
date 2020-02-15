import Vue from 'vue'

export default class BaseModel<T> {
    private readonly _$vue: Vue
    private readonly _data: T

    constructor(data: T) {
        this._$vue = new Vue({data})
        this._data = data
    }

    get data(): T {
        return this._data
    }
}
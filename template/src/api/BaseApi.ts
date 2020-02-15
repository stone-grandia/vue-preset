import Http, { HttpRequestOptions } from '../common/Http'

type Method = 'get' | 'post' | 'patch' | 'put' | 'delete'

export default class BaseApi {
    private readonly _domain: string
    private readonly _http: Http

    constructor(domain: string) {
        this._domain = domain
        this._http = new Http()
    }

    preRequest(options: HttpRequestOptions): HttpRequestOptions {
        return options
    }

    postRequest(response: any) {
        return response
    }

    async request(method: Method, api: string, options: HttpRequestOptions, errorMessage: string) {
        api = this._domain + api
        options = this.preRequest(options)
        try {
            let response = await this._http.request(method, api, options)
            return this.postRequest(response)
        } catch (e) {
            console.error(e)
        }
    }

    get(api: string, query: Mapping<string | number>, errorMessage: string) {
        return this.request('get', api, { query }, errorMessage)
    }

    post(api: string, body: any, query: Mapping<string | number>, errorMessage: string) {
        return this.request('post', api, { query, body }, errorMessage)
    }

    patch(api: string, body: any, query: Mapping<string | number>, errorMessage: string) {
        return this.request('patch', api, { query, body }, errorMessage)
    }

    put(api: string, body: any, query: Mapping<string | number>, errorMessage: string) {
        return this.request('put', api, { query, body }, errorMessage)
    }

    delete(api: string, query: Mapping<string | number>, errorMessage: string) {
        return this.request('delete', api, { query }, errorMessage)
    }
}
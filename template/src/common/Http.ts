import axios, { Method } from 'axios'

export interface HttpRequestOptions {
    headers?: Mapping<string>,
    query?: Mapping<string | number>,
    body?: any,
}

export default class Http {
    async request(method: Method, url: string, options: HttpRequestOptions): Promise<any> {
        try {
            let { data } = await axios.request({
                method,
                url,
                headers: options.headers,
                params: options.query,
                data: options.body
            })
            return data
        } catch ({ response }) {
            let err = new Error(response.status + ':' + response.statusText)
            //@ts-ignore
            err.data = response.data
            throw err
        }
    }
}
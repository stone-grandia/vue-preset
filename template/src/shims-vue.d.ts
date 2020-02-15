declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module "tinytime" {
    export default function (format: string, options: any): any
}

declare interface Mapping<T> {
    [index: string]: T;
}
export default class PageContext {
    private readonly _env: Mapping<string>

    constructor(env: Mapping<string>) {
        this._env = env
    }

    getEnv(name: string): string | undefined {
        return this._env[name]
    }

    alert(message: string) {
        return window.alert(message)
    }

    confirm(message: string) {
        return window.confirm(message)
    }

    prompt(message: string, defaultValue: string) {
        return window.prompt(message, defaultValue)
    }

    toast(message: string) {

    }
}
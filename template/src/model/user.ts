import BaseModel from './BaseModel'

interface UserData {
    name: string,
}

class User extends BaseModel<UserData>{
    constructor() {
        super({
            name: '',
        })
    }
}

export default new User()
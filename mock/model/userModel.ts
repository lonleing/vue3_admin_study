const BaseModel = require('./baseModel')
const cryptoJS = require('crypto-js')
class User extends BaseModel {

    constructor () {
        super()
        this.data.push(this.createData({
            id: 1,
            username: 'zmtadmin',
            nickname: '@cname',
            sex: this.randomInt(0, 1),
            password: cryptoJS.MD5('zmtadmin').toString(),
            created_at: '2021-12-10 15:58:27',
            updated_at: '2021-12-19 11:32:15',
            token: '797ds4ad0sa2d5154'
        }))
    }
}


module.exports = User
export {}
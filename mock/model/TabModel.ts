const BaseModel = require('./BaseModel')

interface CountryType {
    CN: string,
    US: string,
    JP: string,
    EU: string,
    [x: string]: string
}
interface Data {
    id: number,
    created_at: string,
    updated_at: string,
    key: string,
    label: string
}

class Tab extends BaseModel {

    constructor() {
        super()
        const countrys: CountryType = {
            CN: 'China',
            US: 'USA',
            JP: 'Japan',
            EU: 'Eurozone'
        }
        const data: Data[] = this.createData({
            'list|4': [{
                'id|+1': 0,
                created_at: '@datetime',
                updated_at: '@created_at'
            }]
        }).list
        data.forEach((item:  Data) => {
            item.key = Reflect.ownKeys(countrys)[item.id] as string
            item.label = countrys[item.key]
        })
        this.data = data
    }
}

module.exports = Tab
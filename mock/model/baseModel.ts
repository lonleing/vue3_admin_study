const Mock = require('mockjs')
interface GenerateData {
    [x: string]: any
}
class BaseModel {
    protected data: GenerateData[] = []
    private random = Mock.Random

    protected createData(rule: any) {
        return Mock.mock(rule)
    }

    protected randomInt(min: number, max: number) {
        return this.random.integer(min, max)
    }

    protected where(field: string, prop: string) {
        if (this.data.length) {
            const queryTerm = ['=', '!=', '>', '<']
            if (queryTerm.includes(prop)) {

            } else {
                this.data = this.data.reduce((newData: GenerateData[], dataItem: GenerateData) => {
                    if (dataItem[field] == prop) {
                        newData.push(dataItem)
                    }
                    return newData
                }, [])
            }
        }
        return this
    }

    protected select(params: string[]) {
        if (this.data.length) {
            this.data.forEach(dataItem => {
                const newDataItem: GenerateData = {}
                params.forEach(param => {
                    newDataItem[param] = dataItem[param]
                })
                dataItem = newDataItem
            })
        }
        return this
    }

    protected get() {
        return this.data[0] || null
    }

    protected all() {
        return this.data
    }
}

module.exports = BaseModel
export {}
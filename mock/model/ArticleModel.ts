const BaseModel = require('./BaseModel')

class Article extends BaseModel {

    constructor() {
        super()
        const data = this.createData({
            'list|30': [{
                'id|+1': 0,
                'title|1': '@title',
                'status|1': ['draft', 'published'],
                'describe|1': '@sentence',
                'importance|1': [1, 2, 3],
                'isComment|1': '@boolean',
                reading: this.randomInt(0, 100),
                platform: [this.randomChar('abc')],
                content: '@paragraph',
                author: '@name',
                date: '@datetime("T")',
                created_at: '@datetime',
                updated_at: '@created_at'
            }]
        })
        this.data = data.list
    }
}

module.exports = Article
export { }
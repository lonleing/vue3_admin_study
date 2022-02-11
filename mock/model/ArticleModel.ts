const BaseModel = require('./BaseModel')

class Article extends BaseModel {

    constructor() {
        super()
        this.data.push(this.createData({
            'list|11': [{
                'id|+1': 0,
                'title|1': '@title',
                'status|1': ['draft', 'published'],
                'describe|1': '@sentence',
                content: '@paragraph',
                author: '@name',
                date: '@datetime("T")',
                created_at: '@datetime',
                updated_at: '@created_at'
            }]
        }))
    }
}

module.exports = Article
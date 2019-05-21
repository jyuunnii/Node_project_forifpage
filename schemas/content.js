const mongoose=require('mongoose')
const contentSchema = new mongoose.Schema({
  pageId: {
    type: String,
    required: true
  },
  pageName: {
    type: String
  },
  pageContent: {
    type: String
  }
})

module.exports = mongoose.model('Content', contentSchema)

/*

DB      MongoDB

Table   Model     Mongoose Schema: Document의 형식을 규정
                  Schema를 사용하여 Model을 생성
Record  Document

*/

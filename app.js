const express=require('express')
const path=require('path')
const logger=require('morgan')
const app=express()
const data=require('./data.json')
const mongoose=require('mongoose')


function connect(){
  mongoose.set('debug', true) //개발중인 모드임을 암시
  mongoose.connect('mongodb://root@localhost:27017/',{
    dbName: 'ajax-tutorial'
  }, function(error){
    if(error){
      console.error('MongoDB connction error: ', error)
    }else{
      console.log('MongoDB connected!')
    }
  })
}
connect()

const Content=require('./schemas/content.js')

mongoose.connection.on('error', (error)=>{
    console.error('MongoDB error occured: ', error)
})
mongoose.connection.on('disconnected', ()=>{
  console.error('MongoDB  disconnected!')
  connect()
})
//middleware
app.use(express.static(path.join(__dirname, 'public')));
//body-parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(logger('dev'));

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.get('/', (req,res,err)=>{
  res.redirect('/home')
})
//set route
app.get('/home', (req,res,err)=>{
  res.render('index',{
    title: 'FORIF-Programming Club',
    content: data.home
  })
})
app.get('/history', (req,res,err)=>{
  res.render('index',{
    title: 'FORIF-Programming Club-History',
    content: data.history
  })
})
app.get('/study', (req,res,err)=>{
  res.render('index',{
    title: 'FORIF-Programming Club-Study',
    content: data.study
  })
})
app.get('/rules', (req,res,err)=>{
  res.render('index',{
    title: 'FORIF-Programming Club-Rules',
    content: data.rules
  })
})

app.listen(8000, ()=>{
  console.log('8000번 포트에서 대기중')
  const newContent=new Content({
    pageId: "temp",
    pageTitle:"temp"
  })
  newContent.save((err, content)=>{
    console.log('방금 DB에 저장된 데이터의 제목:'+content.pageId)
  }) //db에 실제 반영
});

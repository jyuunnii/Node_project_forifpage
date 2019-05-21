const express=require('express')
const path=require('path')
const logger=require('morgan')
const app=express()
const data=require('./data.json')
const mongoose=require('mongoose')
const connect=require('./schemas')

const dbPort=27017
connect(dbPort)

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
  Content.findOne({ pageId: 'home' }, (err, content) => {
    res.render('index.ejs', {
      title: content.pageName,
      content: content.pageContent
    })
  })
})
app.get('/history', (req,res,err)=>{
  Content.findOne({ pageId: 'history' }, (err, content) => {
    res.render('index.ejs', {
      title: content.pageName,
      content: content.pageContent
    })
  })
})
app.get('/study', (req,res,err)=>{
  Content.findOne({ pageId: 'study' }, (err, content) => {
  res.render('index.ejs', {
    title: content.pageName,
    content: content.pageContent
  })
})
})
app.get('/rules', (req,res,err)=>{
  Content.findOne({ pageId: 'rules' }, (err, content) => {
  res.render('index.ejs', {
    title: content.pageName,
    content: content.pageContent
  })
})
})

app.listen(8000, ()=>{
  console.log('8000번 포트에서 대기중')
});

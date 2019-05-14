const express=require('express')
const path=require('path')
const logger=require('morgan')
const app=express()
const data=require('./data.json')
const titledata=require('./titledata.json')
const imagedata=require('./imagedata.json')

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
    title: titledata.home,
    content: data.home,
    image:imagedata.home
  })
})
app.get('/history', (req,res,err)=>{
  res.render('index',{
    title: titledata.history,
    content: data.history,
    image:imagedata.history
  })
})
app.get('/study', (req,res,err)=>{
  res.render('index',{
    title: titledata.study,
    content: data.study,
    image:imagedata.study
  })
})
app.get('/rules', (req,res,err)=>{
  res.render('index',{
    title: titledata.rules,
    content: data.rules,
    image:imagedata.rules
  })
})

app.listen(8000, ()=>{
  console.log('8000번 포트에서 대기중')
});

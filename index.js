const express = require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const Chat=require('./models/chat.js');
const methodOverride=require('method-override');
const ExpressError=require('./ExpressError');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}
main() 
    .then(()=>{
        console.log('connection successful');
    })
    .catch((err)=>{
        console.log(err);
    });

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.get('/',(req,res)=>{
    res.send('working root');
})

//INDEX ROUTE
app.get('/chats',async (req,res,next)=>{
   try{
    let chats = await Chat.find();
    res.render('index.ejs',{chats});
   }
   catch(err){
    next(err);
   }
});

function asyncWrap(fn){
    
   return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
};

//NEW ROUTE
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
});

//SHOW ROUTE
app.get('/chats/:id',asyncWrap(async(req,res,next)=>{
        let {id}=req.params;
        let chat=await Chat.findById(id);
       if(!chat){
            next(new ExpressError(404,'chat not found'));
         }
        res.render('edit.ejs',{chat});
}));

//CREATE ROUTE
app.post('/chats',async(req,res,next)=>{
    try{
        let {from,to,msg}=req.body;
        let newChat=new Chat({
            from:from,
            to: to,
            msg: msg,
            created_at: Date(),
        });
        await newChat.save();
        res.redirect('/chats');
    }
    catch(err){
        next(err);
    }

});

//EDIT ROUTE
app.get('/chats/:id/edit',async (req,res,next)=>{
    try{
        let {id}=req.params;
        let chat = await Chat.findById(id);
        res.render('edit.ejs',{chat});
    }
    catch(err){
        next(err);
    }
})

//UPDATE ROUTE
app.put('/chats/:id',async(req,res,next)=>{
    try{
        let {id}=req.params;
        let {msg:newMsg}=req.body;
        let updatedChat= await Chat.findByIdAndUpdate(
            id,
            {msg:newMsg},
            {runValidators:true, new:true}
        );
        console.log(updatedChat);
        res.redirect('/chats');
    }
    catch(err){
        next(err);
    }
})

//DELETE ROUTE
app.delete('/chats/:id',async (req,res,next)=>{
    try{
        let {id}=req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect('/chats');
    }
    catch(err){
        next(err);
    }
})


app.use((err,req,res,next)=>{
    let {status=500,message='some error occured'}=err;
    res.status(status).send(message);
})



app.listen(8080,()=>{
    console.log('server is listening');
})






//homework = use updated_at;

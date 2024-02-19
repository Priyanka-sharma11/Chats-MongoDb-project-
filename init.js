const mongoose=require('mongoose');
const Chat=require('./models/chat.js');

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


let allChats=[
    {
        from:'om',
        to:'anjali',
        msg:'anjali aaj class me mam aayi thi kya',
        created_at:new Date(),
    },
    {
        from:'rahul',
        to:'priya',
        msg:'hi priya',
        created_at:new Date(),
    },
    {
        from:'shanti',
        to:'mukesh',
        msg:'ek chutki sindur ki kimat tum kya jano mukesh babu',
        created_at:new Date(),
    },
    {
        from:'om',
        to:'shanti',
        msg:'mukesh ko marne ka plan bnate hai',
        created_at:new Date(),
    },
    {
        from:'nikita',
        to:'priyanka',
        msg:'tu ghr kb aayegi',
        created_at:new Date(),
    },
    {
        from:'simran',
        to:'bauji',
        msg:'bauji mughe jane do , mughe jane do bauji',
        created_at:new Date(),
    },
    {
        from:'shivam',
        to:'mummy',
        msg:'mummy maggie bna do',
        created_at:new Date(),
    },
    {
        from:'mummy',
        to:'bala',
        msg:'karamjali',
        created_at:new Date(),
    },
    {
        from:'baba',
        to:'priyanka',
        msg:'mere phone ke msg delete kr de',
        created_at:new Date(),
    },
    {
        from:'shushila',
        to:'golu',
        msg:'beejmatna',
        created_at:new Date(),
    },
]
Chat.insertMany(allChats);


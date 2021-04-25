var express= require('express')
var bodyParser=require('body-parser')

var app=express()
var http=require('http').Server(app);
var io=require('socket.io')(http)
var mongoose=require('mongoose')

var dbURI='mongodb+srv://user:user@cluster0.qq8ue.mongodb.net/Cluster0?retryWrites=true&w=majority'

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// var messagesArr=[
//     {name: 'Varun',message: 'TEst 1'},
//     {name: 'Tarun',message: 'TEst 1123'}
// ]

var Message= mongoose.model('Message',{
    name:String,
    message: String
})

app.get('/messages',(req,res)=>{
    Message.find({},(err,messages)=>{
        res.send(messages)
    })
  
})

app.get('/messages/:user',(req,res)=>{
    var user=req.params.user;
    Message.find({name: user},(err,messages)=>{
        res.send(messages)
    })
  
})

io.on('connection',
(socket)=>{
    console.log('a user connected')
})

app.post('/messages',(req,res)=>{
    var message=new Message(req.body)

    message.save((err)=>{
        if(err)
            sendStatus(500)

        // messagesArr.push(req.body)
        io.emit('message',req.body)
        res.sendStatus(200)
    })
    
})

mongoose.connect(dbURI,(err)=>{
    console.log('mongo db',err)
})

var server= http.listen(3000,()=>{
    console.log('server is listening', server.address().port)
})

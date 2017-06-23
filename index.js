const express = require('express');
const app = express();
const db = require('./DataBase/DbOnlineFriends.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;

if (process.env.NODE_ENV != 'production') {
  app.use(require('./build'));
}

app.use(cookieParser());
app.use(cookieSession({
  secret: " give me a donner",
  maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(csurf());
app.use(function(req, res, next){
  res.cookie('t', req.csrfToken());
  next();
});

app.use("/static", express.static(__dirname+"/public"));
app.use("/Uploads", express.static(__dirname+ "/Uploads"));
// <======== routes ========>
app.use('/', require('./Routes/regisAndLoginRoutes.js'));
app.use('/', require('./Routes/AppRoutes.js'));
app.use('/', require('./Routes/ProfileRoutes.js'));
app.use('/', require('./Routes/EditProfileRoutes.js'));
app.use('/', require('./Routes/EditBioRoutes.js'));
app.use('/', require('./Routes/FriendsRoutes.js'));
app.use('/', require('./Routes/OPPRoutes.js'));
app.use('/', require('./Routes/WallFeedRoutes.js'));
app.use('/', require('./Routes/EditUsernameRoutes.js'));


app.get('/welcome', function(req, res){
  if (req.session.user){
    res.redirect('/');
  }
  res.sendFile(__dirname + '/index.html');
});

let onlineUsers = [];
let chatMessages = [];

app.get('/connected/:socketId', (req, res) => {
  if (req.session.user) {
    io.sockets.sockets[req.params.socketId] &&
    onlineUsers.push({
      socketId: req.params.socketId,
      userId: req.session.user.id
    });
    console.log('onlineUsers after new connection', onlineUsers);
    io.sockets.emit('updateOnlineUsers', onlineUsers);
  }
});

app.get('/chatMessages', (req, res) => {
  res.json({
    chatMessages: chatMessages.slice(Math.max(chatMessages.length - 10, 0))
  });
});

app.get('/onlineFriends', requireUser, (req, res) => {
  if(onlineUsers.length > 0){
    console.log("GET /onlineFriends", onlineUsers);
    db.getOnlineFriends(onlineUsers).then((data)=>{
      console.log(data,"this is the data");
      res.json({ success: true, onlineUsersInfo: data});
    }).catch((err) => {
      res.json({success:false, error: err});
    });
  } else {
    res.json({msg: "no Friends online"});
  }
});

app.get('/', requireUser, function(req, res){
  if (!req.session.user) {
    res.redirect('/welcome');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});


app.get('*', function(req, res) {
  if(!req.session.user){
    return res.redirect('/welcome');
  }
  res.sendFile(__dirname + '/index.html');
});
server.listen(port, function() {
  console.log("Hi there",port);
});
//change app in listen to server
io.on('connection', function(socket) {
  console.log(`socket with the id ${socket.id} is now connected`);
  socke.on('rooms', function(rooms) {
        socket.join(rooms);
    });
  socket.on('disconnect', function() {
    for (var i = 0; i < onlineUsers.length; i++) {
      if (onlineUsers[i].socketId == socket.id) {
        onlineUsers.splice(i, 1); //cehck to see if there is none left in the list with that user id
      }
    }
    console.log(`socket with the id ${socket.id} is now disconnected`);
    console.log('onlineUsers after disconnection', onlineUsers);
    io.sockets.emit('updateOnlineUsers');
  });
  socket.on('chat', (messageData) => {
    console.log("recived new chat msg", messageData);
    chatMessages.push(messageData);
    console.log("newChatMsgs", chatMessages);
    io.sockets.in(rooms).emit('updateChat', chatMessages.slice(Math.max(chatMessages.length - 10, 0)));
  });
    socket.on('switchRoom', function(newroom){
  		socket.leave(socket.room);
      socket.join(newroom);
      socket.room = newroom;
      socket.emit('updaterooms', rooms, newroom);
  });
});
//use this everytime i made a getrequest
function requireUser(req, res, next){
  if(req.session.user){
    return next();
  }
  res.redirect('/welcome');
}

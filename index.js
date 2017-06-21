const express = require('express');
const app = express();

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
app.use('/', require('./Routes/ProfileRoutes.js'));
app.use('/', require('./Routes/EditBioAndUsernameRoutes.js'));
app.use('/', require('./Routes/FriendsRoutes.js'));

app.get('/welcome', function(req, res){
  if (req.session.user){
    res.redirect('/');
  }
  res.sendFile(__dirname + '/index.html');
});

let onlineUsers = [];

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
  });
//use this everytime i made a getrequest
function requireUser(req, res, next){
  if(req.session.user){
    return next();
  }
  res.redirect('/welcome');
}

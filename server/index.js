var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var mongojs = require('mongojs');

var ObjectID = mongojs.ObjectID;
var db = mongojs(process.env.MONGO_URL || 'mongodb://localhost:27017/local');
var app = express();
var server = app.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('Listening on '+ ':3000'));

var clients = {};
var users = {};

var chatId = 1;

websocket.on('connection', (socket) => {
  clients[socket.id] = socket;
  socket.on('userJoined', (userId) => onUserJoined(userId, socket));
  socket.on('message', (message) => onMessageReceived(message, socket));
})

function onUserJoined(userId, socket) {
  try {
    if (!userId) {
      var user = db.collection('users').insert({}, (err, user) => {
        socket.emit('userJoined', user._id);
        users[socket.id] = user._id;
        _sendExistingMessages(socket);
      });
    } else {
      users[socket.id] = userId;
      _sendExistingMessages(socket);
    }
  } catch(err) {
    console.err(err);
  }
}

function onMessageReceived(message, senderSocket) {
  userId = users[senderSocket.id];
  if (!userId) return;

  _sendAndSaveMessage(message, senderSocket);
}

function _sendExistingMessages(socket) {
  var messages = db.collection('messages')
  .find({chatId})
  .sort({createdAt: 1})
  .toArray((err, messages) => {
    if (!messages.length) return;
    socket.emit('message', messages.reverse());
  })

}

function _sendAndSaveMessage(message, socket, fromServer) {
  var messageData {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };

  db.collection('messages').insert(messageData {err, message} => {
    var emitter = fromServer ? websocket : socket.broadcast;
  })
}
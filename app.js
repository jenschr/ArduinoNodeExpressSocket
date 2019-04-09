var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(3003);

server.listen(3001);
// WARNING: app.listen(80) will NOT work here!

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const sPort = new SerialPort('/dev/tty.usbmodem1431');
const parser = sPort.pipe(new Readline({delimiter: '\r\n'})); //Read the line only when new line comes.
parser.on('data', (temp) => { //Read data
    console.log(temp);
    var today = new Date();
    io.sockets.emit('eventdata', {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()), text:temp}); //emit the datd i.e. {date, time, temp} to all the connected clients.
});

io.on('connection', (socket) => {
    console.log("Someone connected."); //show a log as a new client connects.
})

module.exports = app;

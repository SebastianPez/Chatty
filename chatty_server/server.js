const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let userCount = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount ++;
  let newUser = { type: "postNotification", content: "New", currentUsers: userCount };
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      if (ws !== client) {
      client.send(JSON.stringify(newUser));
    } else {
      client.send(JSON.stringify({ currentUsers: userCount }));
    }
    }
  });

  ws.on('message', (msg) => {
    const incomingMsg = JSON.parse(msg);
    let outgoingMsg = {};
    if(incomingMsg.type === "postNotification") {
      if(!incomingMsg.oldUserName) {
        incomingMsg.oldUserName = "Anonymous";
      }
      outgoingMsg = { type: incomingMsg.type, id: uuidv4(), username: incomingMsg.username, oldUserName: incomingMsg.oldUserName };
    } else if (incomingMsg.type === "postMessage") {
      outgoingMsg = { type: incomingMsg.type, id: uuidv4(), content: incomingMsg.content, username: incomingMsg.username };
    }
    
    wss.clients.forEach(function each(client) {
      if(client.readyState === ws.OPEN) {
        client.send(JSON.stringify(outgoingMsg));
      }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    userCount --;
    let loseUser = { type: "postNotification", content: "Lose", currentUsers: userCount };
    console.log('Client disconnected');
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(loseUser));
      }
    });
  });
});


Chatty
=====================

A minimal and light chat room for all kinds of user.

### Usage

Clone the repository.

```
git clone git@github.com:SebastianPez/Chatty.git
cd Chatty
```

Install the dependencies for the app server and then run the server.

```
npm install
npm start
open http://localhost:3000
```

Open a second terminal and open the chatty_server folder from within the main Chatty directory.
Then install the dependencies for the server and run the server.

```
cd chatty_server
npm install
npm start
```

### Screenshots

!["Notification when another user joins the channel"](https://github.com/SebastianPez/Chatty/blob/master/Screenshots/Screen%20Shot%202019-04-12%20at%204.45.35%20PM.png?raw=true)
!["Notifcation when a user changes their username"](https://github.com/SebastianPez/Chatty/blob/master/Screenshots/Screen%20Shot%202019-04-12%20at%204.46.02%20PM.png?raw=true)
!["Showing another connected user's message"](https://github.com/SebastianPez/Chatty/blob/master/Screenshots/Screen%20Shot%202019-04-12%20at%204.46.46%20PM.png?raw=true)
!["Notificatoin when a user leaves the channel"](https://github.com/SebastianPez/Chatty/blob/master/Screenshots/Screen%20Shot%202019-04-12%20at%204.47.08%20PM.png?raw=true)

### Dependencies

#### Client Dependencies 
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

#### Server Dependencies
* Express
* WS
* UUID
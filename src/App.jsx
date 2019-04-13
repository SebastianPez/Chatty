import React, {Component} from 'react';
// Importing all the components necessary for the App.
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ''},
      messages: [],
      users: 0
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }
  // Iniating client connection to the Chat Server.
  componentDidMount() {
     this.socket = new WebSocket('ws://localhost:3001');
     this.socket.onopen = () => {
       console.log('Connected to server');
     }
     // Client side handling for messages from the server.
     this.socket.onmessage = (msg) => {
       const incomingMessage = JSON.parse(msg.data);
       const newMessages = this.state.messages.concat(incomingMessage);
       // Handling for the user count update inside the Chatty App.
       if (incomingMessage.currentUsers) {
         this.setState({ users: incomingMessage.currentUsers, messages: newMessages })
         // Handling for all regular chat messages from the users, adding them to the App's state to pass down as props for each individual user.
       } else {
       this.setState({ messages: newMessages });
       }
     }
  }
  
  // The function passed down to the chatbar to allow the messages to be sent to the server.
  onNewMessage(contents) {
     const message = { type: contents.type, content: contents.content, username: contents.username};
     this.socket.send(JSON.stringify(message));
  }
  // The function passed down to the chatbar to update the currentUser when a user changes their username. Then sends that as a notification to the server which tells all users about the name change.
  onNewUser(contents) {
    let oldUserName = contents.oldUserName;
    this.setState({currentUser: {name: contents.username}});
    let newUserNameUpdate = { type: 'postNotification', username: contents.username, oldUserName: oldUserName};
    this.socket.send(JSON.stringify(newUserNameUpdate));
  }
  // Rendering of the page with proper props for each component.
  render() {
    return (
      <div>
      <NavBar currentUsers={this.state.users} />
      <MessageList messages={this.state.messages} />
      <ChatBar user={this.state.currentUser} onNewMessage={this.onNewMessage} onNewUser={this.onNewUser} />
      </div>
    );
  }
}
export default App;

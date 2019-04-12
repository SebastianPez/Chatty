import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: [],
      users: 0
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }
  componentDidMount() {
     this.socket = new WebSocket("ws://localhost:3001");
     console.log('Connected to server');
     // Need to change so that current user receives immediate update to their state, shouldn't have to wait for response from server to do so.
     this.socket.onmessage = (msg) => {
       const incomingMessage = JSON.parse(msg.data);
       const newMessages = this.state.messages.concat(incomingMessage);
       if (incomingMessage.currentUsers) {
         this.setState({ users: incomingMessage.currentUsers })
       } else {
       this.setState({ messages: newMessages });
       }
     }
  }
  
  onNewMessage(contents) {
     const message = { type: contents.type, content: contents.content, username: contents.username};
     this.socket.send(JSON.stringify(message));
  }
  onNewUser(contents) {
    // console.log(contents);
    let oldUserName = contents.oldUserName;
    this.setState({currentUser: {name: contents.username}});
    let newUserNameUpdate = { type: "postNotification", username: contents.username, oldUserName: oldUserName};
    this.socket.send(JSON.stringify(newUserNameUpdate));
  }
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

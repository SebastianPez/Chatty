import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

function NavBar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: []
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }
  componentDidMount() {
     this.socket = new WebSocket("ws://localhost:3001");
     console.log('Connected to server');
     // Need to change so that current user receives immediate update to their state, shouldn't have to wait for response from server to do so.
     this.socket.onmessage = (msg) => {
       const newMessages = this.state.messages.concat(JSON.parse(msg.data));
       this.setState({ messages: newMessages});
     }
  }
  
  onNewMessage(contents) {
     const message = { content: contents.content, username: contents.username};
     this.socket.send(JSON.stringify(message));
  }
  onNewUser(content) {
    this.setState({currentUser: {name: content}});
    console.log("App State", this.state.currentUser);
  }
  render() {
    return (
      <div>
      <NavBar />
      <MessageList messages={this.state.messages} />
      <ChatBar user={this.state.currentUser} onNewMessage={this.onNewMessage} onNewUser={this.onNewUser} />
      </div>
    );
  }
}
export default App;

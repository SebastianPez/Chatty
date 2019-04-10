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
      currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    }
    this.onNewMessage = this.onNewMessage.bind(this);
  }
  componentDidMount() {
     this.socket = new WebSocket("ws://localhost:3001");
     console.log('Connected to server');
     this.socket.onmessage = (msg) => {
       const newMessages = this.state.messages.concat(JSON.parse(msg.data));
       this.setState({ messages: newMessages});
     }
  }
  
  onNewMessage(contents) {
     const message = {id: this.state.messages.length + 1, content: contents.content, username: contents.username};
     this.socket.send(JSON.stringify(message));
    // const newMessages = this.state.messages.concat(message);
    // this.setState({ messages: newMessages});
  }
  render() {
    return (
      <div>
      <NavBar />
      <MessageList messages={this.state.messages} />
      <ChatBar user={this.state.currentUser} onNewMessage={this.onNewMessage} />
      </div>
    );
  }
}
export default App;

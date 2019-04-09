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
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  onNewMessage(contents) {
    const message = {id: this.messages.length + 1, content: contents.content, username: contents.username}
    const newMessages = this.state.messages.concat(message);
    this.setState({ messages: newMessages});
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

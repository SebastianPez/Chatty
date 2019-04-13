import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.name,
            content: '',
            oldUserName: ''
        }
        this.messageInput = React.createRef();
        this.onContent = this.onContent.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onNewUsername = this.onNewUsername.bind(this);
    }
    // Updating content state when a user type's or delete's content from the message bar.
    onContent(event) {
        this.setState({
            content: event.target.value
        });
    }
    // When a user changes their username, it calls the function passed down from App to update the currentUser state, which in turn gets received anew as a prop in the Chatbar.
    onNewUsername(event) {
        if (event.keyCode === 13) {
            this.setState((prevState) => {
                return { oldUserName: prevState.username}
            });
            this.setState({ username: event.target.value}, () => {
                this.props.onNewUser({ username: this.state.username, oldUserName: this.state.oldUserName });
            });
            // Once a user assigns their new username, it autofocuses onto the message bar.
            this.messageInput.current.focus();
        }
    }
    // When a user completes and sends a message, it calls the function passed down from App to send that message to the server.
    onMessage(event) {
        // If the user hasn't chosen a username, they are by default Anonymous.
        if (!this.state.username.length) {
            this.setState({ username: 'Anonymous'});
        }
        if (event.keyCode === 13) {
            // If the user attempts to send an empty message they get an error alert.
            if (!this.state.content) {
                alert('Cannot send an empty message');
                return;
            } else {
                const state = {
                    error: ''
                };
                this.props.onNewMessage({ 
                type: 'postMessage',
                content: this.state.content, 
                username: this.state.username});
                state.content = '';
                this.setState(state);
            }
        }
    }
    render() {
        
        return (
                <footer className='chatbar'>
                    <input 
                        className='chatbar-username'
                        type='text'
                        defaultValue={this.state.username ? this.state.username : 'Anonymous'}
                        onKeyDown={this.onNewUsername}
                        placeholder='Your Name (Optional)' 
                     />
                    <input 
                        ref={this.messageInput} 
                        value={this.state.content} 
                        onChange={this.onContent} 
                        onKeyDown={this.onMessage} 
                        className='chatbar-message'
                        type='text'
                        placeholder='Type a message and hit ENTER' 
                    />
                </footer>
        )
    }
}

export default ChatBar;
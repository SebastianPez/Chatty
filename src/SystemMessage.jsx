import React, {Component} from 'react';

class SystemMessage extends Component {
    render() {
        // If the notifcation is for a username update.
        if (this.props.oldUserName) {
            return (
                <div className='message system'>
                    {this.props.oldUserName} has changed their name to {this.props.username}.
                </div>
            )
        // If the notification is for a new user joining the channel.
        } else if (this.props.content === 'New') {
            return (
                <div className='message system'>
                    A new user has joined the channel.
                </div>
            )
        // If the notification is for a user leaving the channel.
        } else if (this.props.content === 'Lose') {
            return (
                <div className='message system'>
                    A user has left the channel.
                </div>
            )
        }
    }
}
export default SystemMessage;
import $ from '../functions/handler.js';
import Message from './Message.js';

const INBOX_DIV = $('.inbox-conversation-wrapper');

export default class Conversation {

    constructor(user, messages = null, last_message_time = null) {

        this.loadMessages(messages);
        this.user= user;
        this.last_message_time = last_message_time;

        this.appendToInbox();
        this.active = false;
    }

    appendToInbox() {

        let conv_div = document.createElement('div');
        conv_div.classList.add("conversation");
        INBOX_DIV.appendChild(conv_div);
        let HTML_string =
            `<div class = "person-conversation-label">
		        ${this.user[0].username}
			</div>
			<div class = "message-conversation-label">
				Hej, co tam?
			</div>`

        conv_div.innerHTML = HTML_string;

        this.div = conv_div;
    }

    loadMessages(messages) {

        this.MESSAGES_ARR = [];

        for(let m of messages) {
            const { from_who: { id, username }, message_content, send_time } = m;
            this.MESSAGES_ARR.push(new Message(id, username, message_content, send_time));
        }
    }

    displayMessages() {
        for(let m of this.MESSAGES_ARR) {
            m.showMessage();
        }
    }
}

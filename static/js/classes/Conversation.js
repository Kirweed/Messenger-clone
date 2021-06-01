import $ from '../functions/handler.js';

export default class Conversation {

    constructor(user, messages = null, last_message_time = null) {
        const MESSAGE_ARR = new Array;

        this.user= user;
        this.messages = messages;
        this.last_message_time = last_message_time;

        this.appendToInbox();
    }

    appendToInbox() {


        let HTML_string =
            `<div class = "conversation">
				<div class = "person-conversation-label">
				    ${this.user[0].username}
				</div>
				<div class = "message-conversation-label">
					Hej, co tam?
				</div>
			</div>`

        addNewConversation(HTML_string);
    }
}

// Functions

function addNewConversation(HTML_string) {

    $('.inbox-conversation-wrapper').innerHTML += HTML_string;
}

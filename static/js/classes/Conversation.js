import $ from '../functions/handler.js';
import Message from './Message.js';

const INBOX_DIV = $('.inbox-conversation-wrapper');
const USER_ID = $('.id');

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrf_token = getCookie('csrftoken');

export default class Conversation {

    constructor(user, messages = null, id) {

        this.loadMessages(messages);
        this.user= user;
        this.id = id;

        this.appendToInbox();
        this.active = false;
    }

    sendMessage(text) {
        const json = Message.prepareToSend(text);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../rest/message_send/', true);

        const p = new Promise(function(resolve, reject) {
            xhr.onload = function() {
                if(xhr.status >= 200 && xhr.status < 400) {
                    resolve();
                } else {
                    reject();
                }
            }

            xhr.onerror = function() {
                reject();
            }
        });

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-CSRFToken', csrf_token);

        xhr.send(json);

        return p;
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

    addMessage(text) {
        this.MESSAGES_ARR.push(new Message(parseInt(USER_ID.textContent), null, text, null));
                        // Tymczasowo nie wysyłam tutaj odpowiednich danych, do zmiany.
        this.MESSAGES_ARR[this.MESSAGES_ARR.length - 1].showMessage();
    }

    displayMessages() {
        for(let m of this.MESSAGES_ARR) {
            m.showMessage();
        }
    }
}

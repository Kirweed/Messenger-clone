import $ from '../functions/handler.js';
import { USER_OBJ, returnActiveConversation } from '../main.js';

const USER_ID = $('.id');

export default class Message {

    constructor(id, username, text, time) {
        this.id = id;
        this.username = username;
        this.text = text;
        this.time = time;
    }

    showMessage() {
        let p = document.createElement('p');

        if(this.id === parseInt(USER_ID.textContent)) {
            p.classList.add('from-me-message');
        } else {
            p.classList.add('to-me-message');
        }

        p.textContent = this.text;
        $('.conversation-window').appendChild(p);
    }

    static prepareToSend(text) {

        let obj = {
            from_who: USER_OBJ.id,
            message_content: text,
            conversation: returnActiveConversation().id
        };

        return JSON.stringify(obj);
    }
}